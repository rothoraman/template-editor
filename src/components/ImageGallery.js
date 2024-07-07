import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ImageGallery.css";

const ImageGallery = ({ albums }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Display 9 items per page

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlbums = albums.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="image-gallery">
      <h1 className="gallery-heading">Click on any template to modify</h1>
      <div className="images">
        {currentAlbums.map((album) => (
          <div key={album.id} className="image-wrapper">
            <Link to={`/upload/${album.id}`}>
              <img
                src={album.thumbnailUrl}
                alt={album.title}
                className="gallery-image"
              />
            </Link>
            <div className="image-info">
              <p>ID: {album.id}</p>
              <p>Title: {album.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(albums.length / itemsPerPage) },
          (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
