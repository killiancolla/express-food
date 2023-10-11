import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from 'react';

export default function Maps({ destination }) {

  const [error, setError] = useState(null);
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Géolocalisation non disponible');
    }
  }, []);


  const markers = [
    {
      geocode: [48.8486096, 2.3856721],
      popUp: "ExpressFood"
    },
    {
      geocode: [destination.latitude, destination.longitude],
      popUp: "Client"
    },
    {
      geocode: [position.latitude ?? 0, position.longitude ?? 0],
      popUp: "Livreur"
    }

  ];

  const customIcon = new Icon({
    iconUrl: "marker-end.png",
    iconSize: [38, 38]
  });

  const customStartIcon = new Icon({
    iconUrl: "marker-start.png",
    iconSize: [38, 38]
  });

  const customBikeIcon = new Icon({
    iconUrl: "marker-bike.png",
    iconSize: [38, 38]
  });

  const centerLatitude = (markers[0].geocode[0] + markers[1].geocode[0]) / 2;
  const centerLongitude = (markers[0].geocode[1] + markers[1].geocode[1]) / 2;
  const centerMap = [centerLatitude, centerLongitude];

  const createClusterCustomIcon = (cluster) => {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };

  return (
    <MapContainer center={centerMap} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
        {markers.map((marker) => (
          <Marker key={marker.geocode} position={marker.geocode} icon={marker.popUp === "ExpressFood" ? customStartIcon : marker.popUp === "Client" ? customIcon : customBikeIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
