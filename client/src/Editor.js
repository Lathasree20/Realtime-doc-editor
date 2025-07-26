// client/src/Editor.js
import React, { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { io } from "socket.io-client";
import "quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const SAVE_INTERVAL_MS = 2000;

function Editor() {
  const { id: documentId } = useParams();
  const wrapperRef = useRef(null);
  const socketRef = useRef(null);
  const [quill, setQuill] = useState(null);

  // Setup socket connection
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  // Load document
  useEffect(() => {
    if (!socketRef.current || !quill) return;

    socketRef.current.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socketRef.current.emit("get-document", documentId);
  }, [quill, documentId]);

  // Send text changes
  useEffect(() => {
    if (!socketRef.current || !quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socketRef.current.emit("send-changes", delta);
    };

    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [quill]);

  // Receive changes
  useEffect(() => {
    if (!socketRef.current || !quill) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socketRef.current.on("receive-changes", handler);
    return () => socketRef.current.off("receive-changes", handler);
  }, [quill]);

  // Auto-save
  useEffect(() => {
    if (!socketRef.current || !quill) return;

    const interval = setInterval(() => {
      socketRef.current.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [quill]);

  // Setup Quill
  const setEditor = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, { theme: "snow" });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return <div className="container" ref={setEditor} />;
}

export default Editor;
