/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Menu, Col, Row, Button, Spin, Empty } from "antd";
import QuizResultService from "./../../../services/QuizResultService";

const { Header, Content, Footer, Sider } = Layout;

export default function GettingStarted(props) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [quiz, setQuiz] = useState(props.quiz);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(
    () => {
      setQuiz(props.quiz);
    },
    [props.quiz]
  );

  function handleStartQuiz() {
    setIsStarting(true);
    const userId = new URL(window.location.href).searchParams.get("userId");
    QuizResultService.create({
      quizId: quiz.id,
      userId: userId || null,
    })
      .then(res => {
        setQuizResult(res.data);
        setIsStarting(false);
        if (props.onStartQuiz) {
          props.onStartQuiz(res.data);
        }
      })
      .catch(error => {
        setIsStarting(false);
      });
  }

  return (
    <div style={{ width: "50%" }}>
      <Row style={{ width: "100%" }}>
        <Col span={24} style={{ fontSize: "2em", fontWeight: "bold", textAlign: "center" }}>
          {quiz?.title}
        </Col>
      </Row>
      <Row style={{ width: "100%", marginTop: "10vh" }}>
        <Col span={24} style={{ fontSize: "1em", textAlign: "center", lineHeight: "2em" }}>
          {quiz?.introduction}
        </Col>
      </Row>
      <Row style={{ width: "100%", marginTop: "15vh" }}>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Button size="large" type="primary" loading={isStarting} disabled={!(quiz?.questions && quiz?.questions?.length > 0)} onClick={handleStartQuiz}>
            {"Start quiz"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
