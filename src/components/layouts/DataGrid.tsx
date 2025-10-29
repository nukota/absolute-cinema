import React from "react";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface CustomDataGridProps {
  title: string;
  loading: boolean;
  rows: any[];
  columns: GridColDef[];
  onAddNew?: () => void;
  addButtonText?: string;
  selectedRows?: string[];
  onRowSelectionChange?: (newSelection: string[]) => void;
  onDeleteSelected?: () => void;
  showCheckboxSelection?: boolean;
  getRowId?: (row: any) => string;
  pageSize?: number;
  pageSizeOptions?: number[];
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
  title,
  loading,
  rows,
  columns,
  onAddNew,
  addButtonText = "Add New",
  selectedRows = [],
  onRowSelectionChange,
  onDeleteSelected,
  showCheckboxSelection = false,
  getRowId = (row) => row._id,
  pageSize = 10,
  pageSizeOptions = [6, 10, 20],
}) => {
  return (
    <div className="flex flex-col w-full h-full max-w-full overflow-hidden min-h-screen">
      {/* Title Bar */}
      <div className="text-xl sm:text-2xl md:text-3xl lg:text-[40px] font-bold text-dark-gray mb-2">
        {title.replace("Management", "")}
      </div>

      {/* Action Bar */}
      {onAddNew || onDeleteSelected ? (
        <div className="flex justify-end gap-4 items-center mb-2 sm:mb-2">
          {onDeleteSelected && selectedRows.length > 0 && onDeleteSelected && (
            <Button
              onClick={onDeleteSelected}
              variant="text"
              sx={{
                color: "#6b7280", // gray text
                "&:hover": { backgroundColor: "rgba(107,114,128,0.08)" }, // subtle gray hover
              }}
              startIcon={<DeleteIcon sx={{ color: "#6b7280" }} />}
              disableElevation
            >
              Delete Selected ({selectedRows.length})
            </Button>
          )}
          {onAddNew ? (
            <Button
              onClick={onAddNew}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              disableElevation
            >
              {addButtonText}
            </Button>
          ) : (
            <div className="w-24 h-9">{/* Placeholder for alignment */}</div>
          )}
        </div>
      ) : (
        <div className="h-16" />
      )}

      {/* DataGrid Container */}
      {loading == false ? (
        <div className="rounded-[20px] overflow-hidden min-h-[500px] md:min-h-[636px] bg-white shadow-md">
          <MuiDataGrid
            columnHeaderHeight={48}
            rowHeight={40}
            rows={rows}
            columns={columns}
            getRowId={getRowId}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize,
                },
              },
            }}
            pageSizeOptions={pageSizeOptions}
            checkboxSelection={showCheckboxSelection}
            disableRowSelectionOnClick={!showCheckboxSelection}
            onRowSelectionModelChange={(newSelection) => {
              // Extract the ids from the selection model
              const ids = newSelection.ids || new Set();
              if (onRowSelectionChange) {
                onRowSelectionChange(
                  Array.from(ids).map((id: any) => String(id))
                );
              }
            }}
            density="comfortable"
            sx={{
              // height: "100%",
              "& .MuiDataGrid-columnHeaders": {
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                color: "#101010",
              },
              "& .MuiDataGrid-cell": {
                fontSize: { xs: "12px", sm: "14px" },
                color: "#666",
                padding: { xs: "4px 6px", sm: "6px 8px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                textAlign: "left",
              },
              "& .MuiDataGrid-row": {
                minHeight: { xs: "48px", sm: "48px" },
                "&:nth-of-type(odd)": {
                  backgroundColor: "#fff",
                },
                "&:nth-of-type(even)": {
                  backgroundColor: "#f8f8f8",
                },
                "&:nth-of-type(odd):hover": {
                  backgroundColor: "#f3e5f5 !important",
                },
                "&:nth-of-type(even):hover": {
                  backgroundColor: "#ede7f6 !important",
                },
                "&.Mui-selected": {
                  backgroundColor: "#e1bee7 !important",
                },
              },
              "& .MuiDataGrid-toolbarContainer": {
                padding: { xs: "8px", sm: "16px" },
              },
              // Mobile-specific adjustments
              "@media (max-width: 768px)": {
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontSize: "11px",
                  fontWeight: 600,
                },
                "& .MuiDataGrid-cell": {
                  fontSize: "11px",
                  padding: "6px 8px",
                },
                "& .MuiDataGrid-row": {
                  minHeight: "44px",
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="rounded-lg border-[#e0e0e0] border overflow-hidden min-h-[500px] md:min-h-[636px] bg-white flex shadow-md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              gap: 4,
            }}
          >
            <CircularProgress sx={{ color: "#555" }} />
            <Typography variant="h6" sx={{ color: "#555" }}>
              Loading...
            </Typography>
          </Box>
        </div>
      )}
    </div>
  );
};

export default CustomDataGrid;
