/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LoadingOutlined, LeftOutlined } from "@ant-design/icons";
import { Layout, Menu, Col, Row, Button, Spin, Empty, Input, Card, Typography } from "antd";
import validator from "../../../../../../utilities/validator";
import Question from "./Question";
import QuizService from "../../../../../../utilities/apiServices/QuizService";
import QuestionService from "../../../../../../utilities/apiServices/QuestionService";
import async from "async";

const { Header, Content, Footer, Sider } = Layout;

export default function(props) {
  const { t } = useTranslation();
  const MAX_QUESTION = 10;
  const { quizId, onBack } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSaveQuizSubmiting, setIsSaveQuizSubmiting] = useState(false);
  const [isAddQuestionSubmiting, setIsAddQuestionSubmiting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const quiz = useRef({});

  useEffect(
    () => {
      load(quizId);
    },
    [quizId]
  );

  function load(quizId) {
    setIsLoading(true);
    async.parallel(
      [
        function(next) {
          QuizService.getOne(quizId)
            .then(res => {
              return next(null, res.data);
            })
            .catch(error => {
              return next(error);
            });
        },
        function(next) {
          QuestionService.getAll({
            filter: JSON.stringify([{ key: "quizId", operator: "=", value: quizId }])
          })
            .then(res => {
              return next(null, res.data.items);
            })
            .catch(error => {
              return next(error);
            });
        }
      ],
      function(error, [quizData, questionsData]) {
        quiz.current = quizData;
        console.log(questions);
        setQuestions(questionsData);
        setIsLoading(false);
      }
    );
  }

  function onInputChange(e) {
    const { value, name } = e.target;
    quiz.current[name] = value;
    console.log(quiz.current);
  }

  function handleSaveQuiz() {
    setIsSaveQuizSubmiting(true);
    QuizService.update(quizId, quiz.current)
      .then(res => {
        quiz.current = res.data;
        setIsSaveQuizSubmiting(false);
      })
      .catch(error => {
        if (error.response.data?.result == "fail" && error.response.data.error == "invalid_input") {
          showValidateErrors(error.response.data.all);
        }
        setIsSaveQuizSubmiting(false);
      });
  }

  function handleAddQuestion() {
    setIsAddQuestionSubmiting(true);
    QuestionService.create({
      quizId: quizId
    })
      .then(res => {
        setQuestions([...questions, res.data]);
        setIsAddQuestionSubmiting(false);
      })
      .catch(error => {
        setIsAddQuestionSubmiting(false);
      });
  }

  function onDeleteQuestion(question) {
    setQuestions(questions.filter(q => q.id != question.id));
  }

  function showValidateErrors(errors) {
    try {
      errors = JSON.parse(errors);
    } catch (error) {}
    setErrors(errors);
  }

  function validate(name) {
    const errors = [];
    const isValidated = true;
    // if (!validator.validLength(quiz.current.title, 1, 255)) {
    //   isValidated = false;
    //   (!name || name == "title") &&
    //     errors.push({ name: "title", message: "title must be not empty and length less than 256 characters" });
    // }
    // if (!validator.validLength(quiz.current.introduction, undefined, 255)) {
    //   isValidated = false;
    //   (!name || name == "introduction") &&
    //     errors.push({ name: "introduction", message: "introduction length must be between 1 and 255 characters" });
    // }
    // if (!validator.validLength(quiz.current.description, undefined, 255)) {
    //   isValidated = false;
    //   (!name || name == "description") &&
    //     errors.push({ name: "description", message: "description length must be between 1 and 255 characters" });
    // }

    showValidateErrors(errors);

    setIsValidated(isValidated);

    return isValidated;
  }

  return (
    <Content style={{ margin: "0 16px" }}>
      {isLoading ? (
        <div
          style={{
            height: "100%",
            minHeight: "300px",
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
          <Row>
            <Col span={24} style={{ padding: "10px 0px" }}>
              <Button
                type="default"
                className="flex-center"
                style={{ float: "left" }}
                icon={<LeftOutlined />}
                onClick={onBack}
              >
                {t("content.QUIZ_TAB__QUIZ_DETAIL__BACK_BUTTON_LABEL")}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card
                title={t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DETAIL__QUIZ_DETAIL_LABEL")}
                extra={
                  <>
                    {isSaveQuizSubmiting && (
                      <div style={{ float: "right", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Spin indicator={<LoadingOutlined spin style={{ fontSize: 18, marginRight: "5px" }} />} />
                        {" Saving ..."}
                      </div>
                    )}
                  </>
                }
              >
                <Row>
                  <Col span={24}>
                    <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                      {t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DETAIL__QUIZ_TITLE_INPUT_LABEL")}
                      <span style={{ color: "red" }}>{" *"}</span>
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Input
                      type="text"
                      name="title"
                      placeholder={t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_TITLE_INPUT_PLACEHOLDER")}
                      defaultValue={quiz.current?.title}
                      onChange={onInputChange}
                      onBlur={() => {
                        if (validate("title")) {
                          handleSaveQuiz();
                        }
                      }}
                    />
                    <Typography.Text type="danger">{errors.find(e => e.name == "title")?.message}</Typography.Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                      {t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_INTRODUCTION_INPUT_LABEL")}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Input
                      type="text"
                      name="introduction"
                      placeholder={t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_INTRODUCTION_INPUT_PLACEHOLDER")}
                      defaultValue={quiz.current?.introduction}
                      onChange={onInputChange}
                      onBlur={() => {
                        if (validate("introduction")) {
                          handleSaveQuiz();
                        }
                      }}
                    />
                    <Typography.Text type="danger">
                      {errors.find(e => e.name == "introduction")?.message}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                      {t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_LABEL")}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Input
                      type="text"
                      name="description"
                      placeholder={t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_PLACEHOLDER")}
                      defaultValue={quiz.current?.description}
                      onChange={onInputChange}
                      onBlur={() => {
                        if (validate("description")) {
                          handleSaveQuiz();
                        }
                      }}
                    />
                    <Typography.Text type="danger">
                      {errors.find(e => e.name == "description")?.message}
                    </Typography.Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "5px" }}>
            <Col span={24}>
              <>
                {questions?.map((question, i) => {
                  return (
                    <div key={question.id} style={{ margin: "30px 0px" }}>
                      <Question index={i + 1} question={question} onDelete={onDeleteQuestion} />
                    </div>
                  );
                })}
              </>
            </Col>
          </Row>
          {questions.length < MAX_QUESTION && (
            <Row style={{ marginTop: "30px", marginBottom: "50px" }}>
              <Col span={24}>
                <Button
                  className="flex-center"
                  style={{ width: "100%" }}
                  loading={isAddQuestionSubmiting}
                  onClick={handleAddQuestion}
                >
                  {"+ " + t("content.QUIZ_TAB__QUIZ_DETAIL__ADD_QUESTION_BUTTON_LABEL")}
                </Button>
              </Col>
            </Row>
          )}
        </>
      )}
    </Content>
  );
}
