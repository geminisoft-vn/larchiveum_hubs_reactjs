import React from "react";
import { useIntl, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { Modal } from "../modal/Modal";
import { CloseButton } from "../input/CloseButton";
import { Column } from "../layout/Column";
import guide_image from "../../assets/images/how_to_hubs.png";

export function ControlGuideModal({onClose }) {
  const intl = useIntl();

  return (
    <Modal
      title={<FormattedMessage id="control-guide-modal.title" defaultMessage="조작방법 안내" />}
      beforeTitle={<CloseButton onClick={onClose} />}
    >
      <Column padding center centerMd="both" grow>
        <img src={guide_image} className='Guide-Image' />
        <p>"간단한 사용법 안내 이미지 입니다"</p>
      </Column>
    </Modal>
  );
}

ControlGuideModal.propTypes = {
  onClose: PropTypes.func
};
