/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Empty,
  Input,
  Layout,
  Menu,
  Row,
  Spin,
  Typography,
} from "antd";
import async from "async";

import { Button } from "src/components";

import QuestionService from "../../utilities/apiServices/QuestionService";
import QuizService from "../../utilities/apiServices/QuizService";
import validator from "../../utilities/validator";
import Question from "../QuizManagement/Question";

const MAX_QUESTION = 10;

const QuizForm = (props) => {
  const {} = props;

  const { t } = useTranslation();

  const { quizId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSaveQuizSubmiting, setIsSaveQuizSubmiting] = useState(false);
  const [isAddQuestionSubmiting, setIsAddQuestionSubmiting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const quiz = useRef({});

  useEffect(() => {
    load();
  }, [quizId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  function load() {
    setIsLoading(true);
    async.parallel(
      [
        function (next) {
          QuizService.getOne(quizId)
            .then((res) => {
              return next(null, res.data);
            })
            .catch((error) => {
              return next(error);
            });
        },
        function (next) {
          QuestionService.getAll({
            filter: JSON.stringify([
              { key: "quizId", operator: "=", value: quizId },
            ]),
          })
            .then((res) => {
              return next(null, res.data.items);
            })
            .catch((error) => {
              return next(error);
            });
        },
      ],
      function (error, [quizData, questionsData]) {
        quiz.current = quizData;
        setQuestions(questionsData);
        setIsLoading(false);
      }
    );
  }

  function onInputChange(e) {
    const { value, name } = e.target;
    quiz.current[name] = value;
  }

  function handleSaveQuiz() {
    setIsSaveQuizSubmiting(true);
    QuizService.update(quizId, quiz.current)
      .then((res) => {
        quiz.current = res.data;
        setIsSaveQuizSubmiting(false);
      })
      .catch((error) => {
        if (
          error.response.data?.result == "fail" &&
          error.response.data.error == "invalid_input"
        ) {
          showValidateErrors(error.response.data.all);
        }
        setIsSaveQuizSubmiting(false);
      });
  }

  function handleAddQuestion() {
    setIsAddQuestionSubmiting(true);
    QuestionService.create({
      quizId: quizId,
    })
      .then((res) => {
        setQuestions([...questions, res.data]);
        setIsAddQuestionSubmiting(false);
      })
      .catch((error) => {
        setIsAddQuestionSubmiting(false);
      });
  }

  function onDeleteQuestion(question) {
    setQuestions(questions.filter((q) => q.id != question.id));
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
    <div style={{ margin: "0 16px" }}>
      <Row>
        <Col span={24} style={{ padding: "10px 0px" }}>
          <Button beforeIcon={<LeftOutlined />} onClick={handleGoBack}>
            {t("content.QUIZ_TAB__QUIZ_DETAIL__BACK_BUTTON_LABEL")}
          </Button>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col span={24}>
            <label style={{ fontSize: "14px", margin: "10px 0px" }}>
              {t(
                "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DETAIL__QUIZ_TITLE_INPUT_LABEL"
              )}
              <span style={{ color: "red" }}>{" *"}</span>
            </label>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Input
              type="text"
              name="title"
              placeholder={t(
                "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_TITLE_INPUT_PLACEHOLDER"
              )}
              defaultValue={quiz.current?.title}
              onChange={onInputChange}
              onBlur={() => {
                if (validate("title")) {
                  handleSaveQuiz();
                }
              }}
            />
            <Typography.Text type="danger">
              {errors.find((e) => e.name === "title")?.message}
            </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label style={{ fontSize: "14px", margin: "10px 0px" }}>
              {t(
                "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_INTRODUCTION_INPUT_LABEL"
              )}
            </label>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Input
              type="text"
              name="introduction"
              placeholder={t(
                "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_INTRODUCTION_INPUT_PLACEHOLDER"
              )}
              defaultValue={quiz.current?.introduction}
              onChange={onInputChange}
              onBlur={() => {
                if (validate("introduction")) {
                  handleSaveQuiz();
                }
              }}
            />
            <Typography.Text type="danger">
              {errors.find((e) => e.name == "introduction")?.message}
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
              placeholder={t(
                "content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_PLACEHOLDER"
              )}
              defaultValue={quiz.current?.description}
              onChange={onInputChange}
              onBlur={() => {
                if (validate("description")) {
                  handleSaveQuiz();
                }
              }}
            />
            <Typography.Text type="danger">
              {errors.find((e) => e.name == "description")?.message}
            </Typography.Text>
          </Col>
        </Row>
      </Row>
      <Row style={{ marginTop: "5px" }}>
        <Col span={24}>
          <>
            {questions?.map((question, i) => {
              return (
                <div key={question.id} style={{ margin: "30px 0px" }}>
                  <Question
                    index={i + 1}
                    question={question}
                    onDelete={onDeleteQuestion}
                  />
                </div>
              );
            })}
          </>
        </Col>
      </Row>
      {questions && questions.length < MAX_QUESTION && (
        <Row style={{ marginTop: "30px", marginBottom: "50px" }}>
          <Col span={24}>
            <Button
              className="flex-center"
              style={{ width: "100%" }}
              loading={isAddQuestionSubmiting}
              onClick={handleAddQuestion}
            >
              {"+ " +
                t("content.QUIZ_TAB__QUIZ_DETAIL__ADD_QUESTION_BUTTON_LABEL")}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default QuizForm;
