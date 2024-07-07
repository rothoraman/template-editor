import React from "react";
import "./Sidebar.css";
const Sidebar = ({ albums }) => {
  const handleRangeClick = (startId, endId) => {
    // Handle logic for clicking range of IDs
  };

  return (
    <div className="outerSidebar">
      <h2>Image IDs Range</h2>
      <button onClick={() => handleRangeClick(1, 10)}>IDs 1-10</button>
      <button onClick={() => handleRangeClick(11, 20)}>IDs 11-20</button>
      <button onClick={() => handleRangeClick(21, 30)}>IDs 21-30</button>
      <button onClick={() => handleRangeClick(31, 40)}>IDs 31-40</button>
      <button onClick={() => handleRangeClick(41, 50)}>IDs 41-50</button>
    </div>
  );
};

export default Sidebar;
