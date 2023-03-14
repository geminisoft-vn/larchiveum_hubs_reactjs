import React, { useEffect, useState } from "react";

import QuizComponent from "src/@larchiveum/pages/Content/components/quiz/Quiz";
import DocumentComponent from "src/@larchiveum/pages/Content/components/document/Document";
import "reactjs-popup/dist/index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { Header } from "src/@larchiveum/components";
import { Layout, Menu, Card } from "antd";
import "./ContentPage.scss";

const { Content, Sider } = Layout;

const ContentPage = () => {
  toast.configure();
  const { t } = useTranslation();
  const [tab, setTab] = useState();

  function switchTab(tab) {
    window.location.href = "/?page=content&tab=" + tab;
  }

  useEffect(() => {
    const paramTab = new URL(location.href).searchParams.get("tab") || "quiz";
    setTab(paramTab);
  }, []);

  return (
    <div className="manager-page">
      <Header />
      <div className="row_2">
        <Layout style={{ minHeight: "80vh", marginTop: "30px", background: "white" }}>
          <Sider
            className="fixed-menu"
            style={{
              background: "white",
              borderInlineEnd: "none"
            }}
          >
            <Card style={{ height: "80vh" }} bodyStyle={{ padding: "10px" }}>
              <Menu
                mode="inline"
                items={[
                  {
                    className: tab == "quiz" ? "selected" : "",
                    key: "quiz",
                    label: t("content.LEFT_MENU__QUIZ_LABEL"),
                    onClick: () => {
                      switchTab("quiz");
                    }
                  },
                  {
                    className: tab == "document" ? "selected" : "",
                    key: "document",
                    label: t("content.LEFT_MENU__DOCUMENT_LABEL"),
                    onClick: () => {
                      switchTab("document");
                    }
                  },
                  {
                    className: tab == "map" ? "selected" : "",
                    key: "map",
                    label: t("content.LEFT_MENU__MAP_LABEL"),
                    onClick: () => {
                      switchTab("map");
                    }
                  }
                ]}
                style={{ background: "white" }}
              />
            </Card>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: "30px", background: "white" }}>
            {tab == "quiz" && <QuizComponent />}
            {tab == "document" && <DocumentComponent />}
            {tab == "map" && (
              <Content style={{ margin: "0 16px" }}>
                <div style={{ padding: 24, minHeight: 360 }}>Map</div>
              </Content>
            )}
          </Layout>
        </Layout>
      </div>
    </div>
  );
};

export default ContentPage;
