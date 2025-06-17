import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

type ChartType = 'ndvi' | 'uhi' | 'reports';

interface ChartSectionProps {
  ndviTrend: { date: string; value: number }[];
  uhiTrend: { date: string; value: number }[];
  reportCounts?: { date: string; value: number }[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ ndviTrend, uhiTrend, reportCounts }) => {
  const [activeChart, setActiveChart] = useState<ChartType>('ndvi');

  const renderChartContent = () => {
    switch (activeChart) {
      case 'ndvi':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ndviTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" name="NDVI" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'uhi':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={uhiTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" name="Urban Heat Index" stroke="#f59e42" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'reports':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportCounts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Reports" fill="#3b82f6" />
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

        <div className="flex mt-2 space-x-2">
          <button
            onClick={() => setActiveChart('ndvi')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              activeChart === 'ndvi'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Vegetation Trend
          </button>
          <button
            onClick={() => setActiveChart('uhi')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              activeChart === 'uhi'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Urban Heat Trend
          </button>
          <button
            onClick={() => setActiveChart('reports')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              activeChart === 'reports'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Community Reports
          </button>
        </div>
      </div>
      <div className="p-4">{renderChartContent()}</div>
    </div>
  );
};

export default ChartSection;