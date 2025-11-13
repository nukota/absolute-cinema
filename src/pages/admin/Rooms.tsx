import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Room from '../../components/items/Room';
import { mockRooms, mockCinemas } from '../../utils/mockdata';
import type { RoomDTO } from '../../utils/dtos/roomDTO';
import CreateRoomDialog from '../../components/dialogs/create-dialogs/CreateRoomDialog';
import DetailRoomDialog from '../../components/dialogs/detail-dialogs/DetailRoomDialog';

const Rooms = () => {
  const [loading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomDTO | null>(null);

  const handleAddNew = () => {
    setOpenCreateDialog(true);
  };

  const handleInfoClick = (room: RoomDTO) => {
    setSelectedRoom(room);
    setOpenDetailDialog(true);
  };

  const handleSave = (room: RoomDTO) => {
    console.log('Saving room:', room);
    setOpenDetailDialog(false);
  };

  const handleDelete = () => {
    console.log('Deleting room:', selectedRoom?.room_id);
    setOpenDetailDialog(false);
  };

  // Generate cinema options from mockCinemas
  const cinemaOptions = mockCinemas.map((cinema) => ({
    label: cinema.name,
    value: cinema.name,
  }));

  return (
    <>
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
              handleInfoClick={() => handleInfoClick(room)}
            />
          ))
        }
      </CustomTabs>
      <CreateRoomDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
      <DetailRoomDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        room={selectedRoom}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Rooms;
