/* eslint-disable no-unused-vars */
import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Breadcrumb, Layout, Menu, Col, Row, Button, Card, Space, Collapse } from "antd";
import { ContentsSidebar, QuizList } from "./ContentsSidebar";
import { List } from "../layout/List";
import { useContentList } from "./useContentList";

const { Panel } = Collapse;

export function ContentsSidebarContainer({ onClose, hubChannel }) {
  const quizs = [
    {
      id: 1,
      title: "Quiz1"
    }
  ];

  // const listRef = useRef();
  //const { objects, selectedObject, selectObject, unfocusObject, focusObject } = useContentList();

  // const onUnfocusListItem = useCallback(
  //   e => {
  //     if (e.relatedTarget === listRef.current || !listRef.current.contains(e.relatedTarget)) {
  //       unfocusObject();
  //     }
  //   },
  //   [unfocusObject, listRef]
  // );

  return (
    <ContentsSidebar>
      <Collapse defaultActiveKey={["1"]} style={{ borderRadius: "0px" }}>
        <Panel header="Quizs" key="1" style={{ borderRadius: "0px" }}>
          <QuizList />
        </Panel>
        <Panel header="Documents" key="2" style={{ borderRadius: "0px" }}>
          <p>{"Comming soon"}</p>
        </Panel>
        <Panel header="Maps" key="3" style={{ borderRadius: "0px" }}>
          <p>{"Comming soon"}</p>
        </Panel>
      </Collapse>
    </ContentsSidebar>
  );
}

ContentsSidebarContainer.propTypes = {
  hubChannel: PropTypes.object.isRequired,
  onClose: PropTypes.func
};
