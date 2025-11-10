import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Movie from '../../components/items/Movie';
import { mockMovies } from '../../utils/mockdata';
import CreateMovieDialog from '../../components/dialogs/create-dialogs/CreateMovieDialog';

const Movies = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

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
              handleInfoClick={() =>
                console.log('Movie clicked:', movie.movie_id)
              }
            />
          ))
        }
      </CustomTabs>
      <CreateMovieDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </>
  );
};

export default Movies;
