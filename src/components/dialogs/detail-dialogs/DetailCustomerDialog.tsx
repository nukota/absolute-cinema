import { useState, useEffect } from "react";
import DetailDialog from "../template/DetailDialog";
import type { FormSection } from "../template/DetailDialog";
import type { CustomerDTO } from "../../../utils/dtos/customerDTO";

interface DetailCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer: CustomerDTO | null;
  onUpdate: (
    id: string,
    data: {
      full_name?: string;
      email?: string;
      dob?: string;
      phone_number?: string;
      cccd?: string;
    }
  ) => void;
  onDelete?: () => void;
}

const DetailCustomerDialog: React.FC<DetailCustomerDialogProps> = ({
  open,
  onClose,
  customer,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<CustomerDTO | null>(
    customer
  );
  const [error, setError] = useState("");

  // Reset editing state when dialog closes
  useEffect(() => {
    if (!open) {
      setIsEditing(false);
    }
  }, [open]);

  // Sync editedCustomer with customer prop when it changes
  useEffect(() => {
    setEditedCustomer(customer);
  }, [customer]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedCustomer(customer);
  };

  const handleSave = () => {
    if (!editedCustomer) return;

    // Validation
    if (!editedCustomer.full_name.trim()) {
      setError("Full name is required");
      return;
    }
    if (!editedCustomer.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!editedCustomer.dob) {
      setError("Date of birth is required");
      return;
    }

    onUpdate(editedCustomer.customer_id, {
      full_name: editedCustomer.full_name.trim(),
      email: editedCustomer.email.trim(),
      dob: editedCustomer.dob,
      phone_number: editedCustomer.phone_number?.trim() || undefined,
      cccd: editedCustomer.cccd?.trim() || undefined,
    });

    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedCustomer(customer);
      setError("");
    } else {
      onClose();
    }
  };

  const sections: FormSection[] = [
    {
      title: "Personal Information",
      fields: [
        {
          name: "full_name",
          label: "Full Name",
          type: "text",
          placeholder: "Enter full name",
          value: editedCustomer?.full_name || "",
          onChange: (value) =>
            setEditedCustomer((prev) =>
              prev ? { ...prev, full_name: value } : null
            ),
          disabled: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter email",
          value: editedCustomer?.email || "",
          onChange: (value) =>
            setEditedCustomer((prev) =>
              prev ? { ...prev, email: value } : null
            ),
          disabled: true,
        },
        {
          name: "dob",
          label: "Date of Birth",
          type: "date",
          placeholder: "Select date of birth",
          value: editedCustomer?.dob || "",
          onChange: (value) =>
            setEditedCustomer((prev) =>
              prev ? { ...prev, dob: value } : null
            ),
        },
        {
          name: "phone_number",
          label: "Phone Number",
          type: "tel",
          placeholder: "Enter phone number",
          value: editedCustomer?.phone_number || "",
          onChange: (value) =>
            setEditedCustomer((prev) =>
              prev ? { ...prev, phone_number: value } : null
            ),
        },
        {
          name: "cccd",
          label: "CCCD",
          type: "text",
          placeholder: "Enter CCCD",
          value: editedCustomer?.cccd || "",
          onChange: (value) =>
            setEditedCustomer((prev) =>
              prev ? { ...prev, cccd: value } : null
            ),
        },
      ],
    },
  ];

  return (
    <DetailDialog
      open={open}
      onClose={onClose}
      title="Customer Details"
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

export default DetailCustomerDialog;
