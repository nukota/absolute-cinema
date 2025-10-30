import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Room from '../../components/items/Room';
import { mockRooms } from '../../utils/mockdata';

const Rooms = () => {
  const [loading] = useState(false);

  const handleAddNew = () => {
    console.log('Add new room');
  };

  return (
    <CustomTabs
      title="Rooms"
      data={mockRooms}
      loading={loading}
      onAddNew={handleAddNew}
      addButtonText="Add Room"
      searchColumns={['name', 'type', 'cinema_name']}
      gridCols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
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
