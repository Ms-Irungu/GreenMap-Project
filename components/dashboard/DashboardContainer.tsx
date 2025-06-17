import React, { useState, useMemo } from 'react'
import WardSelector from '@/components/dashboard/WardSelector';
import { useWardData } from '@/hooks/useWardData';
import StatisticsPanel from '@/components/dashboard/StatisticsPanel';
import MiniMap from '@/components/dashboard/MiniMap';
import ChartSection from '@/components/dashboard/ChartSection';


const DashboardContainer: React.FC = () => {
  const [selectedWard, setSelectedWard] = useState<string>('all');
  const { wardData, isLoading } = useWardData();
  const [selectedTimeRange] = useState('30_days');


  const statistics = useMemo(() => {
    if (!wardData) return null;
    const filtered = wardData.features.filter(
      (f) =>
        (selectedWard === 'all' || f.properties.ward_name === selectedWard) &&
        f.properties.time_range === selectedTimeRange
    );

    if (filtered.length === 0) return null;

    const avgVegetationCover =
      filtered.reduce((sum, f) => sum + f.properties.mean_NDVI, 0) /
      filtered.length;

    const avgUrbanHeatIndex =
      filtered.reduce((sum, f) => sum + f.properties.mean_LST, 0) /
      filtered.length;

    // Assuming we can find previous time range data for change calculation
    const previousData = wardData.features.filter(
      (f) =>
        (selectedWard === 'all' || f.properties.ward_name === selectedWard) &&
        f.properties.time_range !== selectedTimeRange
    );
    const prevAvgNDVI =
      previousData.length > 0
        ? previousData.reduce((sum, f) => sum + f.properties.mean_NDVI, 0) /
        previousData.length
        : 0;

    const vegetationCoverChange = prevAvgNDVI
      ? ((avgVegetationCover - prevAvgNDVI) / prevAvgNDVI) * 100
      : 0;

    return {
      avgVegetationCover,
      vegetationCoverChange,
      avgUrbanHeatIndex,
      reportCount: {
        degraded: 3,
        potential: 4,
        encroached: 2,
        total: 3 + 4 + 2,
      },
    };
  }, [wardData, selectedWard, selectedTimeRange]);

  const charts = useMemo(() => {
  if (!wardData) {
    return {
      ndviTrend: [],
      uhiTrend: [],
      reportCounts: []
    };
  }

  // Group features by time_range
  const grouped = wardData.features
    .filter(f => selectedWard === 'all' || f.properties.ward_name === selectedWard)
    .reduce((acc, f) => {
      const key = f.properties.time_range;
      if (!acc[key]) acc[key] = [];
      acc[key].push(f);
      return acc;
    }, {} as Record<string, typeof wardData.features>);

  // Calculate average NDVI and UHI per time_range
  const ndviTrend = Object.entries(grouped)
  .map(([date, features]) => {
    const valid = features.map(f => f.properties.mean_NDVI).filter(v => typeof v === 'number');
    const avg = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : null;
    return { date, value: avg };
  })
  .filter(d => d.value !== null)
  .map(d => ({ date: d.date, value: d.value as number }));

const uhiTrend = Object.entries(grouped)
  .map(([date, features]) => {
    const valid = features.map(f => f.properties.mean_LST).filter(v => typeof v === 'number');
    const avg = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : null;
    return { date, value: avg };
  })
  .filter(d => d.value !== null)
  .map(d => ({ date: d.date, value: d.value as number }));

  // (Optional) Average report counts per time_range
  // const reportCounts = Object.entries(grouped).map(([date, features]) => {
  //   const valid = features.map(f => f.properties.report_count).filter(v => typeof v === 'number');
  //   const avg = valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
  //   return { date, value: avg };
  // });

  return { ndviTrend, uhiTrend }; // Remember to add reportCounts if needed
}, [wardData, selectedWard]);


  if (isLoading) {
    return <div className="p-4 max-w-7xl mx-auto">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow mb-5 p-4">
        <WardSelector
          selectedWard={selectedWard}
          onWardChange={setSelectedWard}
          wardData={
            wardData
              ? wardData.features.map((feature) => ({
                id: feature.properties.id,
                ward_name: feature.properties.ward_name,
              }))
              : []
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {statistics
          ? <StatisticsPanel statistics={statistics} />
          : <div className="col-span-full text-center text-gray-500">No statistics available for this selection.</div>
        }
        <div className='relative z-0 lg:col-span-2'>
          <MiniMap />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <ChartSection
          ndviTrend={charts.ndviTrend}
          uhiTrend={charts.uhiTrend}
          // reportCounts={charts.reportCounts}

        />
      </div>
    </div>
  );
}

export default DashboardContainer
