import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import Thumbnail from "./layouts/Thumbnail.jsx";
import App from "./App.jsx";

import "./index.css";

const AppContainer = () => {
  const [contentType, setContentType] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const type = qs.has("quiz-game")
      ? "quizzes"
      : qs.has("document-viewer")
      ? "documents"
      : "";
    setContentType(type);

    if (type) {
      const id = qs.get(type === "quizzes" ? "quiz-game" : "document-viewer");
      fetch(`${import.meta.env.VITE_API_ROOT}/v1/${type}/${id}`)
        .then((res) => res.json())
        .then(({ result, data }) => {
          if (result === "ok") {
            setTitle(data.title);
            if (type !== "quizzes") {
              setContent(data.content);
            }
          }
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const centerContainerStyle = {
    display: "flex",
    margin: "0 10vh",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  };

  return (
    <React.StrictMode>
      {isLoading ? null : title ? (
        <div style={centerContainerStyle}>
          <Thumbnail contentType={contentType} title={title} content={content} />
        </div>
      ) : (
        <App />
      )}
    </React.StrictMode>
  );
};

const initApp = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(<AppContainer />);
};

initApp();
