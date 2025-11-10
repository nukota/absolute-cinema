import { useState } from 'react';
import CreateDialog from '../template/CreateDialog';
import type { FormSection } from '../template/CreateDialog';
import { MovieStatus } from '../../../utils/enum';

interface CreateMovieDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateMovieDialog: React.FC<CreateMovieDialogProps> = ({
  open,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleAdd = () => {
    // Validation
    if (!title.trim()) {
      setError('Movie title is required');
      return;
    }
    if (!duration || parseInt(duration) <= 0) {
      setError('Valid duration is required');
      return;
    }
    if (!releaseDate) {
      setError('Release date is required');
      return;
    }

    // Calculate status based on release date
    const today = new Date();
    const release = new Date(releaseDate);
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    let status: string;
    if (release <= today) {
      status = MovieStatus.NowShowing;
    } else if (release > thirtyDaysFromNow) {
      status = MovieStatus.ComingSoon;
    } else {
      status = MovieStatus.Stopped;
    }

    // TODO: Add movie logic here
    console.log('Creating movie:', {
      title,
      description,
      duration: parseInt(duration),
      releaseDate,
      posterUrl,
      director,
      actors,
      genre,
      status,
    });

    // Reset form and close
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDuration('');
    setReleaseDate('');
    setPosterUrl('');
    setDirector('');
    setActors([]);
    setGenre([]);
    setError('');
    onClose();
  };

  const sections: FormSection[] = [
    {
      title: 'Movie Information',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter movie title',
          required: true,
          value: title,
          onChange: setTitle,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'longtext',
          placeholder: 'Enter movie description',
          value: description,
          onChange: setDescription,
        },
        {
          name: 'duration',
          label: 'Duration (minutes)',
          type: 'number',
          placeholder: 'Enter duration in minutes',
          required: true,
          value: duration,
          onChange: setDuration,
        },
        {
          name: 'releaseDate',
          label: 'Release Date',
          type: 'date',
          required: true,
          value: releaseDate,
          onChange: setReleaseDate,
        },
        {
          name: 'posterUrl',
          label: 'Poster URL',
          type: 'text',
          placeholder: 'Enter poster image URL',
          value: posterUrl,
          onChange: setPosterUrl,
        },
        {
          name: 'director',
          label: 'Director',
          type: 'text',
          placeholder: 'Enter director name',
          value: director,
          onChange: setDirector,
        },
        {
          name: 'actors',
          label: 'Actors',
          type: 'list',
          placeholder: 'Enter actor names (comma-separated)',
          value: actors,
          onChange: setActors,
        },
        {
          name: 'genre',
          label: 'Genre',
          type: 'list',
          placeholder: 'Enter genres (comma-separated)',
          value: genre,
          onChange: setGenre,
        },
      ],
    },
  ];

  return (
    <CreateDialog
      open={open}
      onClose={handleClose}
      title="Add New Movie"
      sections={sections}
      onAdd={handleAdd}
      error={error}
      showImage="posterUrl"
    />
  );
};

export default CreateMovieDialog;
