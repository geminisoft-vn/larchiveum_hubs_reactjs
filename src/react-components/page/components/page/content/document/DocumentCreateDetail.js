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
import UploadFileModal from "./UploadFileModal";
import { Editor } from "@tinymce/tinymce-react";
import validator from "../../../../../../utilities/validator";
import DocumentService from "../../../../../../utilities/apiServices/DocumentService";
import MediaService from "../../../../../../utilities/apiServices/MediaService";
import { tinyApp } from "../../../../../../utilities/constants";

const { Header, Content, Footer, Sider } = Layout;

export default function(props) {
  const { t } = useTranslation();
  toast.configure();
  const { onBack } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isSaveDocumentSubmiting, setIsSaveDocumentSubmiting] = useState(false);
  const documentRef = useRef({});
  const uploadRef = useRef();

  function onInputChange(e) {
    const { value, name } = e.target;
    documentRef.current[name] = value;
  }

  function handleCreateDocument() {
    setIsSaveDocumentSubmiting(true);
    DocumentService.create(documentRef.current)
      .then(res => {
        documentRef.current = res.data;
        setIsSaveDocumentSubmiting(false);
        onBack();
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
      uploadRef.current.upload(file, (error, url) => {
        if (!error) {
          callback(url, { title: file.name });
        }
      });
    };
    input.click();
  }

  function showValidateErrors(errors) {
    try {
      errors = JSON.parse(errors);
    } catch (error) {}
    setErrors(errors);
  }

  function validate(name) {
    const errors = [];
    let isValidated = true;
    if (!validator.validLength(documentRef.current.title, 1, 255)) {
      isValidated = false;
      (!name || name == "title") &&
        errors.push({ name: "title", message: "title must be not empty and length less than 256 characters" });
    }
    if (!validator.validLength(documentRef.current.description, undefined, 255)) {
      isValidated = false;
      (!name || name == "description") &&
        errors.push({ name: "description", message: "description length must be between 1 and 255 characters" });
    }

    showValidateErrors(errors);

    setIsValidated(isValidated);

    return isValidated;
  }

  return (
    <>
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
                  {t("content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__BACK_BUTTON_LABEL")}
                </Button>
                <Button
                  type="primary"
                  className="flex-center"
                  style={{ float: "right" }}
                  onClick={handleCreateDocument}
                  loading={isSaveDocumentSubmiting}
                  disabled={!isValidated}
                >
                  {t("content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__CREATE_BUTTON_LABEL")}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card title={t("content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__PAGE_TITLE")}>
                  <Row>
                    <Col span={24}>
                      <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                        {t("content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__TITLE_INPUT_LABEL")}
                        <span style={{ color: "red" }}>{" *"}</span>
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input
                        type="text"
                        name="title"
                        placeholder={t("content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__TITLE_INPUT_PLACEHOLDER")}
                        defaultValue={documentRef.current?.title}
                        onChange={onInputChange}
                        onBlur={() => {
                          validate("title");
                        }}
                      />
                      <Typography.Text type="danger">{errors.find(e => e.name == "title")?.message}</Typography.Text>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                        {t("content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__DESCRIPTION_INPUT_LABEL")}
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input
                        type="text"
                        name="description"
                        placeholder={t("content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__DESCRIPTION_INPUT_PLACEHOLDER")}
                        defaultValue={documentRef.current?.description}
                        onChange={onInputChange}
                        onBlur={() => {
                          validate("description");
                        }}
                      />
                      <Typography.Text type="danger">
                        {errors.find(e => e.name == "description")?.message}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: "5px", marginBottom: "50px" }}>
              <Col span={24}>
                <Editor
                  apiKey={tinyApp.apiKey}
                  initialValue=""
                  onChange={e => {
                    onInputChange({ target: { name: "content", value: e.target.getBody().innerHTML } });
                  }}
                  onBlur={() => {
                    validate("content");
                  }}
                  init={{
                    min_height: 400,
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
                      "wordcount",
                      "autoresize"
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
      <UploadFileModal ref={uploadRef} />
    </>
  );
}
