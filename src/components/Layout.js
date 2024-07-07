import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ImageGallery from "./ImageGallery";
import "./Layout.css";

const Layout = ({ albums, paginate, itemsPerPage, currentPage }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar albums={albums} paginate={paginate} />
        <ImageGallery
          albums={albums}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Layout;
