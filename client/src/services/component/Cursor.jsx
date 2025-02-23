import { useState, useEffect } from "react";

function Cursor({ cursor, name }) {
  console.log(cursor);
  const cursorStyle = {
    position: "absolute",
    // left: cursor.x,
    // top: cursor.y,
    width: "10px",
    height: "10px",
    backgroundColor: "red",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)", // Center the cursor
    transition: "left 0.1s linear, top 0.1s linear", // Smooth transition
    pointerEvents: "none", // Ensure the cursor doesn't interfere with clicks
  };

  const textStyle = {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    marginBottom: "5px",
    fontSize: "8px",
    whiteSpace: "nowrap", // Prevent text from wrapping
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={cursorStyle}>
        <p style={textStyle}>{name}</p>
      </div>
    </div>
  );
}

export default Cursor;
