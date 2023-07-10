import React from "react";
import className from "classnames";
import PropTypes from "prop-types";
import { joinChildren } from "../misc/joinChildren";
import styles from "./ContentMenu.scss";
import { ReactComponent as ObjectsIcon } from "../icons/Objects.svg";
import { ReactComponent as PeopleIcon } from "../icons/People.svg";
import { FormattedMessage } from "react-intl";

import Store from "../../storage/store";

export function ContentMenuButton({ active, children, ...props }) {
  return (
    <button
      className={className(styles.contentMenuButton, {
        [styles.active]: active
      })}
      {...props}
    >
      {children}
    </button>
  );
}

ContentMenuButton.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool
};

export function ObjectsMenuButton(props) {
  return (
    <ContentMenuButton {...props}>
      <ObjectsIcon />
      <span>
        <FormattedMessage
          id="content-menu.objects-menu-button"
          defaultMessage="Objects"
        />
      </span>
    </ContentMenuButton>
  );
}

export function ContentsMenuButton(props) {
  const store = new Store();

  const { token } = store.state.credentials;

  if (!token) return null;

  return (
    <ContentMenuButton {...props}>
      <ObjectsIcon />
      <span>
        <FormattedMessage
          id="content-menu.contents-menu-button"
          defaultMessage="Contents"
        />
      </span>
    </ContentMenuButton>
  );
}

export function PeopleMenuButton(props) {
  return (
    <ContentMenuButton {...props}>
      <PeopleIcon />
      <span>
        <FormattedMessage
          id="content-menu.people-menu-button"
          defaultMessage="People ({presenceCount})"
          values={{ presenceCount: props.presencecount }}
        />
      </span>
    </ContentMenuButton>
  );
}
PeopleMenuButton.propTypes = {
  presencecount: PropTypes.number
};

export function ContentMenu({ children }) {
  return (
    <div className={styles.contentMenu}>
      {joinChildren(children, () => <div className={styles.separator} />)}
    </div>
  );
}

ContentMenu.propTypes = {
  children: PropTypes.node
};
