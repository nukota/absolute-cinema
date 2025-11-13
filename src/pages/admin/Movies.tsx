import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Movie from '../../components/items/Movie';
import { mockMovies } from '../../utils/mockdata';
import type { MovieDTO } from '../../utils/dtos/movieDTO';
import CreateMovieDialog from '../../components/dialogs/create-dialogs/CreateMovieDialog';
import DetailMovieDialog from '../../components/dialogs/detail-dialogs/DetailMovieDialog';

const Movies = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDTO | null>(null);

  const tabs = [
    { label: 'All', value: 'All' },
    { label: 'Now Showing', value: 'now showing' },
    { label: 'Coming Soon', value: 'coming soon' },
    { label: 'Stopped', value: 'stopped' },
    { label: 'Unknown', value: 'unknown' },
  ];

  const handleAddNew = () => {
    setOpenCreateDialog(true);
  };

  const handleInfoClick = (movie: MovieDTO) => {
    setSelectedMovie(movie);
    setOpenDetailDialog(true);
  };

  const handleSave = (movie: MovieDTO) => {
    console.log('Saving movie:', movie);
    setOpenDetailDialog(false);
  };

  const handleDelete = () => {
    console.log('Deleting movie:', selectedMovie?.movie_id);
    setOpenDetailDialog(false);
  };

  return (
    <>
      <CustomTabs
        title="Movies"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        data={mockMovies}
        loading={loading}
        onAddNew={handleAddNew}
        addButtonText="Add Movie"
        searchColumns={['title', 'genre']}
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
      />
      <DetailMovieDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        movie={selectedMovie}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Movies;
