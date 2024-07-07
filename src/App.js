import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ImageGallery from "./components/ImageGallery";
import ImageUploader from "./components/ImageUploader";
import "./App.css";

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
      <div className="App">
        <Header />
        <div className="content">
          {/* <Sidebar albums={albums} /> */}
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Sidebar albums={albums} />
                  <ImageGallery albums={albums} />
                </>
              }
            />
            <Route path="/upload/:imageType" element={<ImageUploader />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
