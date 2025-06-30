import React, { useState, useEffect } from 'react';
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

type ChartType = 'ndvi' | 'lst' | 'precipitation';

const ChartSection: React.FC<ChartSectionProps> = ({
  data,
  selectedYear,
  selectedMonth,
  isLoading,
}) => {
  const [activeChart, setActiveChart] = useState<ChartType>('ndvi');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderChart = (dataKey: string, label: string, color: string) => (
    <ResponsiveContainer width="100%" height={isMobile ? 280 : 350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="ward"
          angle={isMobile ? -45 : -45}
          textAnchor={isMobile ? 'end' : 'end'}
          interval={isMobile ? 5 : 3}
          height={isMobile ? 60 : 80}
          tick={{ 
            fontSize: isMobile ? 10 : 15, 
            dy: isMobile ? 2 : 5 // Controls the vertical displacement of the text labels
          }}
        />
        <YAxis
          label={{
            value: label,
            angle: -90,
            position: 'insideLeft',
            offset: 10,
            style: {textAnchor: "middle"},
            tick: {fontSize: isMobile ? 10 : 15}
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} name={label} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderChartContent = () => {
    if (isLoading) {
      return <div>Loading chart...</div>;
    }
    if (!data || data.length === 0) {
      return <div>No data available for this period.</div>;
    }

    switch (activeChart) {
      case 'ndvi':
        return renderChart('ndvi', 'NDVI', '#10b981');
      case 'lst':
        return renderChart('lst', 'LST (°C)', '#f59e42');
      case 'precipitation':
        return renderChart('precipitation', 'Rainfall (mm)', '#4575b4');
      default:
        return null;
    }
  };


  return (
    <div className="w-full">
      <div className="p-4 border-b border-gray-200 space-y-2">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Environmental Trends</h2>
        <h3 className="text-sm md:text-base text-gray-600">
          {activeChart === 'ndvi'
            ? `NDVI for All Wards (${new Date(0, selectedMonth).toLocaleString('default', {
                month: 'long',
              })} ${selectedYear})`
            : activeChart === 'lst'
            ? `LST for All Wards (${new Date(0, selectedMonth).toLocaleString('default', {
                month: 'long',
              })} ${selectedYear})`
            : `Rainfall for All Wards (${new Date(0, selectedMonth).toLocaleString('default', {
                month: 'long',
              })} ${selectedYear})`}
        </h3>

        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => setActiveChart('ndvi')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              activeChart === 'ndvi'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Vegetation Trend
          </button>
          <button
            onClick={() => setActiveChart('lst')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              activeChart === 'lst'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Urban Heat Trend
          </button>
          <button
            onClick={() => setActiveChart('precipitation')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              activeChart === 'precipitation'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Rainfall Trend
          </button>
        </div>
      </div>

      <div className="p-4">{renderChartContent()}</div>
    </div>
  );
};

export default ChartSection;