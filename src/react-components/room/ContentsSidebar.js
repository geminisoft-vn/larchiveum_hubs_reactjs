/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./ObjectsSidebar.scss";
import { Sidebar } from "../sidebar/Sidebar";
import { CloseButton } from "../input/CloseButton";
import { ButtonListItem } from "../layout/List";
import listStyles from "../layout/List.scss";
// import { ReactComponent as ObjectIcon } from "../icons/Object.svg";
// import { ReactComponent as ImageIcon } from "../icons/Image.svg";
// import { ReactComponent as VideoIcon } from "../icons/Video.svg";
// import { ReactComponent as AudioIcon } from "../icons/Audio.svg";
// import { ReactComponent as TextDocumentIcon } from "../icons/TextDocument.svg";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import Linkify from "react-linkify";
import { LoadingOutlined } from "@ant-design/icons";
import Store from "../../utilities/store";
import { CONTENT_ROOT } from "../../utilities/constants";
import QuizService from "../../utilities/apiServices/QuizService";
import { useState, useEffect } from "react";
import { setLocale } from "../../utils/i18n";
import { Button, Space, Spin } from "antd";
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

  useEffect(() => {
    setIsLoading(true);
    QuizService.getAll()
      .then(res => {
        setQuizs(res.data.items);
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
          {quizs?.map(quiz => (
            <Linkify key={quiz.id} properties={{ target: "_blank", rel: "noopener referrer" }}>
              <a
                href={CONTENT_ROOT + "/quiz?quizId=" + quiz.id + +"&token=" + Store.getAccessToken()}
                target="_blank"
                rel="noopener referrer"
              >
                {quiz.title}
              </a>
            </Linkify>
            // <Button key={quiz.id}>

            // </Button>
          ))}
        </>
      )}
    </Space>
  );
}
