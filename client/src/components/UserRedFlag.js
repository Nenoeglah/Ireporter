import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Modal } from 'react-bootstrap';

function UserRedFlag({ id, category, location, status, filteredRedFlags, setRedFlags }) {
  const [show, setShow] = useState(false);
  const [updateRedFlagData, setUpdateRedFlagData] = useState({
    category: category,
    location: location,
    description: ''
  });
  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateRedFlagData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Perform the API PATCH request to update the red flag data
    fetch(`/redflags/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateRedFlagData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update red flag data");
      }
    })
    .then(data => {
      // Handle successful response data and update UI as needed
      const updatedUserRedFlags = filteredRedFlags.map((updatedUserRedFlag) => {
        if (updatedUserRedFlag.id === id) {
          return {
            ...updatedUserRedFlag,
            category: updateRedFlagData.category,
            location: updateRedFlagData.location,
            description: updateRedFlagData.description
          };
        } else {
          return updatedUserRedFlag;
        }
      });

      handleClose();
      setRedFlags(updatedUserRedFlags);
      setIsSaving(false);
    })
    .catch(error => {
      // Handle errors from the API request
      console.error(error);
      setIsSaving(false);
      // Update errors state to display error messages to the user if necessary
      setErrors(["Failed to update red flag data. Please try again."]);
    });
  };

  const handleDeleteUserRedFlag = () => {
    fetch(`/records/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setRedFlags(filteredRedFlags.filter((specificUserRedFlag) => specificUserRedFlag.id !== id));
      handleClose();
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <>
      <tr>
        <td>{category}</td>
        <td>{location}</td>
        <td>{status}</td>
        <td>
          <div style={{ display: "flex"}}>
            <Button variant="info" onClick={handleShow}>Edit</Button>
            <Button variant="danger" onClick={handleDeleteUserRedFlag}>Delete</Button>
          </div>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your red flag report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Red Flag Category"
                autoFocus
                name="category"
                value={updateRedFlagData.category}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Red Flag Location"
                name="location"
                value={updateRedFlagData.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Red Flag description"
                name="description"
                value={updateRedFlagData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <div>
              {errors.map((err, index) => (
                <p key={index} style={{ color: "red" }}>{err}</p>
              ))}
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserRedFlag;
