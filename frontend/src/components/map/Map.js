import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import '../../index.css';
import L from "leaflet";
import { LatLngBounds, LatLng } from 'leaflet';

const Map = ({properties}) => {

  const customIcon = (text) => L.divIcon({
    popupAnchor:  [-3, -33],
    html: `<div>${text}</div>`,
    iconAnchor: [31.5, 31],
    popupAnchor: [0, 57],
    direction: "center"
  });
  
  const bounds = new LatLngBounds(
    new LatLng(44.2934, 25.89),   // Southwest corner of the bounds
    new LatLng(44.577, 26.3127)     // Northeast corner of the bounds
  ); 

  const center = [44.4267, 26.1024]

  return (
    <MapContainer center={center} zoom={12} minZoom={10} maxBounds={bounds} maxBoundsViscosity={1} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties?.map((property)=>(
          property.coords !== null ?
          <Marker key={property.name} position={property.coords.split(',').map(Number)} icon={customIcon((property.currency === 1 ? 'EUR ' : 'LEI ')+property.price)}>
            <Popup direction="center">
              {property.name}
            </Popup>
          </Marker>
          : null
        ))
        }
    </MapContainer>
  )
}

export default Map