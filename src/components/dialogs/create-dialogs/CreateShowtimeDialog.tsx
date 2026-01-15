import { useState } from "react";
import CreateDialog from "../template/CreateDialog";
import type { FormSection } from "../template/CreateDialog";
import { useAllCinemas } from "../../../services/cinemasService";
import { useAllRooms } from "../../../services/roomsService";
import { useAllMovies } from "../../../services/moviesService";

interface CreateShowtimeDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: any) => Promise<void>;
}

const CreateShowtimeDialog: React.FC<CreateShowtimeDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [cinema, setCinema] = useState<{
    cinema_id: string;
    name: string;
  } | null>(null);
  const [room, setRoom] = useState<{ room_id: string; name: string } | null>(
    null
  );
  const [movie, setMovie] = useState<{
    movie_id: string;
    title: string;
  } | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [notifyUsers, setNotifyUsers] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch real data
  const { data: cinemas = [], isLoading: cinemasLoading } = useAllCinemas();
  const { data: rooms = [], isLoading: roomsLoading } = useAllRooms();
  const { data: movies = [], isLoading: moviesLoading } = useAllMovies();

  const cinemaOptions = cinemas.map((c) => ({
    cinema_id: c.cinema_id,
    name: c.name,
  }));

  // Filter rooms based on selected cinema
  const roomOptions = cinema
    ? rooms
        .filter((r) => r.cinema.cinema_id === cinema.cinema_id)
        .map((r) => ({
          room_id: r.room_id,
          name: r.name,
        }))
    : [];

  const movieOptions = movies.map((m) => ({
    movie_id: m.movie_id,
    title: m.title,
  }));

  const handleCinemaChange = (
    newCinema: { cinema_id: string; name: string } | null
  ) => {
    setCinema(newCinema);
    // Reset room when cinema changes
    setRoom(null);
  };

  const handleAdd = async () => {
    // Validation
    if (!cinema) {
      setError("Cinema is required");
      return;
    }
    if (!room) {
      setError("Room is required");
      return;
    }
    if (!movie) {
      setError("Movie is required");
      return;
    }
    if (!startTime) {
      setError("Start time is required");
      return;
    }
    if (!endTime) {
      setError("End time is required");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setError("Valid price is required");
      return;
    }

    // Validate that end time is after start time
    if (new Date(endTime) <= new Date(startTime)) {
      setError("End time must be after start time");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onCreate({
        room_id: room.room_id,
        movie_id: movie.movie_id,
        start_time: startTime,
        end_time: endTime,
        price: parseFloat(price),
        notifyUsers, // Pass the notify flag
      });

      // Reset form and close only after API call succeeds
      handleClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCinema(null);
    setRoom(null);
    setMovie(null);
    setStartTime("");
    setEndTime("");
    setPrice("");
    setNotifyUsers(false);
    setError("");
    setIsSubmitting(false);
    onClose();
  };

  const sections: FormSection[] = [
    {
      title: "Showtime Information",
      fields: [
        {
          name: "cinema",
          label: "Cinema",
          type: "autocomplete",
          placeholder: cinemasLoading ? "Loading cinemas..." : "Select cinema",
          required: true,
          options: cinemaOptions,
          getOptionLabel: (option: any) => option.name,
          value: cinema,
          onChange: handleCinemaChange,
          disabled: cinemasLoading,
        },
        {
          name: "room",
          label: "Room",
          type: "autocomplete",
          placeholder: roomsLoading ? "Loading rooms..." : "Select room",
          required: true,
          options: roomOptions,
          getOptionLabel: (option: any) => option.name,
          value: room,
          onChange: setRoom,
          disabled: !cinema || roomsLoading,
        },
        {
          name: "movie",
          label: "Movie",
          type: "autocomplete",
          placeholder: moviesLoading ? "Loading movies..." : "Select movie",
          required: true,
          options: movieOptions,
          getOptionLabel: (option: any) => option.title,
          value: movie,
          onChange: setMovie,
          disabled: moviesLoading,
        },
        {
          name: "startTime",
          label: "Start Time",
          type: "datetime-local",
          required: true,
          value: startTime,
          onChange: setStartTime,
        },
        {
          name: "endTime",
          label: "End Time",
          type: "datetime-local",
          required: true,
          value: endTime,
          onChange: setEndTime,
        },
        {
          name: "price",
          label: "Price (VND)",
          type: "number",
          placeholder: "Enter ticket price",
          required: true,
          value: price,
          onChange: setPrice,
        },
      ],
    },
    {
      title: "Notifications",
      fields: [
        {
          name: "notifyUsers",
          label: "Notify users who saved this movie",
          type: "checkbox",
          value: notifyUsers,
          onChange: setNotifyUsers,
        },
      ],
    },
  ];

  return (
    <CreateDialog
      open={open}
      onClose={handleClose}
      title="Add New Showtime"
      sections={sections}
      onAdd={handleAdd}
      error={error}
      isLoading={isSubmitting}
    />
  );
};

export default CreateShowtimeDialog;
