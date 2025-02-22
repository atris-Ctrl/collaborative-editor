import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Cursor from "./services/component/Cursor";
import socket from "./services/socket";

function Editor() {
  const containerRef = useRef(null);
  const quilRef = useRef(null);
  const [content, setContent] = useState("");

  // TODO-2: Add state for tracking connections and changes

  // TODO-4: Add presence awareness:
  //   - Track connected users
  //   - Show user cursors
  //   - Handle user join/leave events

  useEffect(() => {
    socket.on("updateContent", (updatedContent) => {
      console.log("update Content got");
      setContent(updatedContent);
    });
    return () => {
      socket.off("updateContent");
    };
  }, []);
  // TODO-3: Implement change handlers:
  //   - Handle local changes
  //   - Broadcast changes to other users
  //   - Apply remote changes
  const sendMessageToServer = () => {
    const updated = quilRef.current.getText();
    setContent(updated);
    socket.emit("edit", updated);
  };
  // TODO-5: Implement error handling and recovery:
  //   - Handle connection loss
  //   - Implement change recovery
  //   - Add conflict resolution
  useLayoutEffect(function () {
    function addEditor() {
      try {
        if (!containerRef.current)
          throw new Error("Editor container not found!");
        const quill = new Quill(containerRef.current, {
          theme: "snow",
          placeholder: "Start writing...",
        });
        quilRef.current = quill;

        quill.on("text-change", () => {
          sendMessageToServer();
        });
      } catch (err) {
        console.log(err);
      }
    }
    addEditor();
    return () => {
      containerRef.current = null;
    };
  }, []);
  return (
    <div>
      <Cursor name="atris:p"></Cursor>

      <div ref={containerRef}></div>
      <p>{content}</p>
    </div>
  );
}

export default Editor;
