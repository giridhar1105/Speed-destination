"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-200">
      <Head>
        <title>Geolocation Example</title>
        <meta name="description" content="Geolocation coordinates using Next.js" />
      </Head>
      <main className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Geolocation Coordinates</h1>
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {coordinates ? (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="list-none p-0"
          >
            <li className="my-2 text-lg text-black">Latitude: {coordinates.latitude}</li>
            <li className="my-2 text-lg text-black">Longitude: {coordinates.longitude}</li>
            <li className="my-2 text-lg text-black">Altitude: {coordinates.altitude !== null ? coordinates.altitude : 'N/A'} m</li>
            <li className="my-2 text-lg text-black">Accuracy: {coordinates.accuracy} m</li>
            <li className="my-2 text-lg text-black">Altitude Accuracy: {coordinates.altitudeAccuracy !== null ? coordinates.altitudeAccuracy : 'N/A'} m</li>
            <li className="my-2 text-lg text-black">Heading: {coordinates.heading !== null ? coordinates.heading : 'N/A'}°</li>
            <li className="my-2 text-lg text-black">Speed: {coordinates.speed !== null ? coordinates.speed : 'N/A'} m/s</li>
          </motion.ul>
        ) : (
          <p className="text-lg text-center text-black">Fetching coordinates.....</p>
        )}
      </main>
    </div>
  );
};

export default Home;
