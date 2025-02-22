import { useState } from "react";
function Cursor({ name }) {
  const [pos, setPos] = useState(null);
  const cursorStyle = {
    position: "absolute",
    width: "10px",
    height: "10px",
    backgroundColor: "red",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
  };

  const textStyle = {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    marginBottom: "5px",
    fontSize: "8px",
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
