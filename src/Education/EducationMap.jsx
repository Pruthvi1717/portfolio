import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const EducationMap = ({ location }) => {
  return (
    <MapContainer
      center={location}
      zoom={6}
      scrollWheelZoom={false}
      zoomControl={true}   // ✅ ENABLE + -
      className="edu-map"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <Marker position={location}>
        <Popup>Education Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default EducationMap;