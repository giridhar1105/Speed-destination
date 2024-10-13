"use client"

import { useEffect, useState } from 'react';
import Head from 'next/head';

const Home = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const success = (pos) => {
      const { latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed } = pos.coords;
      setCoordinates({
        latitude,
        longitude,
        altitude,
        accuracy,
        altitudeAccuracy,
        heading,
        speed,
      });
    };

    const error = (err) => {
      setError(err.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Geolocation Example</title>
        <meta name="description" content="Geolocation coordinates using Next.js" />
      </Head>
      <main style={{ padding: '20px' }}>
        <h1>Geolocation Coordinates</h1>
        {error && <p>Error: {error}</p>}
        {coordinates ? (
          <ul>
            <li>Latitude: {coordinates.latitude}</li>
            <li>Longitude: {coordinates.longitude}</li>
            <li>Altitude: {coordinates.altitude !== null ? coordinates.altitude : 'N/A'} m</li>
            <li>Accuracy: {coordinates.accuracy} m</li>
            <li>Altitude Accuracy: {coordinates.altitudeAccuracy !== null ? coordinates.altitudeAccuracy : 'N/A'} m</li>
            <li>Heading: {coordinates.heading !== null ? coordinates.heading : 'N/A'}°</li>
            <li>Speed: {coordinates.speed !== null ? coordinates.speed : 'N/A'} m/s</li>
          </ul>
        ) : (
          <p>Fetching coordinates.....</p>
        )}
      </main>
    </div>
  );
};

export default Home;