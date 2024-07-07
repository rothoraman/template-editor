import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import ImageUploader from "./components/ImageUploader";

const App = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_limit=50"
        );
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ImageGallery albums={albums} />} />
        <Route path="/upload/:imageId" element={<ImageUploader />} />
      </Routes>
    </Router>
  );
};

export default App;
