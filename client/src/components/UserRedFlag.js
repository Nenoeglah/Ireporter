import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UserRedFlag({ id, category, location, status, filteredRedFlags, setRedFlags }) {
  const [show, setShow] = useState(false);
  const [geolocation, setGeolocation] = useState({ latitude: '', longitude: '' });
  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [updateRedFlagData, setUpdateRedFlagData] = useState({
    category: '',
    location: '',
    description: '',
    latitude: '',
    longitude: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setUpdateRedFlagData({
      category: category,
      location: location,
      description: '',
      latitude: '',
      longitude: ''
    });
    setShow(true);
  };

  const handleGeolocationChange = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setGeolocation({ latitude, longitude });
  };

  const handleGeolocationError = (error) => {
    console.error(error);
  };

  const fetchUserRedFlagData = () => {
    navigator.geolocation.getCurrentPosition(
      handleGeolocationChange,
      handleGeolocationError
    );

    handleShow();
  };

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

    // Include geolocation data in the updateRedFlagData object if available
    if (geolocation.latitude && geolocation.longitude) {
      setUpdateRedFlagData(prevState => ({
        ...prevState,
        latitude: geolocation.latitude,
        longitude: geolocation.longitude
      }));
    }

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
            description: updateRedFlagData.description,
            latitude: updateRedFlagData.latitude,
            longitude: updateRedFlagData.longitude
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
      setRedFlags(filteredRedFlags.filter((specificUserRedFlag) => specificUserRedFlag.id !== id))
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
            <Link style={{ flexGrow: "0.25" }} onClick={fetchUserRedFlagData}>
              <Button variant="info">Edit</Button>
            </Link>
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
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Red Flag Location"
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
                autoFocus
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserRedFlag;
