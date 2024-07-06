// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import ImageUploader from "./components/ImageUploader";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={ImageGallery} />
        <Route path="/upload/:imageType" Component={ImageUploader} />
      </Routes>
    </Router>
  );
};

export default App;
