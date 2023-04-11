/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../input/CloseButton";
import styles from "./QuizContentModal.scss";
import { Column } from "../layout/Column";
import { FormattedMessage } from "react-intl";

export function QuizContentModal({ className, quizUrl, closeable, onClose }) {
  return (
    <Modal
      className={classNames(styles.quizModal, className)}
      disableFullscreen
      title={<FormattedMessage id="quiz-modal.title" defaultMessage="Quiz" />}
      beforeTitle={closeable && <CloseButton onClick={onClose} />}
    >
      <Column center className={styles.content}>
        <iframe height={"100%"} width={"100%"} src={quizUrl} frameBorder={0} />
      </Column>
    </Modal>
  );
}

QuizContentModal.propTypes = {
  quizUrl: PropTypes.string,
  className: PropTypes.string,
  closeable: PropTypes.bool,
  onClose: PropTypes.func
};

QuizContentModal.defaultProps = {};
