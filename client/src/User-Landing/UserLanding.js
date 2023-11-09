import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import "../styles/LocationBar.css";
import Spinner from 'react-bootstrap/Spinner';
import Form from "react-bootstrap/Form";

const locations = [
  "Nairobi",
  "Kisumu",
  // ... other locations ...
  "Windhoek"
];

export default function UserLanding({ user }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [categoryBtn, setCategoryBtn] = useState("redflag");
  const [displayy, setDisplayy] = useState("none");
  const [errors, setErrors] = useState([]);

  const inputRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"], // restrict results to geographical locations
      componentRestrictions: { country: "KE" }, 
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
    });
  }, []); // empty dependency array ensures useEffect runs once after initial render

  function handleSubmitRedflag(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("address", address);
    formData.append("type", 'Red Flag');
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("location", location);
    formData.append("image_file", imageFile);
    formData.append("video_file", videoFile);
    formData.append("description", description);

    fetch("/records", {
      method: "POST",
      body: formData,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setDisplayy("none");
          setIsLoading(false);
          navigate('/profile');
        } else {
          setErrors(data.errors);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Similar changes can be made for handleSubmitIntervention function

  return (
    <>
    </>
  );
}

const Logo = styled.h1`
  /* ... your styles ... */
`;
