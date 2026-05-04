"use client";

import { useEffect, useRef } from "react";

export default function MapPreview({ latitude, longitude }) {
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    let isMounted = true;

    async function setupMap() {
      const L = await import("leaflet");

      if (!isMounted || !mapElementRef.current || mapRef.current) {
        return;
      }

      const position = [Number(latitude), Number(longitude)];
      const markerIcon = L.divIcon({
        className: "",
        html: '<span class="resikin-map-marker"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      const map = L.map(mapElementRef.current, {
        center: position,
        zoom: 14,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      L.marker(position, { icon: markerIcon }).addTo(map);
      mapRef.current = map;
    }

    setupMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude]);

  if (!latitude || !longitude) {
    return (
      <div className="grid h-32 place-items-center rounded-lg border border-gray-200 bg-gray-100 text-xs text-gray-400">
        Lokasi belum tersedia
      </div>
    );
  }

  return (
    <div className="pointer-events-none mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
      <div ref={mapElementRef} className="h-32 w-full" />
    </div>
  );
}
