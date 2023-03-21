import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import { Card, Layout, Menu } from "antd";

import { Header } from "src/components";

import Sidebar from "./components/Sidebar";

import "./ContentPage.scss";

const { Content, Sider } = Layout;

const ContentPage = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState();

  const sidebarMenuItems = [
    {
      key: "quiz",
      label: t("content.LEFT_MENU__QUIZ_LABEL"),
      onClick: () => {
        setTab("quiz");
      },
    },
    {
      key: "document",
      label: t("content.LEFT_MENU__DOCUMENT_LABEL"),
      onClick: () => {
        setTab("document");
      },
    },
    {
      key: "map",
      label: t("content.LEFT_MENU__MAP_LABEL"),
      onClick: () => {
        setTab("map");
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item lg={2} xl={2}>
        <Sidebar items={sidebarMenuItems} selectedTab={tab} />
      </Grid>
      <Grid item lg={10} xl={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default ContentPage;
