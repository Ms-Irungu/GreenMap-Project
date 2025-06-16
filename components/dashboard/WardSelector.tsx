import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Ward } from '@/interfaces';
import { WardSelectorProps } from '@/interfaces';

const WardSelector: React.FC<WardSelectorProps> = ({
  selectedWard,
  onWardChange,
  wardData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique ward names from data
  const uniqueWards: string[] = wardData
    ? Array.from(new Set(wardData.map((f: Ward) => f.ward_name)))
    : [];

  // Filter based on search input
  const filteredWards = uniqueWards.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <h2 className="text-lg font-medium text-gray-800 mb-2">
        Ward Analysis
      </h2>

      {/* Selected Ward Box */}
      <div
        className="relative flex items-center border border-gray-300 rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          <p className="text-sm text-gray-700">Selected Ward</p>
          <p className="font-bold text-gray-900">{selectedWard}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* Search */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search wards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* List */}
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredWards.map((ward) => (
              <li
                key={ward}
                className={`px-4 py-2 text-sm cursor-pointer ${
                  ward === selectedWard
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => {
                  onWardChange(ward);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                {ward}
              </li>
            ))}

            {filteredWards.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500">
                No wards found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WardSelector;
