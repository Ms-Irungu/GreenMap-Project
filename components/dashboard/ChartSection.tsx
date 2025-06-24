import React, { useState } from 'react';
import { ChartSectionProps } from '@/interfaces';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

type ChartType = 'ndvi' | 'lst';

const ChartSection: React.FC<ChartSectionProps> = ({
  data,
  selectedYear,
  selectedMonth,
  isLoading,
}) => {
  const [activeChart, setActiveChart] = useState<ChartType>('ndvi');

  const renderChartContent = () => {
    if (isLoading) {
      return <div>Loading chart...</div>;
    }
    if (!data || data.length === 0) {
      return <div>No data available for this period.</div>;
    }

    switch (activeChart) {
      case 'ndvi':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="ward" angle={-45} textAnchor="end" interval={3} height={80} />
              <YAxis domain={[0, 1]} label={{ value: 'NDVI', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="ndvi" name="NDVI" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        );
        case 'lst':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="ward" angle={-45} textAnchor="end" interval={0} height={80} />
              <YAxis label={{ value: 'LST (°C)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="lst" name="LST (°C)" fill="#f59e42" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-800">Environmental Trends</h2>
        <h2 className="text-lg font-medium text-gray-800">
          {activeChart === 'ndvi'
            ? `NDVI for All Wards (${new Date(0, selectedMonth).toLocaleString('default', { month: 'long' })} ${selectedYear})`
            : `LST for All Wards (${new Date(0, selectedMonth).toLocaleString('default', { month: 'long' })} ${selectedYear})`}
        </h2>

        <div className="flex mt-2 space-x-2">
          <button
            onClick={() => setActiveChart('ndvi')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeChart === 'ndvi'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Vegetation Trend
          </button>
          <button
            onClick={() => setActiveChart('lst')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${activeChart === 'lst'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Urban Heat Trend
          </button>
        </div>
      </div>
      <div className="p-4">{renderChartContent()}</div>
    </div>
  );
};

export default ChartSection;