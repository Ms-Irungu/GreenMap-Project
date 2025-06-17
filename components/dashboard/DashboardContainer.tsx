import React, { useState, useMemo } from 'react'
import WardSelector from '@/components/dashboard/WardSelector';
import { useWardData } from '@/hooks/useWardData';
import StatisticsPanel from '@/components/dashboard/StatisticsPanel';
import MiniMap from '@/components/dashboard/MiniMap';


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
    </div>
  );
}

export default DashboardContainer
