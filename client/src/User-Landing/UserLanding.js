import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import "../styles/LocationBar.css";
import Spinner from 'react-bootstrap/Spinner';
import Form from "react-bootstrap/Form";

export default function UserLanding({ user }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState("none");
  const [errors, setErrors] = useState([]);

  const autoCompleteRef = useRef();

  const options = {
    fields: ["address_components", "geometry.location", "icon", "name"],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      document.getElementById("location-input"),
      options
    );

    autoCompleteRef.current.addListener("place_changed", function () {
      const location = autoCompleteRef.current.getPlace();
      setAddress(location.name);
      setLatitude(location.geometry.location.lat());
      setLongitude(location.geometry.location.lng());
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("address", address);
    formData.append("type", 'Red Flag'); // or 'Intervention'
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("image_file", imageFile);
    formData.append("video_file", videoFile);
    formData.append("description", description);

    fetch("/records", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        navigate('/profile');
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setErrors(["Error occurred while submitting the form. Please try again."]);
      });
  }

  return (
    <>
      <Navbar />
      <Logo>Welcome, {user.username}!</Logo>
      {/* ... (other components and elements) */}
      <div style={{ display: display }}>
        <div className="d-flex justify-content-center">
          <div className="col-sm-10">
            <div className="shadow p-3 mb-5 bg-white rounded">
              <form onSubmit={handleSubmit}>
                {/* ... (other form fields) */}
                <div>
                  <label htmlFor="Location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location-input"
                    placeholder="Type your location"
                  />
                </div>
                {/* ... (other form fields) */}
                <div className="text-center">
                  {isLoading ? (
                    <Spinner animation="grow" variant="danger" />
                  ) : (
                    <input
                      className="btn btn-danger mt-3"
                      type="submit"
                      value="Submit"
                    />
                  )}
                </div>
                <div>
                  {errors.map((err, index) => (
                    <p key={index} style={{ color: "red" }}>
                      {err}
                    </p>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Logo = styled.h1`
  font-family: "Permanent Marker", serif;
  font-size: 2.5rem;
  color: teal;
  margin: 20px 0;
  padding-top: 80px;
  padding-left: 40px;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;


