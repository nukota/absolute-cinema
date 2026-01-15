import { useState } from "react";
import CreateDialog from "../template/CreateDialog";
import type { FormSection } from "../template/CreateDialog";

interface CreateMovieDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: any) => Promise<void>;
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
  const [trailerUrl, setTrailerUrl] = useState("");
  const [director, setDirector] = useState("");
  const [actorsInput, setActorsInput] = useState(""); // String input for the field
  const [genreInput, setGenreInput] = useState(""); // String input for the field
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async () => {
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

    // Convert string inputs to arrays
    const actorsArray = actorsInput
      ? actorsInput
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "")
      : [];
    const genreArray = genreInput
      ? genreInput
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "")
      : [];

    setIsSubmitting(true);
    setError("");

    try {
      await onCreate({
        title: title.trim(),
        description: description.trim(),
        duration_min: parseInt(duration),
        release_date: releaseDate,
        rating: rating.trim() || undefined,
        poster_url: posterUrl.trim(),
        trailer_url: trailerUrl.trim(),
        director: director.trim(),
        actors: actorsArray,
        genre: genreArray,
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
    setTitle("");
    setDescription("");
    setDuration("");
    setReleaseDate("");
    setRating("");
    setPosterUrl("");
    setTrailerUrl("");
    setDirector("");
    setActorsInput("");
    setGenreInput("");
    setError("");
    setIsSubmitting(false);
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
          name: "trailer_url",
          label: "Trailer URL",
          type: "text",
          placeholder: "Enter trailer URL (YouTube, Vimeo, etc.)",
          value: trailerUrl,
          onChange: setTrailerUrl,
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
          type: "text",
          placeholder: "Enter actor names (comma-separated)",
          value: actorsInput,
          onChange: setActorsInput,
        },
        {
          name: "genre",
          label: "Genre",
          type: "text",
          placeholder: "Enter genres (comma-separated)",
          value: genreInput,
          onChange: setGenreInput,
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
      showImage="poster_url"
      isLoading={isSubmitting}
    />
  );
};

export default CreateMovieDialog;
