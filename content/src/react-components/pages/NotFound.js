/* eslint-disable no-undef */
/* eslint-disable no-debugger */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "./NotFound.scss";

const { Content } = Layout;

const QUIZ_STEPS = {
  GETTING_STARTED: 1,
  QUESTIONS: 2,
  RESULT: 3
};

export default function NotFound() {
  return (
    <Content
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1 style={{color: '#aaaaaa'}}>Not Found</h1>
    </Content>
  );
}
