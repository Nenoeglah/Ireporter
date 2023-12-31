import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import "../styles/LocationBar.css";
import Spinner from 'react-bootstrap/Spinner';
import Form from "react-bootstrap/Form";



export default function UserLanding({ user }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  let [address, setAddress] = useState("");
  let [latitude, setLatitude] = useState("");
  let [longitude, setLongitude] = useState("");
  const [image_file, setImage_file] = useState("");
  const [video_file, setVideo_file] = useState("");
  const [description, setDescription] = useState("");
  // redflag
  const [categoryBtn, setCategoryBtn] = useState("redflag");
  const [displayy, setDisplayy] = useState("none");
  //errors
  const [errors, setErrors] = useState([]);

  // ************* Map Location Functionality *************
  const autoCompleteRef = useRef();
  const inputRef = useRef(null);

  const options = {
    // componentRestrictions: { country: "ke" },
    fields: ["address_components", "geometry.location", "icon", "name"],
    // types: ["establishment"],
  };
  // useEffect(() => {
  //   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
  //     inputRef.current,
  //     options
  //   );

  //   autoCompleteRef.current.addListener("place_changed", function () {
  //     const location = autoCompleteRef.current.getPlace();
  //     setLocation({
  //       address: location.name,
  //       lat: location.geometry.location.lat(),
  //       lng: location.geometry.location.lng(),
  //     });
  //   });
  // }, []);


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

  address = location.address;
  // console.log(address);
  latitude = location.lat;
  // console.log(latitude);
  longitude = location.lng;
  // console.log(longitude);

  // ************* Map Location Functionality *************

  function handleSubmitRedflag(e) {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData()
    formData.append("category", category)
    formData.append("address", address)
    formData.append("type", 'Red Flag')
    formData.append("latitude", latitude)
    formData.append("longitude", longitude)
    formData.append("location", location)
    formData.append("image_file", e.target.image_file.files[0])
    formData.append("video_file", e.target.video_file.files[0])
    formData.append("description", description)
    //formData.append("user_id", user.id)
    //formData.append("status", "Under Investigation")

    console.log(formData);

    // // const data = new FormData()
    // // data.append("image_file", image_file)
    // // data.append("location", location)
    // // data.append("video", video)
    // // data.append("description", description)
    // // data.append("user_id", 1)

    // console.log(formData);

    fetch("/records", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => console.log(data));
        setDisplayy("none");
        setIsLoading(false)
        navigate('/profile')
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleSubmitIntervention(e) {
    e.preventDefault();
    const formData = new FormData()
    formData.append("category", category)
    formData.append("address", address)
    formData.append("type", 'Intervention')
    formData.append("latitude", latitude)
    formData.append("longitude", longitude)
    formData.append("location", location)
    formData.append("address", address)
    formData.append("image_file", e.target.image_file.files[0])
    formData.append("video_file", e.target.video_file.files[0])
    formData.append("description", description)
    //formData.append("status", "Under Investigation")
    console.log(formData);

    fetch("/records", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => console.log(data));
        navigate('/profile')
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    setDisplayy("none");
  }

  return (
    <>
      <Navbar />
      <Logo>Welcome, {user.username}!</Logo>
      <div style={{ marginTop: 20 }}>
        <div class="row justify-content-center">
          <div class="col-sm-5 mb-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">What is a Red-Flag Incident?</h5>
                <img
                  class="card-img-top"
                  src="https://2456764.fs1.hubspotusercontent-na1.net/hub/2456764/hubfs/2102%20Blogs/red-flags-1200-627.jpg?width=680&name=red-flags-1200-627.jpg"
                  alt="Redflag"
                />
                <h5>
                  A red-flag is an incident linked to corruption and/or
                  corruption-related activities.
                </h5>
                <div class="text-center">
                  <button
                    class="btn btn-danger mt-3"
                    onClick={() => {
                      setCategoryBtn("redflag");
                      setDisplayy("block");
                      window.location.href = "#form";
                    }}
                  >
                    Report A Red-Flag Incident
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-5 mb-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">What is an Intervention Incident?</h5>
                <img
                  class="card-img-top"
                  src="https://thumbs.dreamstime.com/b/intervention-grungy-wooden-category-maple-d-rendered-royalty-free-stock-image_file-can-be-used-online-website-86488320.jpg"
                  alt="Redflag"
                />
                <h5>
                  An intervention is a call for a government agency to intervene
                  e.g repairing bad roads.
                </h5>
                <div class="text-center">
                  <button
                    class="btn btn-danger mt-4"
                    onClick={() => {
                      setCategoryBtn("intervention");
                      setDisplayy("block");
                      window.location.href = "#form";
                    }}
                  >
                    Report An Intervention Incident
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: displayy }}>
        <div class="d-flex justify-content-center">
          <div class="col-sm-10 ">
            <div class="shadow p-3 mb-5 bg-white rounded">
              <form
                id="form"
                onSubmit={(e) =>
                  categoryBtn === "redflag"
                    ? handleSubmitRedflag(e)
                    : handleSubmitIntervention(e)
                }
              >
                <div class=" text-center">
                  <h2>
                    {categoryBtn === "redflag"
                      ? "Post a Red-Flag Incident"
                      : "Post an Intervention Incident"}
                  </h2>
                </div>
                <div>
                  <label htmlFor="Location" className="form-label">
                    Headline
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Describe in a few words the incident"
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor="Location" className="form-label">
                    Location
                  </label>

                  <div style={{ marginTop: 20 }}>

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

        {/* <Form.Group controlId="locationDropdown">
          <Form.Label>Select Location</Form.Label>
          <Form.Control
            as="select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select a location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </Form.Control>
        </Form.Group> */}
      </div>
                  {/* <input
                    ref={inputRef}
                    type="text"
                    className="form-control"
                    // value={location.address}
                    placeholder="Add Location"
                  /> */}
                  {/* {location && (
                    <div
                      style={{
                        marginTop: 20,
                        lineHeight: "25px",
                        color: "teal",
                      }}
                    >
                      <div style={{ marginBottom: 10 }}>
                        <b>Selected Location:</b>
                      </div>
                      <div>
                        <b>Address:</b> {location.address}
                      </div>
                      <div>
                        <b>Latitude:</b> {location.lat.toFixed(6)}
                      </div>
                      <div style={{ marginBottom: 20 }}>
                        <b>Longitude:</b> {location.lng.toFixed(6)}
                      </div>
                    </div>
                  )} */}
                </div>
                {/* {location && (
                  <>
                    <div>
                      <label htmlFor="Latitude" className="form-label">
                        Address
                      </label>
                      <input
                        type="float"
                        className="form-control"
                        placeholder="Location"
                        defaultValue={address}
                        // onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="Latitude" className="form-label">
                        Latitude
                      </label>
                      <input
                        type="float"
                        className="form-control"
                        placeholder="Latitude Coordinate"
                        defaultValue={latitude}
                        // onChange={(e) => setLatitude(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="Longitude" className="form-label">
                        Longitude
                      </label>
                      <input
                        type="float"
                        className="form-control"
                        placeholder="Longitude Coordinate"
                        defaultValue={longitude}
                        // onChange={(e) => setLongitude(e.target.value)}
                      />
                    </div>
                  </>
                )} */}

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
