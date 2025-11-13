import { useState } from 'react';
import DetailDialog from '../template/DetailDialog';
import type { FormSection } from '../template/DetailDialog';
import type { RatingDTO } from '../../../utils/dtos/ratingDTO';

interface DetailRatingDialogProps {
  open: boolean;
  onClose: () => void;
  rating: RatingDTO | null;
  onDelete?: () => void;
}

const DetailRatingDialog: React.FC<DetailRatingDialogProps> = ({
  open,
  onClose,
  rating,
  onDelete,
}) => {
  const [error] = useState('');

  const sections: FormSection[] = [
    {
      title: 'Customer Information',
      fields: [
        {
          name: 'customer_name',
          label: 'Customer Name',
          type: 'text',
          value: rating?.customer.full_name || '',
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'customer_email',
          label: 'Customer Email',
          type: 'email',
          value: rating?.customer.email || '',
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: 'Movie Information',
      fields: [
        {
          name: 'movie_title',
          label: 'Movie Title',
          type: 'text',
          value: rating?.movie.title || '',
          onChange: () => {},
          disabled: true,
        },
      ],
    },
    {
      title: 'Rating Details',
      fields: [
        {
          name: 'rating_value',
          label: 'Rating Value',
          type: 'number',
          value: rating?.rating_value || 0,
          onChange: () => {},
          disabled: true,
        },
        {
          name: 'review',
          label: 'Review',
          type: 'longtext',
          value: rating?.review || '',
          onChange: () => {},
          disabled: true,
        },
      ],
    },
  ];

  return (
    <DetailDialog
      open={open}
      onClose={onClose}
      title="Rating Details"
      sections={sections}
      error={error}
      isEditable={false}
      onDelete={onDelete}
    />
  );
};

export default DetailRatingDialog;
