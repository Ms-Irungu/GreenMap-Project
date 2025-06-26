import React, { useState, useEffect } from 'react';
import WardSelector from '@/components/dashboard/WardSelector';
import { useWardData } from '@/hooks/useWardData';
import { useWardStats } from '@/hooks/useWardStats';
import StatisticsPanel from '@/components/dashboard/StatisticsPanel';
import MiniMap from '@/components/dashboard/MiniMap';
import ChartSection from '@/components/dashboard/ChartSection';

interface DashboardContainerProps {
  selectedDate: {
    year: number;
    month: number;
  };
}


const DashboardContainer: React.FC<DashboardContainerProps> = ({ selectedDate }) => {
  const { wardNames } = useWardData();
  const [selectedWard, setSelectedWard] = useState<string>('');
  const { stats, isLoading: statsLoading, error, fetchStats } = useWardStats();

  // Fetch stats whenever year or month changes
  useEffect(() => {
    if (selectedDate) {
      fetchStats(selectedDate.year, selectedDate.month);
    }
  }, [selectedDate, fetchStats]);

  console.log('selectedWard:', selectedWard);
  console.log('stats:', stats);

  // Get mean NDVI and LST for the selected ward
  const meanNdvi = selectedWard && stats?.ndvi?.[selectedWard] !== undefined ? stats.ndvi[selectedWard] : 'No Data Available';
  const meanLst = selectedWard && stats?.lst?.[selectedWard] !== undefined ? stats.lst[selectedWard] : 'No Data Available';
  const meanPrecipitation = selectedWard && stats?.precipitation?.[selectedWard] !== undefined ? stats.precipitation[selectedWard] : 'No Data Available';

  // For chart: show all wards' NDVI/LST for selected year/month
  const chartData =
    stats && stats.ndvi && stats.lst
      ? Object.keys(stats.ndvi).map((ward) => ({
        ward,
        ndvi: stats.ndvi[ward],
        lst: stats.lst[ward],
        precipitation: stats.precipitation[ward],
      }))
      : [];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow mb-5 p-4">
        <WardSelector
          selectedWard={selectedWard}
          onWardChange={setSelectedWard}
          wardData={wardNames.map(name => ({ NAME_3: name }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1">
          <StatisticsPanel
            ward={selectedWard}
            meanNdvi={meanNdvi}
            meanLst={meanLst}
            meanPrecipitation={meanPrecipitation}
            isLoading={statsLoading}
          />
        </div>
        <div className="relative z-0 md:col-span-1 lg:col-span-2">
          <MiniMap />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <ChartSection
          data={chartData}
          selectedYear={selectedDate.year}
          selectedMonth={selectedDate.month}
          isLoading={statsLoading}
        />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default DashboardContainer;