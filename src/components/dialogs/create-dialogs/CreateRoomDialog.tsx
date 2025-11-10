import { useState } from 'react';
import CreateDialog from '../template/CreateDialog';
import type { FormSection } from '../template/CreateDialog';
import { mockCinemas } from '../../../utils/mockdata';

interface CreateRoomDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateRoomDialog: React.FC<CreateRoomDialogProps> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [cinema, setCinema] = useState<{ cinema_id: string; name: string } | null>(null);
  const [capacity, setCapacity] = useState('');
  const [error, setError] = useState('');

  const cinemaOptions = mockCinemas.map((c) => ({
    cinema_id: c.cinema_id,
    name: c.name,
  }));

  const handleAdd = () => {
    // Validation
    if (!name.trim()) {
      setError('Room name is required');
      return;
    }
    if (!cinema) {
      setError('Cinema is required');
      return;
    }
    if (!capacity || parseInt(capacity) <= 0) {
      setError('Valid capacity is required');
      return;
    }

    // TODO: Add room logic here
    console.log('Creating room:', {
      name,
      cinema,
      capacity: parseInt(capacity),
    });

    // Reset form and close
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setCinema(null);
    setCapacity('');
    setError('');
    onClose();
  };

  const sections: FormSection[] = [
    {
      title: 'Room Information',
      fields: [
        {
          name: 'cinema',
          label: 'Cinema',
          type: 'autocomplete',
          placeholder: 'Select cinema',
          required: true,
          options: cinemaOptions,
          getOptionLabel: (option: any) => option.name,
          value: cinema,
          onChange: setCinema,
        },
        {
          name: 'name',
          label: 'Room Name',
          type: 'text',
          placeholder: 'Enter room name',
          required: true,
          value: name,
          onChange: setName,
        },
        {
          name: 'capacity',
          label: 'Capacity',
          type: 'number',
          placeholder: 'Enter room capacity',
          required: true,
          value: capacity,
          onChange: setCapacity,
        },
      ],
    },
  ];

  return (
    <CreateDialog
      open={open}
      onClose={handleClose}
      title="Add New Room"
      sections={sections}
      onAdd={handleAdd}
      error={error}
    />
  );
};

export default CreateRoomDialog;
