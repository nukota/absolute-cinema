import { useState, useEffect } from "react";
import DetailDialog from "../template/DetailDialog";
import type { FormSection } from "../template/DetailDialog";
import type { CinemaDTO } from "../../../utils/dtos/cinemaDTO";

interface DetailCinemaDialogProps {
  open: boolean;
  onClose: () => void;
  cinema: CinemaDTO | null;
  onUpdate: (id: string, data: { name: string; address: string }) => void;
  onDelete?: () => void;
}

const DetailCinemaDialog: React.FC<DetailCinemaDialogProps> = ({
  open,
  onClose,
  cinema,
  onUpdate,
  onDelete,
}) => {
  console.log("DetailCinemaDialog cinema:", cinema);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCinema, setEditedCinema] = useState<CinemaDTO | null>(cinema);
  const [error, setError] = useState("");

  // Reset editing state when dialog closes
  useEffect(() => {
    if (!open) {
      setIsEditing(false);
    }
  }, [open]);

  // Sync editedCinema with cinema prop when it changes
  useEffect(() => {
    setEditedCinema(cinema);
  }, [cinema]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedCinema(cinema);
  };

  const handleSave = () => {
    if (!editedCinema) return;

    // Validation
    if (!editedCinema.name.trim()) {
      setError("Cinema name is required");
      return;
    }
    if (!editedCinema.address.trim()) {
      setError("Address is required");
      return;
    }
    if (editedCinema.room_count < 0) {
      setError("Room count must be a positive number");
      return;
    }

    onUpdate(editedCinema.cinema_id, {
      name: editedCinema.name.trim(),
      address: editedCinema.address.trim(),
    });

    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedCinema(cinema);
      setError("");
    } else {
      onClose();
    }
  };

  const sections: FormSection[] = [
    {
      title: "Cinema Information",
      fields: [
        {
          name: "name",
          label: "Cinema Name",
          type: "text",
          placeholder: "Enter cinema name",
          value: editedCinema?.name || "",
          onChange: (value) =>
            setEditedCinema((prev) => (prev ? { ...prev, name: value } : null)),
        },
        {
          name: "address",
          label: "Address",
          type: "text",
          placeholder: "Enter address",
          value: editedCinema?.address || "",
          onChange: (value) =>
            setEditedCinema((prev) =>
              prev ? { ...prev, address: value } : null
            ),
        },
      ],
    },
  ];

  return (
    <DetailDialog
      open={open}
      onClose={onClose}
      title="Cinema Details"
      sections={sections}
      error={error}
      isEditable={isEditing}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={onDelete}
    />
  );
};

export default DetailCinemaDialog;
