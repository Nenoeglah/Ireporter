import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UserIntervention({ id, category, location, status, filteredInterventions, setInterventions }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false)
  const [userIntervention, setUserIntervention] = useState({
    id: 0,
    category: "",
    location: "",
    image: "",
    video: "",
    description: "",
    status: "",
    user: {
      id: 0,
      name: "",
      email: "",
      phone_number: "",
      is_admin: false
    }
  })

  const token = localStorage.getItem('token');


  const handleDeleteUserIntervention = () => {
    fetch(`/records/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setInterventions(filteredInterventions.filter((specificUserIntervention) => specificUserIntervention.id !== id))
    })
  }

  // useEffect(() => {
  //   fetch('interventions')
  // },[])

  // useEffect(() => {
  //   fetch(`/records/${id}`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setUserIntervention(data)
  //     })
  // },[])

  const [updateInterventionData, setUpdateInterventionData] = useState({
    category: userIntervention.category,
    location: userIntervention.address,
    description: userIntervention.description
  })

  const fetchUserInterventionData = () => {
    handleShow()
    setUpdateInterventionData({
    category: userIntervention.category,
    location: userIntervention.address,
    description: userIntervention.description
  })}


  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setUpdateInterventionData({[name]: value})
  }

  // useEffect(() => {
  //   fetch('interventions')
  // },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)
    fetch(`/records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateInterventionData)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          const updatedUserInterventions = filteredInterventions?.map((updatedUserIntervention) => {
            if (updatedUserIntervention.id === data.id) {
              return data
            } else {
              return updatedUserIntervention
            }
          })
          handleClose()
          setInterventions(updatedUserInterventions)
          setIsSaving(false)
        })
      } else {
        setIsSaving(false)
        r.json().then(err => setErrors(err.errors))
      }
    })
  }

  return (
    <>
    <tr>
        <td>{category}</td>
        <td>{location}</td>
        <td>{status}</td>
        <td><div style={{ display: "flex"}}><Link style={{flexGrow: "0.25"}} onClick={fetchUserInterventionData}><Button variant="info">Edit</Button></Link><Button variant="danger" onClick={handleDeleteUserIntervention}>Delete</Button></div></td>
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
                  placeholder="Intervention Location"
                  autoFocus
                  name="category"
                  value={updateInterventionData.category}
                  onChange={handleChange}
                />
              </Form.Group> 
              <Form.Group className='mb-3'>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Intervention Location"
                  autoFocus
                  name="location"
                  value={updateInterventionData.location}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Intervention description"
                name="description"
                value={updateInterventionData.description}
                onChange={handleChange}
                />
              </Form.Group>
              <div>
              {errors.map((err) => {
                <p key={err} style={{ color: "red"}}>{err}</p>
              })}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" 
            onClick={handleSubmit}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
    </tr>
    </>
  )
}

export default UserIntervention