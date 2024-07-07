import React from "react";
import "./Sidebar.css";

const Sidebar = ({ albums, paginate }) => {
  // Filter albums with title length of 10 characters
  const filteredAlbums = albums.filter((album) => album.title.length === 10);

  return (
    <aside className="sidebar">
      {filteredAlbums.map((album) => (
        <button key={album.id} onClick={() => paginate(album.id)}>
          {album.title}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
