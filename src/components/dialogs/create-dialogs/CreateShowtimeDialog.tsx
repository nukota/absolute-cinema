import { useState } from 'react';
import CreateDialog from '../template/CreateDialog';
import type { FormSection } from '../template/CreateDialog';
import { mockCinemas, mockRooms, mockMovies } from '../../../utils/mockdata';

interface CreateShowtimeDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateShowtimeDialog: React.FC<CreateShowtimeDialogProps> = ({
  open,
  onClose,
}) => {
  const [cinema, setCinema] = useState<{ cinema_id: string; name: string } | null>(null);
  const [room, setRoom] = useState<{ room_id: string; name: string } | null>(null);
  const [movie, setMovie] = useState<{ movie_id: string; title: string } | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const cinemaOptions = mockCinemas.map((c) => ({
    cinema_id: c.cinema_id,
    name: c.name,
  }));

  // Filter rooms based on selected cinema
  const roomOptions = cinema
    ? mockRooms
        .filter((r) => r.cinema.cinema_id === cinema.cinema_id)
        .map((r) => ({
          room_id: r.room_id,
          name: r.name,
        }))
    : [];

  const movieOptions = mockMovies.map((m) => ({
    movie_id: m.movie_id,
    title: m.title,
  }));

  const handleCinemaChange = (newCinema: { cinema_id: string; name: string } | null) => {
    setCinema(newCinema);
    // Reset room when cinema changes
    setRoom(null);
  };

  const handleAdd = () => {
    // Validation
    if (!cinema) {
      setError('Cinema is required');
      return;
    }
    if (!room) {
      setError('Room is required');
      return;
    }
    if (!movie) {
      setError('Movie is required');
      return;
    }
    if (!startTime) {
      setError('Start time is required');
      return;
    }
    if (!endTime) {
      setError('End time is required');
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setError('Valid price is required');
      return;
    }

    // Validate that end time is after start time
    if (new Date(endTime) <= new Date(startTime)) {
      setError('End time must be after start time');
      return;
    }

    // TODO: Add showtime logic here
    console.log('Creating showtime:', {
      cinema,
      room,
      movie,
      startTime,
      endTime,
      price: parseFloat(price),
    });

    // Reset form and close
    handleClose();
  };

  const handleClose = () => {
    setCinema(null);
    setRoom(null);
    setMovie(null);
    setStartTime('');
    setEndTime('');
    setPrice('');
    setError('');
    onClose();
  };

  const sections: FormSection[] = [
    {
      title: 'Showtime Information',
      fields: [
        {
          name: 'cinema',
          label: 'Cinema',
          type: 'autocomplete',
          placeholder: 'Select cinema',
          required: true,
          options: cinemaOptions,
          getOptionLabel: (option: any) => option.name,
          value: cinema,
          onChange: handleCinemaChange,
        },
        {
          name: 'room',
          label: 'Room',
          type: 'autocomplete',
          placeholder: 'Select room',
          required: true,
          options: roomOptions,
          getOptionLabel: (option: any) => option.name,
          value: room,
          onChange: setRoom,
          disabled: !cinema,
        },
        {
          name: 'movie',
          label: 'Movie',
          type: 'autocomplete',
          placeholder: 'Select movie',
          required: true,
          options: movieOptions,
          getOptionLabel: (option: any) => option.title,
          value: movie,
          onChange: setMovie,
        },
        {
          name: 'startTime',
          label: 'Start Time',
          type: 'datetime-local',
          required: true,
          value: startTime,
          onChange: setStartTime,
        },
        {
          name: 'endTime',
          label: 'End Time',
          type: 'datetime-local',
          required: true,
          value: endTime,
          onChange: setEndTime,
        },
        {
          name: 'price',
          label: 'Price (VND)',
          type: 'number',
          placeholder: 'Enter ticket price',
          required: true,
          value: price,
          onChange: setPrice,
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
    />
  );
};

export default CreateShowtimeDialog;
