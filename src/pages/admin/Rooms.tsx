import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Room from '../../components/items/Room';
import { mockRooms, mockCinemas } from '../../utils/mockdata';

const Rooms = () => {
  const [loading] = useState(false);

  const handleAddNew = () => {
    console.log('Add new room');
  };

  // Generate cinema options from mockCinemas
  const cinemaOptions = mockCinemas.map((cinema) => ({
    label: cinema.name,
    value: cinema.name,
  }));

  return (
    <CustomTabs
      title="Rooms"
      data={mockRooms}
      loading={loading}
      onAddNew={handleAddNew}
      addButtonText="Add Room"
      searchColumns={['name', 'cinema.name']}
      selectFilters={[
        {
          label: 'Cinema',
          property: 'cinema.name',
          options: cinemaOptions,
        },
      ]}
      gridCols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      gap="gap-6"
    >
      {(filteredData) =>
        filteredData.map((room) => (
          <Room
            key={room.room_id}
            room={room}
            handleInfoClick={() => console.log('Room clicked:', room.room_id)}
          />
        ))
      }
    </CustomTabs>
  );
};

export default Rooms;
