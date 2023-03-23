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
import DocumentService from "../../services/DocumentService";
import Store from "../../utils/store";
import { Layout, Col, Row, Spin } from "antd";
import "./DocumentPage.scss";

const { Header, Content, Footer, Sider } = Layout;

const QUIZ_STEPS = {
  GETTING_STARTED: 1,
  QUESTIONS: 2,
  RESULT: 3
};

export default function DocumentPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [document, setDocument] = useState({
    id: new URL(window.location.href).searchParams.get("id"),
    title: new URL(window.location.href).searchParams.get("title"),
    description: new URL(window.location.href).searchParams.get("description"),
  });
  const [documentResult, setDocumentResult] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [documentStep, setDocumentStep] = useState(QUIZ_STEPS.GETTING_STARTED);
  
  useEffect(() => {
    const documentId = new URL(window.location.href).searchParams.get("id");
    setIsLoading(true);
    DocumentService.getOneWithoutAuth(documentId)
      .then(res => {
        setDocument(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <Content
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {isLoading ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
          }}
        >
          <Row>
            <Col span={24} style={{ textAlign: 'center', padding: '20px 0px', borderBottom: '1px solid gray', fontSize: '2em'}}>
              <span>Document</span>
            </Col>
          </Row>
          <Row style={{height: 'calc(100% - 80px)'}}>
            <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0px'}}>
              <h2>{document.title}</h2>
            </Col>
          </Row>
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
                  {"Wrong document"}
                </Col>
              </Row>
            </div>
          ) : (
            <div
              style={{ width: 'calc(100% - 40px)', padding: '20px'}}
              dangerouslySetInnerHTML={{__html: document.content}}
            />
          )}
        </>
      )}
    </Content>
  );
}