import { useState } from "react";
import CustomTabs from "../../components/layouts/Tabs";
import Movie from "../../components/items/Movie";
import {
  useAllMovies,
  useDeleteMovie,
  useCreateMovie,
  useUpdateMovie,
} from "../../services/moviesService";
import type { MovieDTO } from "../../utils/dtos/movieDTO";
import CreateMovieDialog from "../../components/dialogs/create-dialogs/CreateMovieDialog";
import DetailMovieDialog from "../../components/dialogs/detail-dialogs/DetailMovieDialog";
import { useFeedback } from "../../provider/FeedbackProvider";

const Movies = () => {
  const { data: movies, isLoading: loading } = useAllMovies();
  const deleteMovieMutation = useDeleteMovie();
  const createMovieMutation = useCreateMovie();
  const updateMovieMutation = useUpdateMovie();
  const { showSnackbar } = useFeedback();
  const [activeTab, setActiveTab] = useState("All");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDTO | null>(null);

  const tabs = [
    { label: "All", value: "All" },
    { label: "Now Showing", value: "now showing" },
    { label: "Coming Soon", value: "coming soon" },
    { label: "Stopped", value: "stopped" },
    { label: "Unknown", value: "unknown" },
  ];

  const handleAddNew = () => {
    setOpenCreateDialog(true);
  };

  const handleInfoClick = (movie: MovieDTO) => {
    setSelectedMovie(movie);
    setOpenDetailDialog(true);
  };

  const handleCreateMovie = async (data: any) => {
    try {
      await createMovieMutation.mutateAsync(data);
      setOpenCreateDialog(false);
      showSnackbar({
        message: "Movie created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Create movie error:", error);
      showSnackbar({
        message: "Failed to create movie. Please try again.",
        severity: "error",
      });
    }
  };

  const handleUpdateMovie = (id: string, data: any) => {
    updateMovieMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Movie updated successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Update movie error:", error);
          showSnackbar({
            message: "Failed to update movie. Please try again.",
            severity: "error",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    if (selectedMovie) {
      deleteMovieMutation.mutate(selectedMovie.movie_id, {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Movie deleted successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Delete movie error:", error);
          showSnackbar({
            message: "Failed to delete movie. Please try again.",
            severity: "error",
          });
        },
      });
    }
  };

  return (
    <>
      <CustomTabs
        title="Movies"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        data={movies || []}
        loading={loading}
        onAddNew={handleAddNew}
        addButtonText="Add Movie"
        searchColumns={["title", "genre"]}
        tabFilterProperty="status"
        gridCols="grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        gap="gap-6"
      >
        {(filteredData) =>
          filteredData.map((movie) => (
            <Movie
              key={movie.movie_id}
              movie={movie}
              handleInfoClick={() => handleInfoClick(movie)}
            />
          ))
        }
      </CustomTabs>
      <CreateMovieDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onCreate={handleCreateMovie}
      />
      <DetailMovieDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        movie={selectedMovie}
        onUpdate={handleUpdateMovie}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Movies;
