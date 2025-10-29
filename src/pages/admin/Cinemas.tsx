import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Cinema from '../../components/items/Cinema';
import { mockCinemas } from '../../utils/mockdata';

const Cinemas = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);

  const tabs = [
    { label: 'All', value: 'All' },
  ];

  const handleAddNew = () => {
    console.log('Add new cinema');
  };

  return (
    <CustomTabs
      title="Cinemas"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
      data={mockCinemas}
      loading={loading}
      onAddNew={handleAddNew}
      addButtonText="Add Cinema"
      searchColumns={['name', 'address', 'city']}
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      gap="gap-6"
    >
      {(filteredData) =>
        filteredData.map((cinema) => (
          <Cinema key={cinema._id} cinema={cinema} />
        ))
      }
    </CustomTabs>
  );
};

export default Cinemas;
