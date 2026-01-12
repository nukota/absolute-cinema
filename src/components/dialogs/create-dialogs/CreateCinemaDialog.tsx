import { useState } from "react";
import CreateDialog from "../template/CreateDialog";
import type { FormSection } from "../template/CreateDialog";

interface CreateCinemaDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: { name: string; address: string }) => Promise<void>;
}

const CreateCinemaDialog: React.FC<CreateCinemaDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async () => {
    // Validation
    if (!name.trim()) {
      setError("Cinema name is required");
      return;
    }
    if (!address.trim()) {
      setError("Address is required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onCreate({
        name: name.trim(),
        address: address.trim(),
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
    setName("");
    setAddress("");
    setError("");
    setIsSubmitting(false);
    onClose();
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
          required: true,
          value: name,
          onChange: setName,
        },
        {
          name: "address",
          label: "Address",
          type: "longtext",
          placeholder: "Enter cinema address",
          required: true,
          value: address,
          onChange: setAddress,
        },
      ],
    },
  ];

  return (
    <CreateDialog
      open={open}
      onClose={handleClose}
      title="Add New Cinema"
      sections={sections}
      onAdd={handleAdd}
      error={error}
      isLoading={isSubmitting}
    />
  );
};

export default CreateCinemaDialog;
