import React, { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Button,
  TextField,
  InputAdornment,
  Skeleton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

interface TabItem {
  label: string;
  value: string;
}

interface SelectFilterOption {
  label: string;
  value: string;
}

interface SelectFilter {
  label: string;
  property: string; // Property to filter by (supports nested paths like "cinema.name")
  options: SelectFilterOption[];
}

interface CustomTabsProps {
  title: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  tabs?: TabItem[];
  data: any[]; // Raw data array
  loading?: boolean;
  gridCols?: string;
  gap?: string;
  className?: string;
  onAddNew?: () => void;
  addButtonText?: string;
  dateColumns?: string[]; // Array of column names that can be filtered with dates
  searchColumns?: string[]; // Array of column names to search in
  tabFilterProperty?: string; // Property name to filter by (e.g., 'status', 'category', 'type')
  customTabFilter?: (item: any, activeTab: string) => boolean; // Custom filter function for tabs
  selectFilters?: SelectFilter[]; // Array of select filters
  children: (filteredData: any[]) => ReactNode; // Render prop for filtered data
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  title,
  activeTab = 'All',
  onTabChange,
  tabs = [],
  data,
  loading = false,
  gridCols = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
  gap = 'gap-y-8',
  className = '',
  onAddNew,
  addButtonText = 'Add New',
  dateColumns = [],
  searchColumns = [],
  tabFilterProperty = 'status', // Default property to filter by
  customTabFilter,
  selectFilters = [],
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectFilterValues, setSelectFilterValues] = useState<
    Record<string, string>
  >({});

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    onTabChange?.(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSelectFilterChange = (property: string, value: string) => {
    setSelectFilterValues((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  // Filtering logic moved inside CustomTabs
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Tab filtering with flexible property-based filtering
      let matchesTab = true; // Default to true when no tabs

      if (tabs.length > 0 && activeTab && activeTab !== 'All') {
        if (customTabFilter) {
          // Use custom filter function if provided
          matchesTab = customTabFilter(item, activeTab);
        } else if (tabFilterProperty) {
          // Filter by the specified property (works with any property name)
          const itemValue = item[tabFilterProperty];
          const tabValueLower = activeTab.toLowerCase();
          
          if (typeof itemValue === 'string') {
            // For string values, compare case-insensitively
            matchesTab = itemValue.toLowerCase() === tabValueLower;
          } else {
            // For other types, direct comparison
            matchesTab = itemValue === activeTab;
          }
        }
      }

      // Search filtering
      let matchesSearch = true;
      if (searchTerm && searchColumns.length > 0) {
        const searchTermLower = searchTerm.toLowerCase();
        matchesSearch = searchColumns.some((column) => {
          // Support nested object paths (e.g., "customer.full_name")
          const value = column
            .split('.')
            .reduce((obj, key) => obj?.[key], item);

          if (Array.isArray(value)) {
            return value.some(
              (v) => v && v.toString().toLowerCase().includes(searchTermLower),
            );
          }
          return (
            value && value.toString().toLowerCase().includes(searchTermLower)
          );
        });
      }

      // Date filtering
      let matchesDate = true;
      if (selectedDate && dateColumns.length > 0) {
        matchesDate = dateColumns.some((column) => {
          // Support nested object paths
          const itemDate = column
            .split('.')
            .reduce((obj, key) => obj?.[key], item);
          if (!itemDate) return false;

          // Handle different date formats
          if (column.includes('created_at') || column.includes('ordered_at')) {
            // For timestamp fields, match the date part
            return itemDate.startsWith(selectedDate);
          } else {
            // For date fields, check if item date is on or before selected date
            return new Date(itemDate) <= new Date(selectedDate);
          }
        });
      }

      // Select filters filtering
      let matchesSelectFilters = true;
      if (selectFilters.length > 0) {
        matchesSelectFilters = selectFilters.every((filter) => {
          const selectedValue = selectFilterValues[filter.property];
          if (!selectedValue || selectedValue === 'all') return true;

          // Support nested object paths
          const itemValue = filter.property
            .split('.')
            .reduce((obj, key) => obj?.[key], item);

          if (typeof itemValue === 'string') {
            return itemValue.toLowerCase() === selectedValue.toLowerCase();
          }
          return itemValue === selectedValue;
        });
      }

      return matchesTab && matchesSearch && matchesDate && matchesSelectFilters;
    });
  }, [
    data,
    activeTab,
    searchTerm,
    selectedDate,
    searchColumns,
    dateColumns,
    tabFilterProperty,
    customTabFilter,
    tabs,
    selectFilters,
    selectFilterValues,
  ]);

  const showActionBar =
    onAddNew ||
    searchColumns.length > 0 ||
    dateColumns.length > 0 ||
    selectFilters.length > 0;

  return (
    <div
      className={`flex flex-col w-full h-full max-w-full min-h-screen xl:min-h-[800px] ${className}`}
    >
      {/* Title */}
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-medium text-dark-gray mb-2">
        {title}
      </div>

      {/* Action Bar */}
      {showActionBar && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            rowGap: 1,
            alignItems: { xs: 'flex-start', md: 'center' },
            mt: 2,
            mb: 1,
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'flex-start', md: 'space-between' },
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* Date Filter */}
            {dateColumns.length > 0 && (
              <TextField
                type="date"
                size="small"
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={
                  dateColumns.includes('ordered_at')
                    ? { shrink: true }
                    : undefined
                }
                sx={{
                  width: 240,
                  backgroundColor: 'white',
                  borderRadius: '4px',
                }}
              />
            )}

            {/* Search Field */}
            {searchColumns.length > 0 && (
              <TextField
                placeholder="Search"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: 240,
                  backgroundColor: 'white',
                  borderRadius: '4px',
                }}
              />
            )}

            {/* Select Filters */}
            {selectFilters.map((filter) => (
              <FormControl
                key={filter.property}
                size="small"
                sx={{
                  minWidth: 200,
                  backgroundColor: 'white',
                  borderRadius: '4px',
                }}
              >
                <InputLabel>{filter.label}</InputLabel>
                <Select
                  value={selectFilterValues[filter.property] || 'all'}
                  label={filter.label}
                  onChange={(e) =>
                    handleSelectFilterChange(filter.property, e.target.value)
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  {filter.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>

          {/* Add Button */}
          {onAddNew && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              disableElevation
              onClick={onAddNew}
            >
              {addButtonText}
            </Button>
          )}
        </Box>
      )}

      {/* Tabs and Content */}
      <div className="content relative min-w-[360px] sm:min-w-[680px] w-full flex-1 bg-white border-[1px] border-light-gray rounded-md flex flex-col">
        {tabs.length > 0 && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  minWidth: 120,
                },
              }}
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Content Area */}
        <div
          className={`list flex-1 grid ${gridCols} ${gap} py-6 pl-4 overflow-y-auto max-h-[400px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[550px] xl:max-h-[600px] list-scrollbar`}
        >
          {loading
            ? // Skeleton loading state
              Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col space-y-2 py-2 px-6 w-full"
                >
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: '8px' }}
                  />
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '0.875rem' }}
                    width="60%"
                  />
                </div>
              ))
            : children(filteredData)}
        </div>
      </div>
    </div>
  );
};

export default CustomTabs;
