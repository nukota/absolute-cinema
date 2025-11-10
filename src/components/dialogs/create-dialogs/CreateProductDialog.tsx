import { useState } from 'react';
import CreateDialog from '../template/CreateDialog';
import type { FormSection } from '../template/CreateDialog';
import { ProductCategory } from '../../../utils/enum';

interface CreateProductDialogProps {
  open: boolean;
  onClose: () => void;
}

const categoryOptions = [
  { value: ProductCategory.Food, label: 'Food' },
  { value: ProductCategory.Drink, label: 'Drink' },
  { value: ProductCategory.Souvenir, label: 'Souvenir' },
  { value: ProductCategory.Other, label: 'Other' },
];

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<{ value: string; label: string } | null>(null);
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    // Validation
    if (!name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!category) {
      setError('Category is required');
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setError('Valid price is required');
      return;
    }

    // TODO: Add product logic here
    console.log('Creating product:', {
      name,
      category: category.value,
      price: parseFloat(price),
      image,
    });

    // Reset form and close
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setCategory(null);
    setPrice('');
    setImage('');
    setError('');
    onClose();
  };

  const sections: FormSection[] = [
    {
      title: 'Product Information',
      fields: [
        {
          name: 'name',
          label: 'Product Name',
          type: 'text',
          placeholder: 'Enter product name',
          required: true,
          value: name,
          onChange: setName,
        },
        {
          name: 'category',
          label: 'Category',
          type: 'autocomplete',
          placeholder: 'Select category',
          required: true,
          options: categoryOptions,
          getOptionLabel: (option: any) => option.label,
          value: category,
          onChange: setCategory,
        },
        {
          name: 'price',
          label: 'Price (VND)',
          type: 'number',
          placeholder: 'Enter price',
          required: true,
          value: price,
          onChange: setPrice,
        },
        {
          name: 'image',
          label: 'Image URL',
          type: 'text',
          placeholder: 'Enter image URL',
          value: image,
          onChange: setImage,
        },
      ],
    },
  ];

  return (
    <CreateDialog
      open={open}
      onClose={handleClose}
      title="Add New Product"
      sections={sections}
      onAdd={handleAdd}
      error={error}
    />
  );
};

export default CreateProductDialog;
