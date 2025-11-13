import { useState } from 'react';
import DetailDialog from '../template/DetailDialog';
import type { FormSection } from '../template/DetailDialog';
import type { ShowtimeDTO } from '../../../utils/dtos/showtimeDTO';

interface DetailShowtimeDialogProps {
  open: boolean;
  onClose: () => void;
  showtime: ShowtimeDTO | null;
  onSave?: (showtime: ShowtimeDTO) => void;
  onDelete?: () => void;
}

const DetailShowtimeDialog: React.FC<DetailShowtimeDialogProps> = ({
  open,
  onClose,
  showtime,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedShowtime, setEditedShowtime] = useState<ShowtimeDTO | null>(showtime);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditedShowtime(showtime);
  };

  const handleSave = () => {
    if (!editedShowtime) return;

    // Validation
    if (!editedShowtime.start_time) {
      setError('Start time is required');
      return;
    }
    if (!editedShowtime.end_time) {
      setError('End time is required');
      return;
    }
    if (editedShowtime.price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    onSave?.(editedShowtime);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedShowtime(showtime);
      setError('');
    } else {
      onClose();
    }
  };

  const sections: FormSection[] = [
    {
      title: 'Cinema & Room Information',
      fields: [
        {
          name: 'cinema_name',
          label: 'Cinema',
          type: 'text',
          value: editedShowtime?.cinema.name || '',
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'room_name',
          label: 'Room',
          type: 'text',
          value: editedShowtime?.room.name || '',
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: 'Movie Information',
      fields: [
        {
          name: 'movie_title',
          label: 'Movie Title',
          type: 'text',
          value: editedShowtime?.movie.title || '',
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: 'Showtime Details',
      fields: [
        {
          name: 'start_time',
          label: 'Start Time',
          type: 'datetime-local',
          value: editedShowtime?.start_time
            ? new Date(editedShowtime.start_time).toISOString().slice(0, 16)
            : '',
          onChange: (value) =>
            setEditedShowtime((prev) =>
              prev ? { ...prev, start_time: new Date(value).toISOString() } : null
            ),
        },
        {
          name: 'end_time',
          label: 'End Time',
          type: 'datetime-local',
          value: editedShowtime?.end_time
            ? new Date(editedShowtime.end_time).toISOString().slice(0, 16)
            : '',
          onChange: (value) =>
            setEditedShowtime((prev) =>
              prev ? { ...prev, end_time: new Date(value).toISOString() } : null
            ),
        },
        {
          name: 'price',
          label: 'Price',
          type: 'number',
          placeholder: 'Enter price',
          value: editedShowtime?.price || 0,
          onChange: (value) =>
            setEditedShowtime((prev) =>
              prev ? { ...prev, price: Number(value) } : null
            ),
        },
      ],
    },
  ];

  return (
    <DetailDialog
      open={open}
      onClose={onClose}
      title="Showtime Details"
      sections={sections}
      error={error}
      isEditable={isEditing}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={onDelete}
    />
  );
};

export default DetailShowtimeDialog;
