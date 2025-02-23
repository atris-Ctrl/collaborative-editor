import { useState } from "react";
import Cursor from "./Cursor";
function User({ name, id, isUser, cursor }) {
  return (
    <>
      <div
        style={{
          borderRadius: "50%",
          border: "1px solid black",
          backgroundColor: "blue",
          padding: "10px",
          display: "inline-block",
        }}
      ></div>
      <p>
        <strong> {isUser ? "You" : name}</strong>
      </p>
      <p>{id}</p>
      {!isUser && <Cursor cursor={cursor} name="atris:p" />}
    </>
  );
}

export default User;
