import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

function RedFlag({
  id,
  name,
  location,
  category,
  redFlags,
  setRedFlags,
  status,
}) {
  const [recordStatus, setRecordStatus] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [redFlagDetails, setRedFlagDetails] = useState(false);
  const [recordCategory, setRecordCategory] = useState(""); 
  const [recordName, setRecordName] = useState(""); 
  const [recordLocation, setRecordLocation] = useState(""); 
  useEffect(() => {
    
    fetch(`/admin/records/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRedFlagDetails(data);
        setRecordCategory(data.category); 
        setRecordName(data.name); 
        setRecordLocation(data.location); 
      })
      .catch((error) => console.error("Error fetching red flag details:", error));
  }, []);

  const handleDeleteRedFlag = () => {
    fetch(`/admin/records/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setRedFlags((redFlags) => redFlags.filter((redFlag) => redFlag.id !== id));
      })
      .catch((error) => console.error("Error deleting red flag:", error));
  };

  const handleSelect = (eventKey) => {
    setIsUpdating(true);
    fetch(`/admin/records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: eventKey,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          setIsUpdating(false);
          setRecordStatus(eventKey);
        });
      } else {
        setIsUpdating(false);
        console.log("Error in updating the status");
      }
    });
  };

  return (
    <>
      <tr>
        <td>{category}</td>
        <td>{name}</td>
        <td>{location}</td>
        <td>{status}</td>
        <td>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {isUpdating ? "Updating the status..." : recordStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Under Investigation">
                Under Investigation
              </Dropdown.Item>
              <Dropdown.Item eventKey="Rejected">Rejected</Dropdown.Item>
              <Dropdown.Item eventKey="Resolved">Resolved</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
        <td>
          <div style={{ display: "flex" }}>
            <Button onClick={() => setRedFlagDetails(!redFlagDetails)}>
              {redFlagDetails ? "Hide Details" : "View"}
            </Button>
            <Button onClick={handleDeleteRedFlag} variant="danger">
              Delete
            </Button>
          </div>
        </td>
      </tr>
      {redFlagDetails && (
  <tr>
    <td colSpan="5">
      <div style={{ display: "flex", justifyContent: "flex-end", width: "115%" }}>
        <div style={{ textAlign: "right" }}>
          <p>Category: {category}</p>
          <p>Name: {name}</p>
          <p>Location: {location}</p>
          <p>Status: {recordStatus}</p>
        </div>
      </div>
    </td>
  </tr>
)}
</>
  );
}
            

export default RedFlag;