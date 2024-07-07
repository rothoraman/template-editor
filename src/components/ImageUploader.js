import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import Draggable from "react-draggable";
import "./ImageUploader.css";

const ImageUploader = () => {
  const { imageType } = useParams();
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState([]);
  const baseImageRef = useRef(null);

  // Function to handle file drop
  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages((prevImages) => [
          ...prevImages,
          {
            src: reader.result,
            x: baseImageRef.current.width / 2 - 50, // Initial x position
            y: baseImageRef.current.height / 2 - 50, // Initial y position
            title: `Image ${imageType}`, // Example title based on imageType
            id: imageType, // Example ID based on imageType
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to handle dragging of uploaded images
  const handleDrag = (index, e, data) => {
    setUploadedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = { ...newImages[index], x: data.x, y: data.y };
      return newImages;
    });
  };

  // Function to handle image download
  const handleDownload = () => {
    // Create a temporary canvas to draw all images
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const baseImage = baseImageRef.current;
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;

    // Draw base image on canvas
    ctx.drawImage(baseImage, 0, 0);

    // Use Promise.all to handle multiple image loading asynchronously
    Promise.all(
      uploadedImages.map(({ src, x, y }) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous"; // Ensure CORS compatibility
          img.src = src;
          img.onload = () => {
            ctx.drawImage(img, x, y);
            resolve(); // Resolve the promise once image is drawn
          };
          img.onerror = (error) => reject(error); // Handle any errors loading the image
        });
      })
    )
      .then(() => {
        // Once all images are drawn, create a download link for the canvas
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `image-${imageType}.png`;
        link.click();
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });
  };

  // Effect to ensure all uploaded images are loaded before rendering
  useEffect(() => {
    const handleImageLoad = () => {
      setUploadedImages((prevImages) => [...prevImages]);
    };

    uploadedImages.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
    });
  }, [uploadedImages]);

  return (
    <div className="upload-page">
      <h1>Upload Images for Image {imageType}</h1>
      <Dropzone onDrop={onDrop} multiple>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      <div className="image-container">
        <img
          ref={baseImageRef}
          src={`https://jsonplaceholder.typicode.com/photos/${imageType}`} // Example URL based on imageType
          alt={`Image ${imageType}`}
          className="base-image"
        />
        {uploadedImages.map((image, index) => (
          <Draggable
            key={index}
            position={{ x: image.x, y: image.y }}
            onStop={(e, data) => handleDrag(index, e, data)}
          >
            <div className="uploaded-image">
              <img src={image.src} alt={`Uploaded ${index}`} />
              <div className="image-details">
                <p>ID: {image.id}</p>
                <p>Title: {image.title}</p>
              </div>
            </div>
          </Draggable>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => navigate("/")}>Back</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default ImageUploader;
