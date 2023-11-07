import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UserIntervention({ id, headline, location, status, filteredInterventions, setInterventions }) {
  const [show, setShow] = useState(false);
  const [geolocation, setGeolocation] = useState({ latitude: '', longitude: '' });
  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [userIntervention, setUserIntervention] = useState({
    id: 0,
    headline: '',
    location: '',
    image: '',
    video: '',
    description: '',
    status: '',
    user: {
      id: 0,
      name: '',
      email: '',
      phone_number: '',
      is_admin: false,
    },
  });

  const handleGeolocationError = (error) => {
    console.error(error);
  };

  const handleGeolocationChange = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setGeolocation({ latitude, longitude });
  };

  const handleDeleteUserIntervention = () => {
    fetch(`/interventions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setInterventions(filteredInterventions.filter((specificUserIntervention) => specificUserIntervention.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUserInterventionData = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors([]);
    setUserIntervention((prevIntervention) => ({
      ...prevIntervention,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    fetch(`/interventions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userIntervention),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const updatedUserInterventions = filteredInterventions.map((updatedUserIntervention) =>
          updatedUserIntervention.id === data.id ? data : updatedUserIntervention
        );
        setInterventions(updatedUserInterventions);
        handleClose();
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsSaving(false);
        setErrors(['Failed to update intervention. Please try again.']);
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeolocationChange, handleGeolocationError);
  }, []);

  return (
    <>
      <tr>
        <td>{headline}</td>
        <td>{location}</td>
        <td>{status}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <Link style={{ flexGrow: '0.25' }} onClick={fetchUserInterventionData}>
              <Button variant="info">Edit</Button>
            </Link>
            <Button variant="danger" onClick={handleDeleteUserIntervention}>
              Delete
            </Button>
          </div>
        </td>
      </tr>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your intervention report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Intervention Heading"
                name="headline"
                value={userIntervention.headline}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Intervention Location"
                name="location"
                value={userIntervention.location}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Intervention Description"
                name="description"
                value={userIntervention.description}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.length > 0 && (
              <div>
                {errors.map((err, index) => (
                  <p key={index} style={{ color: 'red' }}>
                    {err}
                  </p>
                ))}
              </div>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserIntervention;
