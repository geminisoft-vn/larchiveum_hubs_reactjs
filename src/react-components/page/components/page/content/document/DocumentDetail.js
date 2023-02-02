/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { LoadingOutlined, LeftOutlined } from "@ant-design/icons";
import { Layout, Menu, Col, Row, Button, Spin, Empty, Input, Card } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import DocumentService from "../../../../../../utilities/apiServices/DocumentService";
import MediaService from "../../../../../../utilities/apiServices/MediaService";
import async from "async";

const { Header, Content, Footer, Sider } = Layout;

export default function(props) {
  const { t } = useTranslation();
  const MAX_QUESTION = 10;
  const { documentId, onBack } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveDocumentSubmiting, setIsSaveDocumentSubmiting] = useState(false);
  const [isAddQuestionSubmiting, setIsAddQuestionSubmiting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const documentRef = useRef({});
  const editorRef = useRef();

  useEffect(
    () => {
      load(documentId);
    },
    [documentId]
  );

  function load(documentId) {
    setIsLoading(true);
    async.parallel(
      [
        function(next) {
          DocumentService.getOne(documentId)
            .then(res => {
              return next(null, res.data);
            })
            .catch(error => {
              return next(error);
            });
        }
      ],
      function(error, [documentData, questionsData]) {
        documentRef.current = documentData;
        console.log(questions);
        setQuestions(questionsData);
        setIsLoading(false);
      }
    );
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
        setIsSaveDocumentSubmiting(false);
      });
  }

  function onDeleteQuestion(question) {
    setQuestions(questions.filter(q => q.id != question.id));
  }

  function onPickFile(callback, value, meta) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = function() {
      const file = this.files[0];
      MediaService.upload(file)
        .then(res => {
          callback(res.data, { title: file.name });
        })
        .catch(error => {
          console.log(error);
        });
    };
    input.click();
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
                {t("content.QUIZ_TAB__QUIZ_DETAIL__BACK_BUTTON_LABEL")}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card title={t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DETAIL__QUIZ_DETAIL_LABEL")}>
                <Row>
                  <Col span={24}>
                    <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                      {t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DETAIL__QUIZ_TITLE_INPUT_LABEL")}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Input
                      type="text"
                      name="title"
                      placeholder={t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_TITLE_INPUT_PLACEHOLDER")}
                      defaultValue={documentRef.current?.title}
                      onChange={onInputChange}
                      onBlur={handleSaveDocument}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label style={{ fontSize: "14px", margin: "10px 0px" }}>
                      {t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_LABEL")}
                    </label>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Input
                      type="text"
                      name="description"
                      placeholder={t("content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_PLACEHOLDER")}
                      defaultValue={documentRef.current?.description}
                      onChange={onInputChange}
                      onBlur={handleSaveDocument}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "5px" }}>
            <Col span={24}>
              <Editor
                apiKey="qzz6w46f7989o76s4onx6qkmpwn9fwz1pz4quj7sek81vbxv"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 500,
                  menubar: false,
                  images_upload_url: "postAcceptor.php",
                  automatic_uploads: false,
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
                    "media",
                    "table",
                    "help",
                    "wordcount"
                  ],
                  toolbar:
                    "undo redo | casechange blocks | bold italic backcolor | image | media | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help"
                }}
              />
            </Col>
          </Row>
        </>
      )}
    </Content>
  );
}
