"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { twMerge } from "tailwind-merge";
import { PiMapPinSimpleFill } from "react-icons/pi";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { useState } from "react";
const Map = (props: {
  position: [number, number];
  onChangePosition: (position: [number, number]) => void;
  zoom: number;
  className?: string;
}) => {
  const { position, zoom, className, onChangePosition } = props;
  const [hasMoved, setHasMoved] = useState(false);

  const pinIcon = divIcon({
    html: renderToStaticMarkup(
      <PiMapPinSimpleFill className="text-pink-600" size={28} />,
    ),
    className: "custom-map-pin",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });

  return (
    <div className={`relative ${className ?? ""}`}>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <ModernZoomControls />
        <CenterSync
          onCenterChange={(nextPosition) => {
            if (!hasMoved) setHasMoved(true);
            onChangePosition(nextPosition);
          }}
        />
        <Marker
          position={position}
          icon={pinIcon}
          eventHandlers={{
            drag: (event) => {
              const { lat, lng } = event.target.getLatLng();
              if (!hasMoved) setHasMoved(true);
              onChangePosition([lat, lng]);
            },
          }}
        >
          {!hasMoved && (
            <Tooltip
              permanent
              direction="center"
              offset={[0, -52]}
              opacity={1}
              className="modern-tooltip"
            >
              We will deliver here
            </Tooltip>
          )}
        </Marker>
      </MapContainer>
    </div>
  );
};

function CenterSync({
  onCenterChange,
}: {
  onCenterChange: (position: [number, number]) => void;
}) {
  useMapEvents({
    move: (event) => {
      const center = event.target.getCenter();
      onCenterChange([center.lat, center.lng]);
    },
  });

  return null;
}

function ModernZoomControls() {
  const map = useMap();

  return (
    <div className="pointer-events-auto absolute right-3 bottom-3 z-[400] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
        className="grid h-9 w-9 place-items-center text-neutral-700 transition hover:bg-neutral-50 active:bg-neutral-100"
      >
        <span className="text-lg leading-none font-semibold">+</span>
      </button>
      <div className="h-px w-full bg-neutral-200" />
      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
        className="grid h-9 w-9 place-items-center text-neutral-700 transition hover:bg-neutral-50 active:bg-neutral-100"
      >
        <span className="text-lg leading-none font-semibold">−</span>
      </button>
    </div>
  );
}

export default Map;
