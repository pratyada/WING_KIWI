"use client";

import { useRef, useEffect, useCallback, useState } from "react";

// India & NZ coordinates
const INDIA = { lat: 20.5937, lng: 78.9629 };
const NZ = { lat: -41.2865, lng: 174.7762 };
const DELHI = { lat: 28.6139, lng: 77.209 };
const AUCKLAND = { lat: -36.8485, lng: 174.7633 };

// Countries to highlight
const HIGHLIGHT_COUNTRIES = new Set(["India", "New Zealand"]);

interface FlightGlobeProps {
  /** 0 = showing India, 1 = arrived in NZ */
  progress: number;
  className?: string;
}

export default function FlightGlobe({ progress, className }: FlightGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  const initGlobe = useCallback(async () => {
    if (!containerRef.current || globeRef.current) return;

    const GlobeModule = await import("globe.gl");
    const Globe = GlobeModule.default;

    // Fetch country polygons
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
    );
    const worldData = await res.json();

    // Convert TopoJSON to GeoJSON features
    const topojson = await import("topojson-client");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countries = (topojson.feature(worldData, worldData.objects.countries) as any).features;

    // Country ID to name mapping (ISO 3166-1 numeric)
    const COUNTRY_NAMES: Record<string, string> = {
      "356": "India",
      "554": "New Zealand",
    };

    const globe = new Globe(containerRef.current)
      // Dark globe base — no blue marble, use a dark texture
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("")
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereColor("#E8913A")
      .atmosphereAltitude(0.2)
      // Country polygons — India & NZ colored, rest dark
      .polygonsData(countries)
      .polygonCapColor((d: any) => {
        const name = COUNTRY_NAMES[d.id] || "";
        if (name === "India") return "rgba(232, 145, 58, 0.7)"; // amber
        if (name === "New Zealand") return "rgba(74, 124, 89, 0.8)"; // fern
        return "rgba(8, 12, 25, 0.6)"; // dark overlay for other countries
      })
      .polygonSideColor(() => "rgba(20, 30, 50, 0.3)")
      .polygonStrokeColor((d: any) => {
        const name = COUNTRY_NAMES[d.id] || "";
        if (HIGHLIGHT_COUNTRIES.has(name)) return "rgba(255,255,255,0.5)";
        return "rgba(40, 50, 70, 0.3)";
      })
      .polygonAltitude((d: any) => {
        const name = COUNTRY_NAMES[d.id] || "";
        return HIGHLIGHT_COUNTRIES.has(name) ? 0.02 : 0.005;
      })
      // Flight arc — thicker and more visible
      .arcsData([
        {
          startLat: DELHI.lat,
          startLng: DELHI.lng,
          endLat: AUCKLAND.lat,
          endLng: AUCKLAND.lng,
        },
      ])
      .arcColor(() => ["#E8913A", "#E8655A", "#E8655A", "#4A7C59"])
      .arcStroke(2.5)
      .arcDashLength(0.6)
      .arcDashGap(0.05)
      .arcDashAnimateTime(2000)
      .arcAltitudeAutoScale(0.45)
      // City points — glowing markers
      .pointsData([
        { lat: 28.6139, lng: 77.209, label: "Delhi", size: 0.15, color: "#E8913A" },
        { lat: 19.076, lng: 72.8777, label: "Mumbai", size: 0.1, color: "#E8913A" },
        { lat: 12.9716, lng: 77.5946, label: "Bangalore", size: 0.1, color: "#E8913A" },
        { lat: 13.0827, lng: 80.2707, label: "Chennai", size: 0.08, color: "#E8913A" },
        { lat: 17.385, lng: 78.4867, label: "Hyderabad", size: 0.08, color: "#E8913A" },
        { lat: 23.0225, lng: 72.5714, label: "Ahmedabad", size: 0.08, color: "#E8913A" },
        { lat: 22.5726, lng: 88.3639, label: "Kolkata", size: 0.08, color: "#E8913A" },
        { lat: -36.8485, lng: 174.7633, label: "Auckland", size: 0.15, color: "#4A7C59" },
        { lat: -41.2865, lng: 174.7762, label: "Wellington", size: 0.1, color: "#4A7C59" },
        { lat: -45.0312, lng: 168.6626, label: "Queenstown", size: 0.1, color: "#4A7C59" },
        { lat: -43.532, lng: 172.6306, label: "Christchurch", size: 0.08, color: "#4A7C59" },
        { lat: -38.1368, lng: 176.2497, label: "Rotorua", size: 0.08, color: "#4A7C59" },
      ])
      .pointAltitude("size")
      .pointColor("color")
      .pointRadius(0.5)
      // Labels
      .labelsData([
        { lat: 22, lng: 78, text: "INDIA", size: 1.8, color: "#E8913A" },
        { lat: -40, lng: 174, text: "NEW ZEALAND", size: 1.5, color: "#6BA37A" },
      ])
      .labelColor("color")
      .labelSize("size")
      .labelDotRadius(0.5)
      .labelDotOrientation(() => "bottom" as any)
      .labelAltitude(0.025)
      .labelResolution(3);

    // Set initial view — zoomed in on India
    globe.pointOfView({ lat: INDIA.lat, lng: INDIA.lng, altitude: 1.8 }, 0);

    // Disable user interaction — scroll controls the globe
    const controls = globe.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enabled = false;

    // Size the globe to fill container
    const resize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        globe.width(clientWidth).height(clientHeight);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    globeRef.current = globe;
    setReady(true);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    initGlobe();
    return () => {
      if (globeRef.current) {
        const el = containerRef.current;
        if (el) el.innerHTML = "";
        globeRef.current = null;
      }
    };
  }, [initGlobe]);

  // Update globe POV based on scroll progress
  useEffect(() => {
    if (!globeRef.current || !ready) return;

    // Interpolate lat/lng from India → NZ
    const lat = INDIA.lat + (NZ.lat - INDIA.lat) * progress;
    const lng = INDIA.lng + (NZ.lng - INDIA.lng) * progress;

    // Zoom: start close, pull out mid-flight to show the arc, zoom back in at NZ
    const startZoom = 1.8;
    const midZoom = 2.8;
    const endZoom = 1.8;
    const altitude =
      progress < 0.5
        ? startZoom + (midZoom - startZoom) * (progress / 0.5)
        : midZoom + (endZoom - midZoom) * ((progress - 0.5) / 0.5);

    globeRef.current.pointOfView({ lat, lng, altitude }, 100);
  }, [progress, ready]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    />
  );
}
