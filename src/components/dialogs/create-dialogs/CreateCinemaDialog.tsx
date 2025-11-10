import { useState } from 'react';
import CreateDialog from '../template/CreateDialog';
import type { FormSection } from '../template/CreateDialog';

interface CreateCinemaDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateCinemaDialog: React.FC<CreateCinemaDialogProps> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    // Validation
    if (!name.trim()) {
      setError('Cinema name is required');
      return;
    }
    if (!address.trim()) {
      setError('Address is required');
      return;
    }

    // TODO: Add cinema logic here
    console.log('Creating cinema:', { name, address });

    // Reset form and close
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setAddress('');
    setError('');
    onClose();
  };

  const sections: FormSection[] = [
    {
      title: 'Cinema Information',
      fields: [
        {
          name: 'name',
          label: 'Cinema Name',
          type: 'text',
          placeholder: 'Enter cinema name',
          required: true,
          value: name,
          onChange: setName,
        },
        {
          name: 'address',
          label: 'Address',
          type: 'longtext',
          placeholder: 'Enter cinema address',
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
    />
  );
};

export default CreateCinemaDialog;
