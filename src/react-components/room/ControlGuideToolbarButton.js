import React, { forwardRef } from "react";
import { ReactComponent as AvatarIcon } from "../icons/Help.svg";
import { ToolbarButton } from "../input/ToolbarButton";
import { FormattedMessage } from "react-intl";

export function ControlGuideToolbarButton(props) {
  return (
    <ToolbarButton
      {...props}
      icon={<AvatarIcon />}
      preset="accent2"
      label={<FormattedMessage id="control-guide-button" defaultMessage="Control Guide" />}
    />
  );
}