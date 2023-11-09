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
  // Add more Kenyan cities if needed
];

export default function UserLanding({ user }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image_file, setImage_file] = useState("");
  const [video_file, setVideo_file] = useState("");
  const [description, setDescription] = useState("");
  const [categoryBtn, setCategoryBtn] = useState("redflag");
  const [displayy, setDisplayy] = useState("none");
  const [errors, setErrors] = useState([]);

  const autoCompleteRef = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "KE" }, // Country code for Kenya
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
    });
  }, []);

  function handleSubmitRedflag(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("address", address);
    formData.append("type", 'Red Flag');
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("image_file", e.target.image_file.files[0]);
    formData.append("video_file", e.target.video_file.files[0]);
    formData.append("description", description);

    // Make API call here with formData
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
      console.error("Error:", error);
      setIsLoading(false);
      // Handle errors here
    });
  }

  function handleSubmitIntervention(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("category", category);
    formData.append("address", address);
    formData.append("type", 'Intervention');
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("image_file", e.target.image_file.files[0]);
    formData.append("video_file", e.target.video_file.files[0]);
    formData.append("description", description);

    // Make API call here with formData
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
      console.error("Error:", error);
      setIsLoading(false);
      // Handle errors here
    });
  }

  return (
    <>
      <Navbar />
      {/* ... */}
      <div style={{ display: displayy }}>
        <div className="d-flex justify-content-center">
          <div className="col-sm-10 ">
            <div className="shadow p-3 mb-5 bg-white rounded">
              <form
                id="form"
                onSubmit={(e) =>
                  categoryBtn === "redflag"
                    ? handleSubmitRedflag(e)
                    : handleSubmitIntervention(e)
                }
              >
                {/* ... */}
                <div>
                  <label htmlFor="Location" className="form-label">
                    Location
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    placeholder="Enter Location"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                {/* ... */}
                <div>
                  <label htmlFor="Image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image_file"
                    className="form-control"
                    id="image_file"
                    accept="image_file/*"
                    placeholder="Upload Image"
                  />
                </div>

                <div>
                  <label htmlFor="Video" className="form-label">
                    Video
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="video_file/*"
                    name="video_file"
                    id ="video_file"
                    placeholder ="Upload Video"
                  />
                </div>
                <div>
                  <label htmlFor="Description" className="form-label">
                    Incident Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={description}
                    placeholder="Add Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div class="text-center">
                  {isLoading ? (<Spinner animation="grow" variant="danger" />) : (
                    <input
                      class="btn btn-danger mt-3"
                      type={"submit"}
                      value={
                        categoryBtn === "redflag"
                          ? "Submit Red-Flag Incident"
                          : "Submit Intervention Incident "
                      }
                    />
                  )}
                </div>
                <div>
                  {/* {errors.map((err) => (
                    <p key={err} style={{ color: "red" }}>
                      {err}
                    </p>
                  ))} */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
