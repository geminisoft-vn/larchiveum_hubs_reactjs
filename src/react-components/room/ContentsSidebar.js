/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { FormattedMessage } from "react-intl";
import { LoadingOutlined } from "@ant-design/icons";
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
    const userId = window.localStorage.getItem("__LARCHIVEUM__USERID");

    if (!userId) return;
    setIsLoading(true);
    QuizService.getAll({
      filter: JSON.stringify([
        {
          operator: "=",
          key: "userId",
          value: userId
        }
      ])
    })
      .then(res => {
        if (res.status === 200) {
          setQuizzes(res.data.data);
        }
      })
      .catch(err => console.log({ err }))
      .finally(() => {
        setIsLoading(false);
      });
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
          {quizzes && quizzes.length > 0 ? (
            <>
              {quizzes.map(quiz => (
                <a
                  key={quiz.id}
                  href={`${CONTENT_ROOT}/quiz-game/${quiz.id}`}
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
              <span>{"No quizzes"}</span>
            </div>
          )}
        </>
      )}
    </Space>
  );
}

export function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDocuments = () => {
    const userId = window.localStorage.getItem("__LARCHIVEUM__USERID");

    if (!userId) return;
    setIsLoading(true);
    DocumentService.getAll({
      filter: JSON.stringify([
        {
          operator: "=",
          key: "userId",
          value: userId
        }
      ])
    })
      .then(res => {
        if (res.status === 200) {
          setDocuments(res.data.data);
        }
      })
      .catch(error => {
        console.log({ error });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadDocuments();
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
          {documents && documents.length > 0 ? (
            <>
              {documents.map(document => (
                <a
                  key={document.id}
                  href={`${CONTENT_ROOT}?document-viewer=${document.id}`}
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
              <span>{"No documents"}</span>
            </div>
          )}
        </>
      )}
    </Space>
  );
}
