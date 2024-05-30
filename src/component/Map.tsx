import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Popup, useMapEvents, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';

export default function Map() {
    const { location } = useParams();
    console.log(location);

    const position: [number, number] = [49.1846, -0.3722];
    const greenOptions = { color: 'green' }

    return (
        <MapContainer
            center={position}
            zoom={10}
            style={{ height: "100vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CircleMarker center={position} pathOptions={greenOptions} radius={20}>
                <Popup>Correct!</Popup>
            </CircleMarker>
            <LocationMarker />
        </MapContainer>
    );
}

function LocationMarker() {
    const [position, setPosition] = useState<LatLng>();

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position === null ? null : (
        <Popup position={position}>
            <div>
                You clicked at <br />
                Latitude: {position?.lat.toFixed(4)}, <br />
                Longitude: {position?.lng.toFixed(4)}
            </div>
        </Popup>
    );
}