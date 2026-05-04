"use client";

import { useEffect, useRef } from "react";

const DEFAULT_CENTER = [-6.2088, 106.8456];

export default function MapPicker({ latitude, longitude, onChange }) {
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let isMounted = true;

    async function setupMap() {
      const L = await import("leaflet");

      if (!isMounted || !mapElementRef.current || mapRef.current) {
        return;
      }

      const markerIcon = L.divIcon({
        className: "",
        html: '<span class="resikin-map-marker"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      const map = L.map(mapElementRef.current, {
        center: DEFAULT_CENTER,
        zoom: 13,
        scrollWheelZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      map.on("click", (event) => {
        const nextPosition = event.latlng;

        if (!markerRef.current) {
          markerRef.current = L.marker(nextPosition, { icon: markerIcon }).addTo(map);
        } else {
          markerRef.current.setLatLng(nextPosition);
        }

        onChangeRef.current({
          latitude: String(nextPosition.lat),
          longitude: String(nextPosition.lng),
        });
      });

      mapRef.current = map;
    }

    setupMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    async function updateMarker() {
      if (!mapRef.current || !latitude || !longitude) {
        return;
      }

      const L = await import("leaflet");
      const position = [Number(latitude), Number(longitude)];
      const markerIcon = L.divIcon({
        className: "",
        html: '<span class="resikin-map-marker"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      if (!markerRef.current) {
        markerRef.current = L.marker(position, { icon: markerIcon }).addTo(mapRef.current);
      } else {
        markerRef.current.setLatLng(position);
      }

      mapRef.current.setView(position, mapRef.current.getZoom());
    }

    updateMarker();
  }, [latitude, longitude]);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
      <div ref={mapElementRef} className="h-64 w-full sm:h-72" />
      <div className="border-t border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-500 sm:text-xs">
        Klik pada map untuk memilih titik laporan.
      </div>
    </div>
  );
}
