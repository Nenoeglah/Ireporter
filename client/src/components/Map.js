import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styled from "styled-components";
//   import { Box } from “../styles”;
import MapStyles from "../styles/MapStyles";

function Map() {
  const [interventions, setInterventions] = useState([]);
  const [redFlags, setRedFlags] = useState([]);
  const [errors, setErrors] = useState([]);
  const [selectedRed, setSelectedRed] = useState(null);
  const [selectedInt, setSelectedInt] = useState(null);
  const [mapLocation, setMapLocation] = useState({
    latitude: -1.2921, 
    longitude: 36.8219,
  });
 const [newLocation, setNewLocation] = useState(null);
 const [updatedLocation, setUpdatedLocation] = useState(null);

//  functions to handle geolocation add or change
 const handleAddGeolocations = async () => {
  try {
    const response = await fetch('/geolocations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLocation),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Geolocation added successfully:", data);
      // Handle the response data as needed
    } else {
      const errorData = await response.json();
      console.error("Error adding geolocation:", errorData);
      // Handle the error data
    }
  } catch (error) {
    console.error("Error adding geolocation:", error);
  }
};
 
const handleChangeLocation = async () => {
  try {
    const response = await fetch('/change-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLocation),
    });

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error changing location:', error);
  }
};

// fetch red flags and interventions and update state
useEffect(() => {
    fetch("/interventions")
      .then((r) => r.json())
      .then((interventions) => setInterventions(interventions))
      .catch((err) => setErrors(err.errors));
  }, []);

  useEffect(() => {
    fetch("/redflags")
      .then((r) => r.json())
      .then((redFlags) => setRedFlags(redFlags))
      .catch((err) => setErrors(err.errors));
  }, []);

  // map over red flags and interventions to create Markers
  // const interventionMarkers = interventions.map((intervention) => ({
  //   id: intervention.id,
  //   position: {
  //     lat: intervention.latitude,
  //     lng: intervention.longitude,
  //   },
  //   icon: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  //   title: intervention.headline,
  //   onClick: () => {
  //     setSelectedInt(intervention);
  //     panTo(intervention.position);
  //   },
  // }));
  const interventionMarkers = interventions.map((intervention) => {
    const center = {
      lat: intervention.latitude,
      lng: intervention.longitude,
      address: intervention.address,
      headline: intervention.headline,
      status: intervention.status,
    };
    return center;
  });

  // const redFlagMarkers = redFlags.map((redFlag) => ({
  //   id: redFlag.id,
  //   position: {
  //     lat: redFlag.latitude,
  //     lng: redFlag.longitude,
  //   },
  //   icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  //   onClick: () => {
  //     setSelectedRed(redFlag);
  //     panTo(redFlag.position);
  //   },
  // }));
  const redFlagMarkers = redFlags.map((redFlag) => {
    const center = {
      lat: redFlag.latitude,
      lng: redFlag.longitude,
      address: redFlag.address,
      headline: redFlag.headline,
      status: redFlag.status,
    };
    return center;
    // console.log(redFlag);
  });
  console.log(redFlagMarkers);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries: ["places"],
  });
  const mapRef = useRef();
  // calculates once and reuses it every time it re-renders
  const center = useMemo(() => ({ lat: -1.289852, lng: 36.809275 }), []);
  // const location_a = useMemo(() => ({ lat: 0.0917, lng: 34.768 }), []);
  // const location_b = useMemo(() => ({ lat: 0.0352, lng: 36.3643 }), []);
  // const location_c = useMemo(() => ({ lat: -1.333731, lng: 36.927109 }), []);
  // const location_d = useMemo(() => ({ lat: 0.1545, lng: 37.3171 }), []);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat: mapLocation.latitude, lng: mapLocation.longitude });
      mapRef.current.setZoom(9);
    }
  }, [mapLocation]);
  
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(9);
  }, []);

  const options = useMemo(
    () => ({
      // mapId: "886d6323cb151ce5",
      disableDefaultUI: true,
      clickableIcons: true,
      styles: MapStyles,
      zoomControl: true,
    }),
    []
  );
  //   optimize re-rendering
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  if (loadError) return "Error loading maps";
  if (!isLoaded)
    return (
      <div>
        <Wrapper>
          <Logo>Loading...</Logo>
        </Wrapper>
      </div>
    );
    
  return (
    <div className="card w-100 p-3">
      <div className="card-body">
        <GoogleMap zoom={7} center={center} options={options} onLoad={onLoad}>
          <MapContainer>
            {interventionMarkers.map((int) => (
              <Marker
                key={int.id}
                position={int}
                icon="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                title="hbdbdh"
                onClick={() => {
                  setSelectedInt(int);
                  panTo(int);
                }}
              />
            ))}
            {redFlagMarkers.map((red) => (
              <Marker
                key={red.id}
                position={red}
                icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                onClick={() => {
                  setSelectedRed(red);
                  panTo(red);
                }}
              />
            ))}
            {selectedInt ? (
              <InfoWindow
                position={{ lat: selectedInt.lat, lng: selectedInt.lng }}
                onCloseClick={() => {
                  setSelectedInt(null);
                }}
              >
                <div>
                  <h6>{selectedInt.headline}</h6>
                  <p>Location: {selectedInt.address}</p>
                  <p>Status: {selectedInt.status}</p>
                </div>
              </InfoWindow>
            ) : null}
            {selectedRed ? (
              <InfoWindow
                position={{ lat: selectedRed.lat, lng: selectedRed.lng }}
                onCloseClick={() => {
                  setSelectedRed(null);
                }}
              >
                <div>
                  <h6>{selectedRed.headline}</h6>
                  <p>Location: {selectedRed.address}</p>
                  <p>Status: {selectedRed.status}</p>
                </div>
              </InfoWindow>
            ) : null}
            <div>
      <label>
      New Location:
        <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
      </label>
      <br />
      <button onClick={handleAddGeolocations}>Add Geolocation</button>
    </div>
          </MapContainer>
        </GoogleMap>
        </div>
        </div>
  );
}

const Wrapper = styled.section`
  max-width: 100%;
  margin: 40px auto;
  padding: 16px;
`;
const MapContainer = styled.section`
  // width: 100%;
  height: 80vh;
`;
const Logo = styled.h1`
  // font-family: “Permanent Marker”, serif;
  // font-size: 2rem;
  // color: white;
  // margin: 0;
  // line-height: 0;
  // a {
  //   color: inherit;
  //   text-decoration: none;
  // }
`;
const Box = styled.div`
  // border-radius: 12px;
  // box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%),
  //   0 0 0 1px rgb(10 10 10 / 2%);
  // padding: 16px;
`;
export default Map;
