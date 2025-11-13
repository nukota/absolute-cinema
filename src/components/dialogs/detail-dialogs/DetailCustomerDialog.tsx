import { useState } from 'react';
import DetailDialog from '../template/DetailDialog';
import type { FormSection } from '../template/DetailDialog';
import type { CustomerDTO } from '../../../utils/dtos/customerDTO';

interface DetailCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer: CustomerDTO | null;
  onSave?: (customer: CustomerDTO) => void;
  onDelete?: () => void;
}

const DetailCustomerDialog: React.FC<DetailCustomerDialogProps> = ({
  open,
  onClose,
  customer,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<CustomerDTO | null>(customer);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedCustomer(customer);
  };

  const handleSave = () => {
    if (!editedCustomer) return;

    // Validation
    if (!editedCustomer.full_name.trim()) {
      setError('Full name is required');
      return;
    }
    if (!editedCustomer.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!editedCustomer.dob) {
      setError('Date of birth is required');
      return;
    }

    onSave?.(editedCustomer);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedCustomer(customer);
      setError('');
    } else {
      onClose();
    }
  };

  const sections: FormSection[] = [
    {
      title: 'Personal Information',
      fields: [
        {
          name: 'full_name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'Enter full name',
          value: editedCustomer?.full_name || '',
          onChange: (value) =>
            setEditedCustomer((prev) =>
              prev ? { ...prev, full_name: value } : null
            ),
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter email',
          value: editedCustomer?.email || '',
          onChange: (value) =>
            setEditedCustomer((prev) => (prev ? { ...prev, email: value } : null)),
        },
        {
          name: 'dob',
          label: 'Date of Birth',
          type: 'date',
          placeholder: 'Select date of birth',
          value: editedCustomer?.dob || '',
          onChange: (value) =>
            setEditedCustomer((prev) => (prev ? { ...prev, dob: value } : null)),
        },
        {
          name: 'phone_number',
          label: 'Phone Number',
          type: 'tel',
          placeholder: 'Enter phone number',
          value: editedCustomer?.phone_number || '',
          onChange: (value) =>
            setEditedCustomer((prev) =>
              prev ? { ...prev, phone_number: value } : null
            ),
        },
        {
          name: 'CCCD',
          label: 'CCCD',
          type: 'text',
          placeholder: 'Enter CCCD',
          value: editedCustomer?.CCCD || '',
          onChange: (value) =>
            setEditedCustomer((prev) => (prev ? { ...prev, CCCD: value } : null)),
        },
      ],
    },
    {
      title: 'Account Information',
      fields: [
        {
          name: 'password_hash',
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password',
          value: editedCustomer?.password_hash || '',
          onChange: (value) =>
            setEditedCustomer((prev) =>
              prev ? { ...prev, password_hash: value } : null
            ),
          showPassword,
          onTogglePassword: () => setShowPassword(!showPassword),
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
