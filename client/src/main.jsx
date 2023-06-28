import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

const initApp = () => {
  const qs = new URLSearchParams(window.location.search);
  if (qs.has("quiz-game")) {
    const quizId = qs.get("quiz-game");
    fetch(`${import.meta.env.VITE_API_ROOT}/v1/quizzes/${quizId}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        if (json.result === "ok") {
          const quiz = json.data;
          console.log(quiz);
          const node = document.createElement("h1");
          const textnode = document.createTextNode(quiz.title);
          node.appendChild(textnode);
          node.style.textAlign = "center";
          node.style.width = "100%";
          document.querySelector("body").appendChild(node);
        }
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = `${
            import.meta.env.VITE_WEB_ROOT
          }/quiz-game/${quizId}`;
        }, 1500);
      });
    return;
  }
  if (qs.has("document-viewer")) {
    const documentId = qs.get("document-viewer");
    fetch(`${import.meta.env.VITE_API_ROOT}/v1/documents/${documentId}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        if (json.result === "ok") {
          const quiz = json.data;
          const node = document.createElement("h1");
          const textnode = document.createTextNode(quiz.title);
          node.appendChild(textnode);
          node.style.textAlign = "center";
          node.style.width = "100%";
          document.querySelector("body").appendChild(node);
        }
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = `${
            import.meta.env.VITE_WEB_ROOT
          }/document-viewer/${documentId}`;
        }, 1000);
      });
    return;
  }

  return ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initApp();
