"use client";

import { useEffect, useRef } from "react";

export default function ReportsMapOverview({ reports }) {
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const points = reports.filter((report) => report.latitude && report.longitude);

    if (points.length === 0) {
      return;
    }

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

      const firstPoint = [Number(points[0].latitude), Number(points[0].longitude)];
      const map = L.map(mapElementRef.current, {
        center: firstPoint,
        zoom: 12,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      const bounds = [];
      points.forEach((report) => {
        const position = [Number(report.latitude), Number(report.longitude)];
        bounds.push(position);
        L.marker(position, { icon: markerIcon })
          .addTo(map)
          .bindPopup(report.location_text || "Lokasi laporan");
      });

      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [24, 24] });
      }

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
  }, [reports]);

  if (!reports.some((report) => report.latitude && report.longitude)) {
    return (
      <div className="grid min-h-64 place-items-center rounded-lg border border-gray-200 bg-gray-100 text-xs text-gray-500 sm:text-sm">
        Belum ada koordinat laporan
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
      <div ref={mapElementRef} className="h-64 w-full" />
    </div>
  );
}
