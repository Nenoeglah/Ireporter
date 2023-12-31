import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UserRedFlag({ id, category, location, status, filteredRedFlags, setRedFlags }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState([]);
  const [isSaving, setIsSaving] = useState(false)
  const [userRedFlag, setUserRedFlag] = useState({
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

  // useEffect(() => {
  //   fetch('redflags')
  // },[])

  useEffect(() => {
    fetch(`/records/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setUserRedFlag(data)
      })
  },[])

  const [updateRedFlagData, setUpdateRedFlagData] = useState({
    category: userRedFlag.category,
    location: userRedFlag.location,
    description: userRedFlag.description
  })

  const fetchUserRedFlagData = () => {
    handleShow()
    setUpdateRedFlagData({
    category: userRedFlag.category,
    location: userRedFlag.location,
    description: userRedFlag.description
  })}


  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setUpdateRedFlagData({[name]: value})
  }

  // useEffect(() => {
  //   fetch('redflags')
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
      body: JSON.stringify(updateRedFlagData)
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          const updatedUserRedFlags = filteredRedFlags?.map((updatedUserRedFlag) => {
            if (updatedUserRedFlag.id === data.id) {
              return data
            } else {
              return updatedUserRedFlag
            }
          })
          handleClose()
          setRedFlags(updatedUserRedFlags)
          setIsSaving(false)
        })
      } else {
        setIsSaving(false)
        r.json().then(err => setErrors(err.errors))
      }
    })
  }
  
  const handleDeleteUserRedFlag = () => {
      fetch(`/records/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      })
      .then(() => {
        setRedFlags(filteredRedFlags.filter((specificUserRedFlag) => specificUserRedFlag.id !== id))
      })
    }
    
  return (
    <>
    <tr>
        <td>{category}</td>
        <td>{location}</td>
        <td>{status}</td>
        <td><div style={{ display: "flex"}}><Link style={{flexGrow: "0.25"}} onClick={fetchUserRedFlagData}><Button variant="info">Edit</Button></Link><Button variant="danger" onClick={handleDeleteUserRedFlag}>Delete</Button></div></td>
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
              <Form.Group
                className="mb-3"
              >
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

export default UserRedFlag