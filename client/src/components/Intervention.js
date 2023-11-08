import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

function Intervention({
  id,
  name,
  location,
  category,
  interventions,
  setInterventions,
  status,
}) {
  const [recordStatus, setRecordStatus] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [interventionDetails, setInterventionDetails] = useState(null);

  useEffect(() => {
    
    fetch(`/admin/records/${id}`) 
      .then((response) => response.json())
      .then((data) => setInterventionDetails(data))
      .catch((error) => console.error("Error fetching intervention details:", error));
  }, []);

  const handleDeleteIntervention = () => {
    fetch(`/admin/records/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setInterventions((interventions) =>
          interventions.filter((intervention) => intervention.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting intervention:", error));
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
            <Button onClick={() => setInterventionDetails(!interventionDetails)}>
              {interventionDetails ? "Hide Details" : "View"}
            </Button>
            <Button onClick={handleDeleteIntervention} variant="danger">
              Delete
            </Button>
          </div>
        </td>
      </tr>

      {interventionDetails && (
        <tr>
          <td colSpan="5">
            <div style={{ display: "flex", justifyContent: "flex-end", width: "115%"}}>
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

export default Intervention;