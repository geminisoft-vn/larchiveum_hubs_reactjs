/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal } from "../modal/Modal";
import { Button } from "../input/Button";
import { CloseButton } from "../input/CloseButton";
import { ReactComponent as EnterIcon } from "../icons/Enter.svg";
import { ReactComponent as VRIcon } from "../icons/VR.svg";
import { ReactComponent as ShowIcon } from "../icons/Show.svg";
import { ReactComponent as SettingsIcon } from "../icons/Settings.svg";
import { ReactComponent as HmcLogo } from "../icons/HmcLogo.svg";
import styles from "./DocumentContentModal.scss";
import styleUtils from "../styles/style-utils.scss";
import { useCssBreakpoints } from "react-use-css-breakpoints";
import { Column } from "../layout/Column";
import { FormattedMessage } from "react-intl";
import configs from "../../utils/configs";
import Store from "../../@larchiveum/utilities/store";

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
