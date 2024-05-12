import React, { useState } from 'react';

const LeaveRequest = () => {
  // Dummy data for leave request activity
  const [activities, setActivities] = useState([
    { id: 1, fullName: 'John Doe', fromDate: '2024-05-09', toDate: '2024-05-11', appliedDate: '2024-05-08', reason: 'Vacation', status: 'Pending', appliedFromForm: true },
    { id: 2, fullName: 'Jane Smith', fromDate: '2024-05-08', toDate: '2024-05-10', appliedDate: '2024-05-07', reason: 'Personal', status: 'Approved', appliedFromForm: false },
    { id: 3, fullName: 'Alice Johnson', fromDate: '2024-05-07', toDate: '2024-05-09', appliedDate: '2024-05-06', reason: 'I need to quarantine myself for a few weeks as I get some symptoms of COVID-19', status: 'Declined', appliedFromForm: true }
  ]);
  const [showLeaveRequestForm, setShowLeaveRequestForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All'); // Default: Show all activities

  // Function to handle leave request form button click
  const handleLeaveRequestFormClick = () => {
    setShowLeaveRequestForm(true);
  };

  // Function to handle status filter
  const handleStatusFilter = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Filter activities based on selected status
  const filteredActivities = selectedStatus === 'All' ? activities : activities.filter(activity => activity.status === selectedStatus);

  // CSS styles for the component
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px', // Gap between cards
    },
    card: {
      width: '78vw', // Adjusted width
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    box: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      width: '100%',
      marginLeft: '-5px', // Adjust margin to move the box closer to the search bar
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#75D879', // Light green color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    searchBar: {
      width: '20%', // Adjusted width
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    selectStatus: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginLeft: '1px', // Adjust margin to move the status selector closer to the search bar
    },
    tableContainer: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      borderRadius: '5px',
    },
    th: {
      backgroundColor: '#75D879',
      color: '#fff',
      padding: '10px',
      textAlign: 'center',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ccc',
    },
    popup: {
      position: 'fixed',
      zIndex: '1',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    popupContent: {
      backgroundColor: '#fefefe',
      margin: '10% auto',
      padding: '20px',
      border: '1px solid #888',
      width: '60%',
      borderRadius: '5px',
      position: 'relative', 
    },
    formHeading: {
      textAlign: 'center',
      color: '#75D879', // Green color
      marginBottom: '20px',
      fontWeight: 'bold', // Added
    },
    formTable: {
      width: '100%',
    },
    formRow: {
      marginBottom: '10px',
    },
    formLabel: {
      fontWeight: 'bold',
    },
    formInput: {
      width: '100%',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    formTextarea: {
      width: '100%',
      padding: '20px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      resize: 'vertical',
    },
    formButton: {
      padding: '10px 20px',
      backgroundColor: '#75D879', // Green color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      position: 'absolute', 
      bottom: '10px', 
      left: '10px', 
    },
    closeButton: {
      padding: '10px 20px',
      backgroundColor: '#f44336', // Red color
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      position: 'absolute', 
      bottom: '10px', 
      right: '10px', 
    },
  };

  return (
    <div style={styles.container}>
      {/* Box containing Search Bar, Status Selector, and Leave Request Form Button */}
      <div style={styles.box}>
        {/* Search Bar */}
        <input type="text" placeholder="Search..." style={styles.searchBar} />

        {/* Status Selector */}
        <select style={styles.selectStatus} value={selectedStatus} onChange={handleStatusFilter}>
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
        </select>

        {/* Leave Request Form Button */}
        <button
          style={styles.button}
          onClick={handleLeaveRequestFormClick}
        >
          Leave Request Form
        </button>
      </div>

      {/* Leave Request Form Popup */}
      {showLeaveRequestForm && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            {/* Leave request form content goes here */}
            <h2 style={styles.formHeading}>Leave Request Form</h2>
            <form style={styles.formTable}>
              <table>
                <tbody>
                  <tr style={styles.formRow}>
                    <td style={styles.formLabel}>ID:</td>
                    <td><input type="text" style={styles.formInput} /></td>
                  </tr>
                  <tr style={styles.formRow}>
                    <td style={styles.formLabel}>Full Name:</td>
                    <td><input type="text" style={styles.formInput} /></td>
                  </tr>
                  <tr style={styles.formRow}>
                    <td style={styles.formLabel}>From Date:</td>
                    <td><input type="date" style={styles.formInput} /></td>
                  </tr>
                  <tr style={styles.formRow}>
                    <td style={styles.formLabel}>To Date:</td>
                    <td><input type="date" style={styles.formInput} /></td>
                  </tr>
                  <tr style={styles.formRow}>
                    <td style={styles.formLabel}>Reason:</td>
                    <td><textarea rows="4" style={styles.formTextarea}></textarea></td>
                  </tr>
                </tbody>
              </table>
              {/* Submit button for the form */}
              <button type="submit" style={styles.formButton}>Submit</button>
            </form>
            {/* Close button for the popup form */}
            <button style={styles.closeButton} onClick={() => setShowLeaveRequestForm(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Leave Request Activity Card */}
      <div style={styles.card}>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Id</th>
                <th style={styles.th}>Full Name</th>
                <th style={styles.th}>From Date</th>
                <th style={styles.th}>To Date</th>
                <th style={styles.th}>Applied Date</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map(activity => (
                <tr key={activity.id}>
                  <td style={styles.td}>{activity.id}</td>
                  <td style={styles.td}>{activity.fullName}</td>
                  <td style={styles.td}>{activity.fromDate}</td>
                  <td style={styles.td}>{activity.toDate}</td>
                  <td style={styles.td}>{activity.appliedDate}</td>
                  <td style={styles.td}>{activity.reason}</td>
                  <td style={styles.td}>{activity.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
