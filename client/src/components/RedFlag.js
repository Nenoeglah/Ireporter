import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";

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

  const handleDeleteRedFlag = () => {
    fetch(`/admin/records/${id}`,{
        method: 'DELETE',
    }) 
    .then(() => {
      setRedFlags(redFlags => redFlags.filter((redFlag) => redFlag.id !== id))  
    })
} 
  // ############################ Email Notification Implementiation ######################################################

  const sendEmail = () => {
    const templateParams = {
      name: `/redflags/${id}.name`,
      email: `/redflags/${id}.email`,
      message: "Your red-flag record status has been updated!",
    };

    // dummy params => emailjs restricts to 200 free emails a month
    emailjs.send("gmail", "feedback", templateParams, "gydg76y3g7u3ygf").then(
      (response) => {
        console.log(
          "SUCCESS! Email has been sent to you!",
          response.status,
          response.text
        );
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  };

  // ############################ Email Notification Implementiation ######################################################

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
          console.log(status);
          setRecordStatus(eventKey);
        });
      } else {
        setIsUpdating(false);
        r.json().then(console.log("Error in updating the status"));
      }
    });
    // sendEmail();
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
            <Link style={{ flexGrow: "0.25" }} to={`/redflags/${id}`}>
              <Button variant="info">View</Button>
            </Link>
            <Button onClick={handleDeleteRedFlag} variant="danger">
              Delete
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default RedFlag;