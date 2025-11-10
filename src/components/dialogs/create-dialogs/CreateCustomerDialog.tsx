import { useState } from 'react';
import CreateDialog from '../template/CreateDialog';
import type { FormSection } from '../template/CreateDialog';

interface CreateCustomerDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateCustomerDialog: React.FC<CreateCustomerDialogProps> = ({
  open,
  onClose,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cccd, setCccd] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = () => {
    // Validation
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!dob) {
      setError('Date of birth is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    // TODO: Add customer logic here
    console.log('Creating customer:', {
      fullName,
      email,
      dob,
      phoneNumber,
      cccd,
      password,
    });

    // Reset form and close
    handleClose();
  };

  const handleClose = () => {
    setFullName('');
    setEmail('');
    setDob('');
    setPhoneNumber('');
    setCccd('');
    setPassword('');
    setShowPassword(false);
    setError('');
    onClose();
  };

  const sections: FormSection[] = [
    {
      title: 'Customer Information',
      fields: [
        {
          name: 'fullName',
          label: 'Full Name',
          type: 'text',
          placeholder: 'Enter full name',
          required: true,
          value: fullName,
          onChange: setFullName,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter email address',
          required: true,
          value: email,
          onChange: setEmail,
        },
        {
          name: 'dob',
          label: 'Date of Birth',
          type: 'date',
          required: true,
          value: dob,
          onChange: setDob,
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'tel',
          placeholder: 'Enter phone number',
          value: phoneNumber,
          onChange: setPhoneNumber,
        },
        {
          name: 'cccd',
          label: 'CCCD',
          type: 'text',
          placeholder: 'Enter CCCD number',
          value: cccd,
          onChange: setCccd,
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password',
          required: true,
          value: password,
          onChange: setPassword,
          showPassword: showPassword,
          onTogglePassword: () => setShowPassword(!showPassword),
        },
      ],
    },
  ];

  return (
    <CreateDialog
      open={open}
      onClose={handleClose}
      title="Add New Customer"
      sections={sections}
      onAdd={handleAdd}
      error={error}
    />
  );
};

export default CreateCustomerDialog;
