import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import EditsRecord from './EditsRecord';

import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import axios from 'axios';

export default function FullFeaturedCrsudGrid() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null); // Stores selected user ID
  const [selectedRowData, setSelectedRowData] = useState(null); // Stores data of selected row
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');
        const modifiedRows = response.data.map((row) => ({
          id: row._id,
          name: row.username,
          email: row.email,
          gender: row.gender,
          phoneNumber: row.phoneNumber,
          Shifttime: `${row.shifts.startTime} - ${row.shifts.endTime}`,
          role: row.role,
          status: row.status,
        }));
        setRows(modifiedRows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      setRows(rows.filter((row) => row.id !== id));
      console.log('Data deleted successfully!');
      // Clear localStorage after delete
      localStorage.removeItem('selectedRowData');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEditClick = (id) => {
    const selectedRow = rows.find((row) => row.id === id);
    setIsPopupOpen(true); 
    setSelectedUserId(id);
    setSelectedRowData(selectedRow); // Store data in state
    // Save data to localStorage for EditsRecord component access
    localStorage.setItem('selectedRowData', JSON.stringify(selectedRow));
    console.log(id)
  };
  

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const columns = [
    { field: 'name', headerName: 'Name', width: 175, editable: true },
    { field: 'email', headerName: 'Email', width: 160, align: 'left', headerAlign: 'left', editable: true },
    { field: 'gender', headerName: 'gender', width: 90, editable: true },
    { field: 'Shifttime', headerName: 'Shift Time', type: 'time', width: 180, editable: true },
    { field: 'phoneNumber', headerName: 'Phone Number', type: 'time', width: 140, editable: true },
    {
      field: 'role',
      headerName: 'role',
      width: 120,
      editable: true,
      type: 'singleSelect',
      valueOptions: [ 'Manager', 'Employee'],
    },
    {
      field: 'status',
      headerName: 'status',
      width: 130,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Working', 'On Leave'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              handleEditClick(id)
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,

        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 580,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{ toolbar: { setRows, setRowModesModel } }}
      />
      {isPopupOpen && <EditsRecord onClose={() => setIsPopupOpen(false)} userId={selectedUserId} isPopupOpen={isPopupOpen} />}

    </Box>
  );
}
