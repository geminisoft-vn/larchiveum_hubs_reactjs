/* eslint-disable no-unused-vars */
import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Collapse } from "antd";
import { ContentsSidebar, QuizList, DocumentList } from "./ContentsSidebar";

const { Panel } = Collapse;

export function ContentsSidebarContainer({ onClose }) {
  return (
    <ContentsSidebar onClose={onClose}>
      <Collapse defaultActiveKey={["1"]} style={{ borderRadius: "0px" }}>
        <Panel header="Quizs" key="1" style={{ borderRadius: "0px" }}>
          <QuizList />
        </Panel>
        <Panel header="Documents" key="2" style={{ borderRadius: "0px" }}>
          <DocumentList />
        </Panel>
        <Panel header="Maps" key="3" style={{ borderRadius: "0px" }}>
          <p>{"Comming soon"}</p>
        </Panel>
      </Collapse>
    </ContentsSidebar>
  );
}

ContentsSidebarContainer.propTypes = {
  onClose: PropTypes.func
};
