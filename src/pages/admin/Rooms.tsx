import { useState } from "react";
import CustomTabs from "../../components/layouts/Tabs";
import Room from "../../components/items/Room";
import type { RoomDTO } from "../../utils/dtos/roomDTO";
import CreateRoomDialog from "../../components/dialogs/create-dialogs/CreateRoomDialog";
import DetailRoomDialog from "../../components/dialogs/detail-dialogs/DetailRoomDialog";
import {
  useAllRooms,
  useCreateRoom,
  useUpdateRoom,
  useDeleteRoom,
} from "../../services/roomsService";
import { useAllCinemas } from "../../services/cinemasService";
import { useFeedback } from "../../provider/FeedbackProvider";

const Rooms = () => {
  const { showSnackbar } = useFeedback();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomDTO | null>(null);

  const { data: rooms = [], isLoading: loading } = useAllRooms();
  const { data: cinemas = [] } = useAllCinemas();
  const createRoomMutation = useCreateRoom();
  const updateRoomMutation = useUpdateRoom();
  const deleteRoomMutation = useDeleteRoom();

  const handleAddNew = () => {
    setOpenCreateDialog(true);
  };

  const handleInfoClick = (room: RoomDTO) => {
    setSelectedRoom(room);
    setOpenDetailDialog(true);
  };

  const handleCreateRoom = async (roomData: any) => {
    try {
      await createRoomMutation.mutateAsync(roomData);
      showSnackbar({
        message: "Room created successfully!",
        severity: "success",
      });
      setOpenCreateDialog(false);
    } catch (error) {
      showSnackbar({
        message: "Failed to create room. Please try again.",
        severity: "error",
      });
    }
  };

  const handleSave = async (room: RoomDTO) => {
    if (!selectedRoom) return;
    try {
      await updateRoomMutation.mutateAsync({
        id: selectedRoom.room_id,
        data: room,
      });
      showSnackbar({
        message: "Room updated successfully!",
        severity: "success",
      });
      setOpenDetailDialog(false);
    } catch (error) {
      showSnackbar({
        message: "Failed to update room. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedRoom) return;
    try {
      await deleteRoomMutation.mutateAsync(selectedRoom.room_id);
      showSnackbar({
        message: "Room deleted successfully!",
        severity: "success",
      });
      setOpenDetailDialog(false);
    } catch (error) {
      showSnackbar({
        message: "Failed to delete room. Please try again.",
        severity: "error",
      });
    }
  };

  // Generate cinema options from real cinemas data
  const cinemaOptions = cinemas.map((cinema) => ({
    label: cinema.name,
    value: cinema.cinema_id,
  }));

  return (
    <>
      <CustomTabs
        title="Rooms"
        data={rooms}
        loading={loading}
        onAddNew={handleAddNew}
        addButtonText="Add Room"
        searchColumns={["name", "cinema.name"]}
        selectFilters={[
          {
            label: "Cinema",
            property: "cinema.cinema_id",
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
        onSave={handleCreateRoom}
        cinemas={cinemas}
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
