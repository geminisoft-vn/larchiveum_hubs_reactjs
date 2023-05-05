/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { FormattedMessage } from "react-intl";
import { LoadingOutlined } from "@ant-design/icons";
import Store from "../../@larchiveum/utils/store";
import { CONTENT_ROOT } from "../../@larchiveum/utils/constants";
import QuizService from "../../@larchiveum/services/QuizService";
import DocumentService from "../../@larchiveum/services/DocumentService";
import { useState, useEffect } from "react";
import { Space, Spin } from "antd";

export function ContentsSidebar({ children, onClose }) {
  return (
    <Sidebar
      title={
        <FormattedMessage
          id="contents-sidebar.title"
          defaultMessage="Contents"
        />
      }
      beforeTitle={<CloseButton onClick={onClose} />}
    >
      {children}
    </Sidebar>
  );
}

ContentsSidebar.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadQuizzes = async () => {
    try {
      setIsLoading(true);
      const res = await QuizService.getAll({
        filter: JSON.stringify([
          {
            operator: "=",
            key: "createdBy",
            value: Store.getUserID()
          }
        ])
      });
      if (res.result === "ok") {
        setQuizzes(res.data);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {isLoading ? (
        <div
          style={{
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <>
          {quizzes.length > 0 ? (
            <>
              {quizzes &&
                quizzes.map(quiz => (
                  <a
                    key={quiz.id}
                    href={`${CONTENT_ROOT}/preview/quiz/${quiz.id}`}
                    target="_blank"
                    rel="noopener referrer"
                    style={{
                      display: "inline-block",
                      width: "100%",
                      padding: "5px 10px",
                      border: "1px solid #48d7ff",
                      borderRadius: "3px",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden"
                    }}
                  >
                    {quiz.title}
                  </a>
                ))}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#aaaaaa"
              }}
            >
              <span>{"No quiz"}</span>
            </div>
          )}
        </>
      )}
    </Space>
  );
}

export function DocumentList() {
  const [documents, setdocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    DocumentService.getAll({
      filter: JSON.stringify([
        {
          operator: "=",
          key: "createdBy",
          value: Store.getUserID()
        }
      ])
    })
      .then(res => {
        setdocuments(res.data.items);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {isLoading ? (
        <div
          style={{
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      ) : (
        <>
          {documents?.length > 0 ? (
            <>
              {documents?.map(document => (
                <a
                  key={document.id}
                  href={`${CONTENT_ROOT}/preview/document/${document.id}`}
                  target="_blank"
                  rel="noopener referrer"
                  style={{
                    display: "inline-block",
                    width: "100%",
                    padding: "5px 10px",
                    border: "1px solid #48d7ff",
                    borderRadius: "3px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden"
                  }}
                >
                  {document.title}
                </a>
              ))}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#aaaaaa"
              }}
            >
              <span>{"No document"}</span>
            </div>
          )}
        </>
      )}
    </Space>
  );
}
