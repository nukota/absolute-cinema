import { useState } from 'react';
import DetailDialog from '../template/DetailDialog';
import type { FormSection } from '../template/DetailDialog';
import type { MovieDTO } from '../../../utils/dtos/movieDTO';
import { MovieStatus } from '../../../utils/enum';

interface DetailMovieDialogProps {
  open: boolean;
  onClose: () => void;
  movie: MovieDTO | null;
  onSave?: (movie: MovieDTO) => void;
  onDelete?: () => void;
}

const DetailMovieDialog: React.FC<DetailMovieDialogProps> = ({
  open,
  onClose,
  movie,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState<MovieDTO | null>(movie);
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditedMovie(movie);
  };

  const handleSave = () => {
    if (!editedMovie) return;

    // Validation
    if (!editedMovie.title.trim()) {
      setError('Movie title is required');
      return;
    }
    if (editedMovie.duration_min <= 0) {
      setError('Duration must be greater than 0');
      return;
    }
    if (!editedMovie.release_date) {
      setError('Release date is required');
      return;
    }

    onSave?.(editedMovie);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedMovie(movie);
      setError('');
    } else {
      onClose();
    }
  };

  const statusOptions = [
    { value: MovieStatus.NowShowing, label: 'Now Showing' },
    { value: MovieStatus.ComingSoon, label: 'Coming Soon' },
    { value: MovieStatus.Stopped, label: 'Stopped' },
  ];

  const sections: FormSection[] = [
    {
      title: 'Movie Information',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter movie title',
          value: editedMovie?.title || '',
          onChange: (value) =>
            setEditedMovie((prev) => (prev ? { ...prev, title: value } : null)),
        },
        {
          name: 'description',
          label: 'Description',
          type: 'longtext',
          placeholder: 'Enter movie description',
          value: editedMovie?.description || '',
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, description: value } : null
            ),
        },
        {
          name: 'duration_min',
          label: 'Duration (minutes)',
          type: 'number',
          placeholder: 'Enter duration',
          value: editedMovie?.duration_min || 0,
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, duration_min: Number(value) } : null
            ),
        },
        {
          name: 'release_date',
          label: 'Release Date',
          type: 'date',
          placeholder: 'Select release date',
          value: editedMovie?.release_date || '',
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, release_date: value } : null
            ),
        },
        {
          name: 'rating',
          label: 'Rating',
          type: 'number',
          placeholder: 'Enter rating',
          value: editedMovie?.rating || 0,
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, rating: Number(value) } : null
            ),
        },
        {
          name: 'director',
          label: 'Director',
          type: 'text',
          placeholder: 'Enter director name',
          value: editedMovie?.director || '',
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, director: value } : null
            ),
        },
        {
          name: 'actors',
          label: 'Actors',
          type: 'list',
          placeholder: 'Enter actors (comma-separated)',
          value: editedMovie?.actors || [],
          onChange: (value) =>
            setEditedMovie((prev) => (prev ? { ...prev, actors: value } : null)),
        },
        {
          name: 'genre',
          label: 'Genre',
          type: 'list',
          placeholder: 'Enter genres (comma-separated)',
          value: editedMovie?.genre || [],
          onChange: (value) =>
            setEditedMovie((prev) => (prev ? { ...prev, genre: value } : null)),
        },
        {
          name: 'status',
          label: 'Status',
          type: 'autocomplete',
          placeholder: 'Select status',
          value:
            statusOptions.find((opt) => opt.value === editedMovie?.status) ||
            null,
          options: statusOptions,
          getOptionLabel: (option: any) => option.label,
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, status: value?.value } : null
            ),
        },
        {
          name: 'poster_url',
          label: 'Poster URL',
          type: 'text',
          placeholder: 'Enter poster URL',
          value: editedMovie?.poster_url || '',
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, poster_url: value } : null
            ),
        },
      ],
    },
  ];

  return (
    <DetailDialog
      open={open}
      onClose={onClose}
      title="Movie Details"
      sections={sections}
      error={error}
      isEditable={isEditing}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={onDelete}
      showImage="poster_url"
    />
  );
};

export default DetailMovieDialog;
