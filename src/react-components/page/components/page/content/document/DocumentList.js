/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LoadingOutlined, EyeOutlined, DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu, Col, Row, Button, Spin, Empty, Card } from "antd";
import Store from "../../../../../../utilities/store";
import { CONTENT_ROOT } from "../../../../../../utilities/constants";
//import PopupCreateDocument from "./PopupCreateDocument";
import DocumentService from "../../../../../../utilities/apiServices/DocumentService";

const { Header, Content, Footer, Sider } = Layout;

export default function(props) {
  const { t } = useTranslation();
  const { onOpenDocumentDetail } = props;
  const [isOpenPopupCreate, setIsOpenPopupCreate] = useState(false);
  const [deletingDocumentId, setDeletingDocumentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listDocument, setListDocument] = useState([]);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setIsLoading(true);
    DocumentService.getAll({
      sort: "-createdAt"
    })
      .then(res => {
        const documents = res.data.items;
        setListDocument(documents);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }

  function handleOpenPopupCreate() {
    console.log(isOpenPopupCreate);
    setIsOpenPopupCreate(true);
  }

  function handleDeleteDocument(documentId) {
    setDeletingDocumentId(documentId);
    DocumentService.delete(documentId)
      .then(document => {
        setListDocument(listDocument.filter(q => q.id != documentId));
        setDeletingDocumentId(null);
      })
      .catch(error => {
        setDeletingDocumentId(null);
      });
  }

  function handleGotoViewDocument(documentId) {
    window.open(CONTENT_ROOT + "/document?id=" + documentId);
  }

  return (
    <Content style={{ margin: "0 16px" }}>
      {isLoading ? (
        <div
          style={{
            height: "100%",
            minHeight: "300px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
        </div>
      ) : (
        <>
          <Row>
            <Col span={24} style={{ padding: "10px 0px" }}>
              <Button type="primary" style={{ float: "right" }} onClick={handleOpenPopupCreate}>
                {"+ " + t("content.DOCUMENT_TAB__DOCUMENT_LIST__DOCUMENT_TAB__ADD_DOCUMENT_BUTTON_LABEL")}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {/* {1 + 1 == 2 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: "100px" }} />
              ) : (
                <>
                  <Card key={1} style={{ marginBottom: "20px" }}>
                    <Row>
                      <Col span={18}>
                        <Row style={{ height: "30px", fontWeight: "bold" }}>
                          <Col span={24}>{"Test"}</Col>
                        </Row>
                        <Row>
                          <Col span={24} style={{ fontSize: "0.9em", color: "#aaaaaa" }}>
                            {"description"}
                          </Col>
                        </Row>
                      </Col>
                      <Col span={6} style={{ justifyContent: "right", alignItems: "center", display: "flex" }}>
                        <Button
                          type="default"
                          className="flex-center"
                          style={{ marginLeft: "10px" }}
                          icon={<EyeOutlined />}
                          onClick={() => {
                            handleGotoViewDocument(document.id);
                          }}
                        >
                          {t("content.DOCUMENT_TAB__DOCUMENT_LIST__PREVIEW_BUTTON_LABEL")}
                        </Button>
                        <Button
                          type="primary"
                          className="flex-center"
                          style={{ marginLeft: "10px" }}
                          icon={<UnorderedListOutlined />}
                          onClick={() => {
                            onOpenDocumentDetail(document);
                          }}
                        >
                          {t("content.DOCUMENT_TAB__DOCUMENT_LIST__DETAIL_BUTTON_LABEL")}
                        </Button>
                        <Button
                          type="primary"
                          className="flex-center"
                          danger
                          style={{ marginLeft: "10px" }}
                          icon={<DeleteOutlined />}
                          loading={deletingDocumentId == document.id}
                          onClick={() => {
                            handleDeleteDocument(document.id);
                          }}
                        >
                          {t("content.DOCUMENT_TAB__DOCUMENT_LIST__DELETE_BUTTON_LABEL")}
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                  {listDocument.map(document => {
                    return (
                      <Card key={document.id} style={{ marginBottom: "20px" }}>
                        <Row>
                          <Col span={18}>
                            <Row style={{ height: "30px", fontWeight: "bold" }}>
                              <Col span={24}>{document.title}</Col>
                            </Row>
                            <Row>
                              <Col span={24} style={{ fontSize: "0.9em", color: "#aaaaaa" }}>
                                {document.description}
                              </Col>
                            </Row>
                          </Col>
                          <Col span={6} style={{ justifyContent: "right", alignItems: "center", display: "flex" }}>
                            <Button
                              type="default"
                              className="flex-center"
                              style={{ marginLeft: "10px" }}
                              icon={<EyeOutlined />}
                              onClick={() => {
                                handleGotoViewDocument(document.id);
                              }}
                            >
                              {t("content.DOCUMENT_TAB__DOCUMENT_LIST__PREVIEW_BUTTON_LABEL")}
                            </Button>
                            <Button
                              type="primary"
                              className="flex-center"
                              style={{ marginLeft: "10px" }}
                              icon={<UnorderedListOutlined />}
                              onClick={() => {
                                onOpenDocumentDetail(document);
                              }}
                            >
                              {t("content.DOCUMENT_TAB__DOCUMENT_LIST__DETAIL_BUTTON_LABEL")}
                            </Button>
                            <Button
                              type="primary"
                              className="flex-center"
                              danger
                              style={{ marginLeft: "10px" }}
                              icon={<DeleteOutlined />}
                              loading={deletingDocumentId == document.id}
                              onClick={() => {
                                handleDeleteDocument(document.id);
                              }}
                            >
                              {t("content.DOCUMENT_TAB__DOCUMENT_LIST__DELETE_BUTTON_LABEL")}
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </>
              )} */}
              <>
                <Card key={1} style={{ marginBottom: "20px" }}>
                  <Row>
                    <Col span={18}>
                      <Row style={{ height: "30px", fontWeight: "bold" }}>
                        <Col span={24}>{"Test"}</Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ fontSize: "0.9em", color: "#aaaaaa" }}>
                          {"description"}
                        </Col>
                      </Row>
                    </Col>
                    <Col span={6} style={{ justifyContent: "right", alignItems: "center", display: "flex" }}>
                      <Button
                        type="default"
                        className="flex-center"
                        style={{ marginLeft: "10px" }}
                        icon={<EyeOutlined />}
                        onClick={() => {
                          handleGotoViewDocument(document.id);
                        }}
                      >
                        {t("content.DOCUMENT_TAB__DOCUMENT_LIST__PREVIEW_BUTTON_LABEL")}
                      </Button>
                      <Button
                        type="primary"
                        className="flex-center"
                        style={{ marginLeft: "10px" }}
                        icon={<UnorderedListOutlined />}
                        onClick={() => {
                          onOpenDocumentDetail(document);
                        }}
                      >
                        {t("content.DOCUMENT_TAB__DOCUMENT_LIST__DETAIL_BUTTON_LABEL")}
                      </Button>
                      <Button
                        type="primary"
                        className="flex-center"
                        danger
                        style={{ marginLeft: "10px" }}
                        icon={<DeleteOutlined />}
                        loading={false}
                        onClick={() => {
                          handleDeleteDocument(document.id);
                        }}
                      >
                        {t("content.DOCUMENT_TAB__DOCUMENT_LIST__DELETE_BUTTON_LABEL")}
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </>
            </Col>
          </Row>
        </>
      )}
      {/* {isOpenPopupCreate && (
        <PopupCreateDocument
          setVisiable={setIsOpenPopupCreate}
          onComplete={() => {
            load();
          }}
        />
      )} */}
    </Content>
  );
}
