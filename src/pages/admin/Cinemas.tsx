import { useState } from "react";
import CustomTabs from "../../components/layouts/Tabs";
import Cinema from "../../components/items/Cinema";
import {
  useAllCinemas,
  useDeleteCinema,
  useCreateCinema,
  useUpdateCinema,
} from "../../services/cinemasService";
import type { CinemaDTO } from "../../utils/dtos/cinemaDTO";
import CreateCinemaDialog from "../../components/dialogs/create-dialogs/CreateCinemaDialog";
import DetailCinemaDialog from "../../components/dialogs/detail-dialogs/DetailCinemaDialog";
import { useFeedback } from "../../provider/FeedbackProvider";

const Cinemas = () => {
  const { data: cinemas, isLoading: loading } = useAllCinemas();
  const deleteCinemaMutation = useDeleteCinema();
  const createCinemaMutation = useCreateCinema();
  const updateCinemaMutation = useUpdateCinema();
  const { showSnackbar } = useFeedback();
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

  const handleCreateCinema = async (data: { name: string; address: string }) => {
    try {
      await createCinemaMutation.mutateAsync(data);
      setOpenCreateDialog(false);
      showSnackbar({
        message: "Cinema created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Create cinema error:", error);
      showSnackbar({
        message: "Failed to create cinema. Please try again.",
        severity: "error",
      });
    }
  };

  const handleUpdateCinema = (
    id: string,
    data: { name: string; address: string }
  ) => {
    updateCinemaMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Cinema updated successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Update cinema error:", error);
          showSnackbar({
            message: "Failed to update cinema. Please try again.",
            severity: "error",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    if (selectedCinema) {
      deleteCinemaMutation.mutate(selectedCinema.cinema_id, {
        onSuccess: () => {
          setOpenDetailDialog(false);
          showSnackbar({
            message: "Cinema deleted successfully!",
            severity: "success",
          });
        },
        onError: (error) => {
          console.error("Delete cinema error:", error);
          showSnackbar({
            message: "Failed to delete cinema. Please try again.",
            severity: "error",
          });
        },
      });
    }
  };

  return (
    <>
      <CustomTabs
        title="Cinemas"
        data={cinemas || []}
        loading={loading}
        onAddNew={handleAddNew}
        addButtonText="Add Cinema"
        searchColumns={["name", "address", "city"]}
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
        onCreate={handleCreateCinema}
      />
      <DetailCinemaDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        cinema={selectedCinema}
        onUpdate={handleUpdateCinema}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Cinemas;
