import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

const locations = [
  "Nairobi",
  "Kisumu",
  "Mombasa",
  "Kitale",
  "Siaya",
  "Kisii",
  "Thika",
  "Moyale",
  "Garissa",
  "Bungoma",
];

export default function UserLanding({ user }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [location, setLocation] = useState({
    address: "",
    lat: "",
    lng: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [categoryBtn, setCategoryBtn] = useState("redflag");
  const [display, setDisplay] = useState("none");
  const [errors, setErrors] = useState([]);

  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  const options = {
    // componentRestrictions: { country: "ke" },
    fields: ["address_components", "geometry.location", "icon", "name"],
    // types: ["establishment"],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", function () {
      const place = autoCompleteRef.current.getPlace();
      setLocation({
        address: place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });
  }, []);

  const handleSubmitRedflag = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("location", selectedLocation);
    formData.append("latitude", location.lat);
    formData.append("longitude", location.lng);
    formData.append("image_file", imageFile);
    formData.append("video_file", videoFile);
    formData.append("description", description);
    formData.append("type", "Red Flag");
    formData.append("user_id", user.id);
    formData.append("status", "Under Investigation");

    fetch("/records", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to submit red-flag incident");
        }
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setErrors(["Failed to submit red-flag incident. Please try again."]);
      });
  };

  // Similar changes for handleSubmitIntervention function

  return (
    <>
      <Navbar />
      <Logo>Welcome, {user?.username}!</Logo>
      <div style={{ marginTop: 20 }}>
        <Form.Group controlId="locationDropdown">
          <Form.Label>Select Location</Form.Label>
          <Form.Control
            as="select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select a location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {/* ... Rest of your JSX */}
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
