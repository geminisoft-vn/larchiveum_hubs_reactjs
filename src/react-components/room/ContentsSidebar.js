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
      title={<FormattedMessage id="contents-sidebar.title" defaultMessage="Contents" />}
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
  const [quizs, setQuizs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    filter: JSON.stringify([
      {
        operator: "=",
        key: "createdBy",
        value: Store.getUser()?.id
      }
    ])
  });

  useEffect(() => {
    setIsLoading(true);
    QuizService.getAll(params)
      .then(res => {
        setQuizs(res.data.items);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }, []);

  function generateQuizUrl(quiz) {
    const url = new URL(CONTENT_ROOT + "/quiz");
    url.searchParams.append("id", quiz.id);
    url.searchParams.append("title", quiz.title);
    return url.href;
  }

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
          {quizs?.length > 0 ? (
            <>
              {quizs?.map(quiz => (
                <a
                  key={quiz.id}
                  href={generateQuizUrl(quiz)}
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#aaaaaa" }}>
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
  const [params, setParams] = useState({
    filter: JSON.stringify([
      {
        operator: "=",
        key: "createdBy",
        value: Store.getUser()?.id
      }
    ])
  });

  useEffect(() => {
    setIsLoading(true);
    DocumentService.getAll(params)
      .then(res => {
        setdocuments(res.data.items);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }, []);

  function generateDocumentUrl(document) {
    const url = new URL(CONTENT_ROOT + "/document");
    url.searchParams.append("id", document.id);
    url.searchParams.append("title", document.title);
    return url.href;
  }

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
                  href={generateDocumentUrl(document)}
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#aaaaaa" }}>
              <span>{"No document"}</span>
            </div>
          )}
        </>
      )}
    </Space>
  );
}
