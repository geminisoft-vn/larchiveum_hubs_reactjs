/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Menu, Col, Row, Button, Spin, Empty } from "antd";
import DocumentList from "./DocumentList";
import DocumentCreateDetail from "./DocumentCreateDetail";
import DocumentEditDetail from "./DocumentEditDetail";

const { Header, Content, Footer, Sider } = Layout;

export default function(props) {
  const { t } = useTranslation();
  const [isVisiableDocumentCreateDetail, setIsVisiableDocumentCreateDetail] = useState(false);
  const [isVisiableDocumentEditDetail, setIsVisiableDocumentEditDetail] = useState(false);
  const [document, setDocument] = useState(null);

  const handleOpenDocumentCreateDetail = function() {
    setIsVisiableDocumentCreateDetail(true);
  };

  const handleOpenDocumentEditDetail = function(document) {
    setDocument(document);
    setIsVisiableDocumentEditDetail(true);
  };

  const handleBackToDocumentList = function() {
    setIsVisiableDocumentCreateDetail(false);
    setIsVisiableDocumentEditDetail(false);
    setDocument(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <Row>
        <Col span={24} style={{ padding: "10px 0px" }}>
          <Button type="primary" style={{ float: "right" }} onClick={handleOpenDocumentCreateDetail}>
            {"+ " + t("content.DOCUMENT_TAB__DOCUMENT_LIST__DOCUMENT_TAB__ADD_DOCUMENT_BUTTON_LABEL")}
          </Button>
        </Col>
      </Row>
      {!isVisiableDocumentCreateDetail &&
        !isVisiableDocumentEditDetail && <DocumentList onOpenDocumentEditDetail={handleOpenDocumentEditDetail} />}
      {isVisiableDocumentCreateDetail && (
        <div style={{ position: "absolute", top: 0, background: "white", width: "100%" }}>
          <DocumentCreateDetail onBack={handleBackToDocumentList} />
        </div>
      )}
      {isVisiableDocumentEditDetail && (
        <div style={{ position: "absolute", top: 0, background: "white", width: "100%" }}>
          <DocumentEditDetail documentId={document.id} onBack={handleBackToDocumentList} />
        </div>
      )}
    </div>
  );
}
