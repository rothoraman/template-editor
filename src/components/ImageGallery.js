import React from "react";
import { Link } from "react-router-dom";
import "./ImageGallery.css";

import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";

const images = [
  { id: 1, src: image1, alt: "Image 1" },
  { id: 2, src: image2, alt: "Image 2" },
  { id: 3, src: image3, alt: "Image 3" },
  { id: 4, src: image4, alt: "Image 4" },
];

const ImageGallery = () => {
  return (
    <>
      <h1 className="gallery-heading">Click on any template to modify</h1>
      <div className="image-gallery">
        {images.map((image) => (
          <div key={image.id} className="image-wrapper">
            <Link to={`/upload/${image.id}`}>
              <img src={image.src} alt={image.alt} className="gallery-image" />
            </Link>
            <Link to={`/upload/${image.id}`} className="modify-link">
              Modify
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
