import React, { useState } from 'react'
import { MapContainerProps } from '@/interfaces';
import WardSelector from '@/components/dashboard/WardSelector';
import { useWardData } from '@/hooks/useWardData';

const DashboardContainer: React.FC<MapContainerProps> = () => {
  const [selectedWard, setSelectedWard] = useState<string>('all');

  const { wardData, isLoading } = useWardData();

  const filteredData = wardData?.features.filter(feature =>
    selectedWard === 'all' || feature.properties.ward_name === selectedWard
  );

  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <div className='bg-white rounded-lg shadow mb-5 p-4'>
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
    </div>
  )

}

export default DashboardContainer
