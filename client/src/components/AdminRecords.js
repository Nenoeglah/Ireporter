import React, { useEffect, useState } from 'react';

function AdminRecords() {
  const [recordId, setRecordId] = useState(0);
  const [newStatus, setNewStatus] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('/records')
      .then((response) => response.json())
      .then((data) => setRecords(data));
  }, []);

  const handleStatusChange = () => {
    if (!recordId || !newStatus) {
      console.error('Invalid recordId or newStatus');
      return;
    }

    
    fetch(`/admin/records/${recordId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }), 
    })
      .then((response) => {
        if (response.status === 200) {
          // Status updated successfully, update the local state.
          const updatedRecords = records.map((record) => {
            if (record.id === recordId) {
              return { ...record, status: newStatus };
            }
            return record;
          });
          setRecords(updatedRecords);
        } else {
          console.error('Status update failed:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  const renderRecords = () => {
    return records.map((record) => (
      <div key={record.id}>
        <span>ID: {record.id}</span>
        <span>Status: {record.status}</span>
        <select onChange={(e) => setNewStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="under investigation">Under Investigation</option>
          <option value="rejected">Rejected</option>
          <option value="resolved">Resolved</option>
        </select>
        <button onClick={() => setRecordId(record.id)}>Change Status</button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Admin Records</h1>
      {renderRecords()}
      <button onClick={handleStatusChange}>Update Status</button>
    </div>
  );
}

export default AdminRecords;
