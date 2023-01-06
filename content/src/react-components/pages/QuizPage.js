/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-debugger */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import QuizService from "../../services/QuizService";
import Store from "../../utils/store";
import { Breadcrumb, Layout, Menu, Col, Row, Button, Card, Spin } from "antd";
import GettingStarted from "../components/quiz/GettingStarted";
import Question from "../components/quiz/Question";
import Result from "../components/quiz/Result";
import "./QuizPage.scss";

const { Header, Content, Footer, Sider } = Layout;

const QUIZ_STEPS = {
  GETTING_STARTED: 1,
  QUESTIONS: 2,
  RESULT: 3
};

export default function QuizPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [quiz, setQuiz] = useState({
    id: new URL(window.location.href).searchParams.get("id"),
    title: new URL(window.location.href).searchParams.get("title"),
    description: new URL(window.location.href).searchParams.get("description"),
    questions: [{}, {}]
  });
  const [quizResult, setQuizResult] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizStep, setQuizStep] = useState(QUIZ_STEPS.GETTING_STARTED);

  useEffect(() => {
    // const token = new URL(window.location.href).searchParams.get("token");
    // if(token){
    //   Store.setAccessToken(token);
    // }

    const quizId = new URL(window.location.href).searchParams.get("id");
    //setIsLoading(true);
    QuizService.getOneWithoutAuth(quizId)
      .then(res => {
        setQuiz(res.data);
        //setIsLoading(false);
      })
      .catch(error => {
        //setIsLoading(false);
        setIsError(true);
      });
  }, []);

  function handleStartQuiz(quizResult) {
    setQuizResult(quizResult);
    handleNextStep();
  }

  function handleNextStep() {
    setQuizStep(quizStep + 1);
  }

  function handleNextQuestion() {
    const nextQuestionIndex = questionIndex + 1;
    if (nextQuestionIndex < quiz?.questions?.length) {
      setQuestionIndex(nextQuestionIndex);
    } else {
      handleNextStep();
    }
  }

  return (
    <Content
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {isLoading ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
        </div>
      ) : (
        <>
          {isError ? (
            <div>
              <Row style={{ width: "100%" }}>
                <Col span={24} style={{ fontSize: "2em", fontWeight: "bold", textAlign: "center" }}>
                  {"404"}
                </Col>
              </Row>
              <Row style={{ width: "100%", marginTop: "50px" }}>
                <Col span={24} style={{ fontSize: "2em", textAlign: "center", color: "gray" }}>
                  {"Wrong quiz"}
                </Col>
              </Row>
            </div>
          ) : (
            <>
              {quizStep === QUIZ_STEPS.GETTING_STARTED && <GettingStarted quiz={quiz} onStartQuiz={handleStartQuiz} />}
              {quizStep === QUIZ_STEPS.QUESTIONS && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Question
                    index={questionIndex}
                    quizResultId={quizResult.id}
                    questionId={quiz?.questions[questionIndex]?.id}
                    onSubmitAnswer={handleNextQuestion}
                  />
                </div>
              )}
              {quizStep === QUIZ_STEPS.RESULT && <Result quizResultId={quizResult.id} />}
            </>
          )}
        </>
      )}
    </Content>
  );
}
