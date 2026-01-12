import { useState, useEffect } from "react";
import DetailDialog from "../template/DetailDialog";
import type { FormSection } from "../template/DetailDialog";
import type { MovieDTO } from "../../../utils/dtos/movieDTO";
import { MovieStatus } from "../../../utils/enum";

interface DetailMovieDialogProps {
  open: boolean;
  onClose: () => void;
  movie: MovieDTO | null;
  onUpdate: (id: string, data: any) => void;
  onDelete?: () => void;
}

const DetailMovieDialog: React.FC<DetailMovieDialogProps> = ({
  open,
  onClose,
  movie,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState<MovieDTO | null>(movie);
  const [error, setError] = useState("");

  // Reset editing state when dialog closes
  useEffect(() => {
    if (!open) {
      setIsEditing(false);
    }
  }, [open]);

  // Sync editedMovie with movie prop when it changes
  useEffect(() => {
    setEditedMovie(movie);
  }, [movie]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedMovie(movie);
  };

  const handleSave = () => {
    if (!editedMovie) return;

    // Validation
    if (!editedMovie.title.trim()) {
      setError("Movie title is required");
      return;
    }
    if (editedMovie.duration_min <= 0) {
      setError("Duration must be greater than 0");
      return;
    }
    if (!editedMovie.release_date) {
      setError("Release date is required");
      return;
    }

    // Convert string inputs to arrays
    const actorsArray =
      typeof editedMovie.actors === "string"
        ? editedMovie.actors
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : editedMovie.actors || [];
    const genreArray =
      typeof editedMovie.genre === "string"
        ? editedMovie.genre
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
        : editedMovie.genre || [];

    onUpdate(editedMovie.movie_id, {
      title: editedMovie.title.trim(),
      description: editedMovie.description?.trim() || "",
      duration_min: editedMovie.duration_min,
      release_date: editedMovie.release_date,
      rating: editedMovie.rating?.toString() || undefined,
      poster_url: editedMovie.poster_url?.trim() || "",
      trailer_url: editedMovie.trailer_url?.trim() || "",
      director: editedMovie.director?.trim() || "",
      actors: actorsArray,
      genre: genreArray,
    });

    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedMovie(movie);
      setError("");
    } else {
      onClose();
    }
  };

  const statusOptions = [
    { value: MovieStatus.NowShowing, label: "Now Showing" },
    { value: MovieStatus.ComingSoon, label: "Coming Soon" },
    { value: MovieStatus.Stopped, label: "Stopped" },
  ];

  const sections: FormSection[] = [
    {
      title: "Movie Information",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "Enter movie title",
          value: editedMovie?.title || "",
          onChange: (value) =>
            setEditedMovie((prev) => (prev ? { ...prev, title: value } : null)),
        },
        {
          name: "description",
          label: "Description",
          type: "longtext",
          placeholder: "Enter movie description",
          value: editedMovie?.description || "",
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, description: value } : null
            ),
        },
        {
          name: "duration_min",
          label: "Duration (minutes)",
          type: "number",
          placeholder: "Enter duration",
          value: editedMovie?.duration_min || 0,
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, duration_min: Number(value) } : null
            ),
        },
        {
          name: "release_date",
          label: "Release Date",
          type: "date",
          placeholder: "Select release date",
          value: editedMovie?.release_date || "",
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, release_date: value } : null
            ),
        },
        {
          name: "rating",
          label: "Advisory",
          type: "text",
          placeholder: "Enter content rating (e.g., PG-13, R)",
          value: editedMovie?.rating || "",
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, rating: value } : null
            ),
        },
        {
          name: "director",
          label: "Director",
          type: "text",
          placeholder: "Enter director name",
          value: editedMovie?.director || "",
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, director: value } : null
            ),
        },
        {
          name: "actors",
          label: "Actors",
          type: "text",
          placeholder: "Enter actors (comma-separated)",
          value: Array.isArray(editedMovie?.actors)
            ? editedMovie?.actors.join(", ")
            : editedMovie?.actors || "",
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, actors: value } : null
            ),
        },
        {
          name: "genre",
          label: "Genre",
          type: "text",
          placeholder: "Enter genres (comma-separated)",
          value: Array.isArray(editedMovie?.genre)
            ? editedMovie?.genre.join(", ")
            : editedMovie?.genre || "",
          onChange: (value) =>
            setEditedMovie((prev) => (prev ? { ...prev, genre: value } : null)),
        },
        {
          name: "status",
          label: "Status",
          type: "autocomplete",
          placeholder: "Select status",
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
          name: "poster_url",
          label: "Poster URL",
          type: "text",
          placeholder: "Enter poster URL",
          value: editedMovie?.poster_url || "",
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, poster_url: value } : null
            ),
        },
        {
          name: "trailer_url",
          label: "Trailer URL",
          type: "text",
          placeholder: "Enter trailer URL (YouTube, Vimeo, etc.)",
          value: editedMovie?.trailer_url || "",
          onChange: (value) =>
            setEditedMovie((prev) =>
              prev ? { ...prev, trailer_url: value } : null
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
