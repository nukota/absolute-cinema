import React from 'react';
import type { ReactNode } from 'react';
import Dialog from './Dialog';
import type { FormSection, DialogAction } from './Dialog';

export type { FormField } from './Field';
export type { FormSection, DialogAction };

interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  sections?: FormSection[];
  children?: ReactNode;
  onAdd: () => void;
  error?: string;
  showImage?: string;
  isLoading?: boolean;
}

const CreateDialog: React.FC<CreateDialogProps> = ({
  open,
  onClose,
  title,
  sections,
  children,
  onAdd,
  error,
  showImage,
  isLoading = false,
}) => {
  const actions: DialogAction[] = [
    {
      label: 'Cancel',
      onClick: onClose,
      variant: 'outlined',
      disabled: isLoading,
    },
    {
      label: 'Add',
      onClick: onAdd,
      variant: 'contained',
      color: 'primary',
      disabled: isLoading,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      sections={sections}
      actions={actions}
      error={error}
      showImage={showImage}
    >
      {children}
    </Dialog>
  );
};

export default CreateDialog;
