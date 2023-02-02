/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Menu, Col, Row, Button, Spin, Empty } from "antd";
import DocumentList from "./DocumentList";
import DocumentDetail from "./DocumentDetail";

const { Header, Content, Footer, Sider } = Layout;

export default function(props) {
  const { t } = useTranslation();
  const [isVisiableDocumentDetail, setIsVisiableDocumentDetail] = useState(false);
  const [document, setDocument] = useState(null);

  const handleOpenDocumentDetail = function(document) {
    setDocument(document);
    setIsVisiableDocumentDetail(true);
    console.log("Open Document: ", document);
  };

  const handleBackToDocumentList = function() {
    setIsVisiableDocumentDetail(false);
    setDocument(null);
  };

  return (
    <div style={{ position: "relative" }}>
      {!isVisiableDocumentDetail && <DocumentList onOpenDocumentDetail={handleOpenDocumentDetail} />}
      {isVisiableDocumentDetail && (
        <div style={{ position: "absolute", top: 0, background: "white", width: "100%" }}>
          <DocumentDetail documentId={document.id} onBack={handleBackToDocumentList} />
        </div>
      )}
    </div>
  );
}
