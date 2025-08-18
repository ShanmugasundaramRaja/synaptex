import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

const position = [49.386761, 8.645367];

const GreyMap = () => {
  const redIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{
        height: "200px",
        width: "100%",
        borderRadius: "8px",
      }}
      attributionControl={false} // This is okay
      scrollWheelZoom={false}
      zoomControl={false} // Make sure this is either set or default
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <Marker position={position} icon={redIcon}>
        <Popup>
          Richard-Kuhn-Straße 5<br />
          Heidelberg, Germany
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default GreyMap;
