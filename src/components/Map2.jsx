// MiniMap2.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useContext } from "react";
import { AssetContext } from "./AssetContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MiniMap2 = () => {
  const { registerAsset, assetLoaded } = useContext(AssetContext);
  const markerPosition = [49.40844, 8.68417];
  const position = [49.40844, 8.68917];

  useEffect(() => {
    registerAsset();
    assetLoaded();
  }, [registerAsset, assetLoaded]);

  return (
    <div style={{ maxWidth: "250px", height: "200px" }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <Marker position={markerPosition}>
          <Popup>Am Lerchenbuckel 5, Heidelberg</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MiniMap2;
