/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LoadingOutlined, CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Layout, Menu, Col, Row, Button, Spin, Empty, Checkbox, Radio, Space, Card } from "antd";
import QuizResultService from "./../../../services/QuizResultService";

const { Header, Content, Footer, Sider } = Layout;

export default function Result(props) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState();

  useEffect(
    () => {
      setIsLoading(true);
      QuizResultService.getResults(props.quizResultId)
        .then(res => {
          setResults(res.data);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        });
    },
    [props.quizResultId]
  );

  const calcCorrectCount = () => {
    return results?.questions?.filter(q => !q.answers.find(a => a.selected && !a.isCorrectAnswer) && !q.answers.find(a => !a.selected && a.isCorrectAnswer)).length;
  }

  const renderCheckMask = (answer) => {
    if(answer.isCorrectAnswer && answer.selected){
      return <CheckCircleFilled style={{ color: "green" }} />
    }
    else
    if(!answer.isCorrectAnswer && answer.selected){
      return <CloseCircleFilled style={{ color: "red" }} />
    }
    else 
    if(answer.isCorrectAnswer && !answer.selected){
      return <CheckCircleFilled style={{ color: "#b9b9b9" }} />
    } else {
      return <></>
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "80%",
      }}
    >
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
          <Row style={{ marginTop: "50px", marginBottom: '20px'}}>
            <Col span={24} style={{ fontSize: "1em", fontWeight: "bold" }}>
              {"You have complete the quiz!"}
            </Col>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={24} style={{ fontSize: "1em", fontWeight: "bold" }}>
              {"Correct answers: "} &nbsp;&nbsp;&nbsp;
              { calcCorrectCount() }
              {" / "}
              {results?.questions?.length}
            </Col>
          </Row>
          {results?.questions?.map((question, index) => {
            return (
              <Row key={question.id} style={{ marginBottom: "50px"}}>
                <Col span={24}>
                  <Card>
                    <Row style={{ width: "100%", marginBottom: "20px" }}>
                      <Col span={24} style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                        {index + 1} {". "} {question?.text}
                      </Col>
                    </Row>
                    {question?.answers.map(answer => {
                      return (
                        <Row key={answer.id} style={{ width: "100%", marginTop: "20px" }}>
                          <Col
                            span={1}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "1.6em"
                            }}
                          >
                            { renderCheckMask(answer)}
                          </Col>
                          <Col span={23} style={{ paddingLeft: '15px' }}>{answer?.text}</Col>
                        </Row>
                      );
                    })}
                  </Card>
                </Col>
              </Row>
            );
          })}
        </>
      )}
    </div>
  );
}
