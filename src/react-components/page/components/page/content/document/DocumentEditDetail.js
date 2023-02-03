/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LoadingOutlined, LeftOutlined } from "@ant-design/icons";
import { Layout, Menu, Col, Row, Button, Spin, Empty, Input, Card, Typography } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import DocumentService from "../../../../../../utilities/apiServices/DocumentService";
import MediaService from "../../../../../../utilities/apiServices/MediaService";
import async from "async";
import { setDSN } from "raven-js";

const { Header, Content, Footer, Sider } = Layout;

export default function(props) {
  const { t } = useTranslation();
  const { documentId, onBack } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSaveDocumentSubmiting, setIsSaveDocumentSubmiting] = useState(false);
  const documentRef = useRef({});

  useEffect(
    () => {
      load(documentId);
    },
    [documentId]
  );

  function load(documentId) {
    setIsLoading(true);
    DocumentService.getOne(documentId)
      .then(res => {
        documentRef.current = res.data;
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }

  function onInputChange(e) {
    const { value, name } = e.target;
    documentRef.current[name] = value;
    console.log(documentRef.current);
  }

  function handleSaveDocument() {
    setIsSaveDocumentSubmiting(true);
    DocumentService.update(documentId, documentRef.current)
      .then(res => {
        documentRef.current = res.data;
        setIsSaveDocumentSubmiting(false);
      })
      .catch(error => {
        if (error.response.data?.result == "fail" && error.response.data.error == "invalid_input") {
          showValidateErrors(error.response.data.all);
        }
        setIsSaveDocumentSubmiting(false);
      });
  }

  function onPickFile(callback, value, meta) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    if (meta.filetype == "image") {
      input.setAttribute("accept", "image/*");
    }
    if (meta.filetype == "media") {
      input.setAttribute("accept", "video/*,audio/*");
    }
    input.onchange = function() {
      const file = this.files[0];
      MediaService.upload(file)
        .then(res => {
          callback(res.data, { title: file.name });
        })
        .catch(error => {});
    };
    input.click();
  }

  function showValidateErrors(errors) {
    try {
      const all = JSON.parse(errors);
      setErrors(all);
    } catch (error) {
      console.error(error);
    }
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
              <Button
                type="default"
                className="flex-center"
                style={{ float: "left" }}
                icon={<LeftOutlined />}
                onClick={onBack}
              >
                {t("content.DOCUMENT_TAB__DOCUMENT_EDIT_DETAIL__BACK_BUTTON_LABEL")}
              </Button>
              <Button
                type="primary"
                className="flex-center"
                style={{ float: "right" }}
                onClick={handleSaveDocument}
                loading={isSaveDocumentSubmiting}
              >
                {t("content.DOCUMENT_TAB__DOCUMENT_EDIT_DETAIL__SAVE_BUTTON_LABEL")}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card title={t("content.DOCUMENT_TAB__DOCUMENT_EDIT_DETAIL__PAGE_TITLE")}>
                <Row>
                  <Col span={24}>
                    <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                      {t("content.DOCUMENT_TAB__DOCUMENT_EDIT_DETAIL__TITLE_INPUT_LABEL")}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Input
                      type="text"
                      name="title"
                      placeholder={t("content.DOCUMENT_TAB__DOCUMENT_EDIT_DETAIL__TITLE_INPUT_PLACEHOLDER")}
                      defaultValue={documentRef.current?.title}
                      onChange={onInputChange}
                    />
                    <Typography.Text type="danger">{errors.find(e => e.name == "title")?.message}</Typography.Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                      {t("content.DOCUMENT_TAB__DOCUMENT_EDIT_DETAIL__DESCRIPTION_INPUT_LABEL")}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Input
                      type="text"
                      name="description"
                      placeholder={t("content.DOCUMENT_TAB__DOCUMENT_EDIT_DETAIL__DESCRIPTION_INPUT_PLACEHOLDER")}
                      defaultValue={documentRef.current?.description}
                      onChange={onInputChange}
                    />
                    <Typography.Text type="danger">
                      {errors.find(e => e.name == "description")?.message}
                    </Typography.Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "5px", marginBottom: "20px" }}>
            <Col span={24}>
              <Editor
                apiKey="qzz6w46f7989o76s4onx6qkmpwn9fwz1pz4quj7sek81vbxv"
                onInit={e => {
                  console.log(e, e.target.dom.getRoot(), e.target.dom.getParent());
                }}
                initialValue={documentRef.current.content}
                onChange={e => {
                  onInputChange({ target: { name: "content", value: e.target.getBody().innerHTML } });
                }}
                init={{
                  height: 400,
                  menubar: true,
                  file_picker_callback: onPickFile,
                  plugins: [
                    "a11ychecker",
                    "advlist",
                    "advcode",
                    "advtable",
                    "autolink",
                    "checklist",
                    "export",
                    "lists",
                    "link",
                    "image",
                    "media",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "powerpaste",
                    "fullscreen",
                    "formatpainter",
                    "insertdatetime",
                    "table",
                    "help",
                    "wordcount"
                  ],
                  toolbar:
                    "undo redo | casechange blocks | bold italic backcolor | image media file | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist checklist outdent indent | removeformat | code table help"
                }}
              />
            </Col>
          </Row>
        </>
      )}
    </Content>
  );
}
