import { useState } from "react";
import CreateDialog from "../template/CreateDialog";
import type { FormSection } from "../template/CreateDialog";
import { MovieStatus } from "../../../utils/enum";

interface CreateMovieDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

const CreateMovieDialog: React.FC<CreateMovieDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    // Validation
    if (!title.trim()) {
      setError("Movie title is required");
      return;
    }
    if (!duration || parseInt(duration) <= 0) {
      setError("Valid duration is required");
      return;
    }
    if (!releaseDate) {
      setError("Release date is required");
      return;
    }

    // TODO: Add movie logic here
    onCreate({
      title: title.trim(),
      description: description.trim(),
      duration_min: parseInt(duration),
      release_date: releaseDate,
      rating: rating.trim() || undefined,
      poster_url: posterUrl.trim(),
      director: director.trim(),
      actors,
      genre,
    });

    // Reset form and close
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDuration("");
    setReleaseDate("");
    setRating("");
    setPosterUrl("");
    setDirector("");
    setActors([]);
    setGenre([]);
    setError("");
    onClose();
  };

  const sections: FormSection[] = [
    {
      title: "Movie Information",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "Enter movie title",
          required: true,
          value: title,
          onChange: setTitle,
        },
        {
          name: "description",
          label: "Description",
          type: "longtext",
          placeholder: "Enter movie description",
          value: description,
          onChange: setDescription,
        },
        {
          name: "duration",
          label: "Duration (minutes)",
          type: "number",
          placeholder: "Enter duration in minutes",
          required: true,
          value: duration,
          onChange: setDuration,
        },
        {
          name: "releaseDate",
          label: "Release Date",
          type: "date",
          required: true,
          value: releaseDate,
          onChange: setReleaseDate,
        },
        {
          name: "rating",
          label: "Advisory",
          type: "text",
          placeholder: "Enter content rating (e.g., PG-13, R)",
          value: rating,
          onChange: setRating,
        },
        {
          name: "poster_url",
          label: "Poster URL",
          type: "text",
          placeholder: "Enter poster image URL",
          value: posterUrl,
          onChange: setPosterUrl,
        },
        {
          name: "director",
          label: "Director",
          type: "text",
          placeholder: "Enter director name",
          value: director,
          onChange: setDirector,
        },
        {
          name: "actors",
          label: "Actors",
          type: "list",
          placeholder: "Enter actor names (comma-separated)",
          value: actors,
          onChange: setActors,
        },
        {
          name: "genre",
          label: "Genre",
          type: "list",
          placeholder: "Enter genres (comma-separated)",
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
