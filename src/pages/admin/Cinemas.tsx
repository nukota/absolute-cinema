import { useState } from 'react';
import CustomTabs from '../../components/layouts/Tabs';
import Cinema from '../../components/items/Cinema';
import { mockCinemas } from '../../utils/mockdata';
import type { CinemaDTO } from '../../utils/dtos/cinemaDTO';
import CreateCinemaDialog from '../../components/dialogs/create-dialogs/CreateCinemaDialog';
import DetailCinemaDialog from '../../components/dialogs/detail-dialogs/DetailCinemaDialog';

const Cinemas = () => {
  const [loading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<CinemaDTO | null>(null);

  const handleAddNew = () => {
    setOpenCreateDialog(true);
  };

  const handleInfoClick = (cinema: CinemaDTO) => {
    setSelectedCinema(cinema);
    setOpenDetailDialog(true);
  };

  const handleSave = (cinema: CinemaDTO) => {
    console.log('Saving cinema:', cinema);
    setOpenDetailDialog(false);
  };

  const handleDelete = () => {
    console.log('Deleting cinema:', selectedCinema?.cinema_id);
    setOpenDetailDialog(false);
  };

  return (
    <>
      <CustomTabs
        title="Cinemas"
        data={mockCinemas}
        loading={loading}
        onAddNew={handleAddNew}
        addButtonText="Add Cinema"
        searchColumns={['name', 'address', 'city']}
        gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        gap="gap-6"
      >
        {(filteredData) =>
          filteredData.map((cinema) => (
            <Cinema
              key={cinema.cinema_id}
              cinema={cinema}
              handleInfoClick={() => handleInfoClick(cinema)}
            />
          ))
        }
      </CustomTabs>
      <CreateCinemaDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
      <DetailCinemaDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        cinema={selectedCinema}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Cinemas;
