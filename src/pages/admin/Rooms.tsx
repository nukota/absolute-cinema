import { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { EventSeatOutlined, LocationOnOutlined } from '@mui/icons-material';
import CustomTabs from '../../components/layouts/Tabs';
import { mockRooms } from '../../utils/mockdata';

const Rooms = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);

  const tabs = [
    { label: 'All', value: 'All' },
    { label: 'Available', value: 'Available' },
    { label: 'Maintenance', value: 'Maintenance' },
  ];

  const handleAddNew = () => {
    console.log('Add new room');
  };

  return (
    <CustomTabs
      title="Rooms"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
      data={mockRooms}
      loading={loading}
      onAddNew={handleAddNew}
      addButtonText="Add Room"
      searchColumns={['name', 'type', 'cinema_name']}
      gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      gap="gap-6"
    >
      {(filteredData) =>
        filteredData.map((room) => (
          <Card
            key={room._id}
            sx={{
              maxWidth: 300,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              border: 1,
              borderColor: 'divider',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {room.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOnOutlined fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {room.cinema_name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip label={room.type} size="small" color="primary" />
                <Chip
                  label={room.status}
                  size="small"
                  color={room.status === 'Available' ? 'success' : 'warning'}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EventSeatOutlined fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Capacity: {room.capacity} seats
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))
      }
    </CustomTabs>
  );
};

export default Rooms;
