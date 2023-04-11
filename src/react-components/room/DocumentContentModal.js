/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../input/CloseButton";
import styles from "./DocumentContentModal.scss";
import { Column } from "../layout/Column";
import { FormattedMessage } from "react-intl";

export function DocumentContentModal({ className, documentUrl, closeable, onClose }) {
  return (
    <Modal
      className={classNames(styles.documentModal, className)}
      disableFullscreen
      title={<FormattedMessage id="document-modal.title" defaultMessage="Document" />}
      beforeTitle={closeable && <CloseButton onClick={onClose} />}
    >
      <Column center className={styles.content}>
        <iframe height={"100%"} width={"100%"} src={documentUrl} frameBorder={0} />
      </Column>
    </Modal>
  );
}

DocumentContentModal.propTypes = {
  documentUrl: PropTypes.string,
  className: PropTypes.string,
  closeable: PropTypes.bool,
  onClose: PropTypes.func
};

DocumentContentModal.defaultProps = {};
