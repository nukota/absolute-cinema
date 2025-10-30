import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Cinema from '../../components/items/Cinema';
import { mockCinemas } from '../../utils/mockdata';

const Cinemas = () => {
  const [loading] = useState(false);

  const handleAddNew = () => {
    console.log('Add new cinema');
  };

  return (
    <CustomTabs
      title="Cinemas"
      data={mockCinemas}
      loading={loading}
      onAddNew={handleAddNew}
      addButtonText="Add Cinema"
      searchColumns={['name', 'address', 'city']}
      gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
      gap="gap-6"
    >
      {(filteredData) =>
        filteredData.map((cinema) => (
          <Cinema
            key={cinema.cinema_id}
            cinema={cinema}
            handleInfoClick={() =>
              console.log('Cinema clicked:', cinema.cinema_id)
            }
          />
        ))
      }
    </CustomTabs>
  );
};

export default Cinemas;
