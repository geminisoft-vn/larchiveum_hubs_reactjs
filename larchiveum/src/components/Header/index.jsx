/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Container, Divider, Stack } from "@mui/material";

import logo from "src/assets/images/larchiveum_logo.png";
import { Button, Select, Typography } from "src/components";
import { getLanguage, setLanguage } from "src/language";

import Store from "../../utilities/store";

import "./Header.scss";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getLanguage());
  const user = Store.getUser();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const page = new URL(window.location.href).searchParams.get("page");
    setPage(page);
  }, []);

  useLayoutEffect(() => {
    setLanguage(language);
  }, [language]);

  function checkCredentials() {
    if (
      window?.APP?.store?.state?.credentials?.email &&
      window?.APP?.store?.state?.credentials?.token
    ) {
      return true;
    }
    return false;
  }

  function handleChangeLanguage(e) {
    setLanguage(e.target.value);
  }

  const handleSignOut = () => {
    Store.removeUser();
    navigate("/home/app");
  };

  const btns = [
    {
      key: "content",
      label: t("_header.TAB_CONTENT_LABEL"),
      onClick: () => navigate("/home/content"),
      requiredUserType: 4,
    },

    {
      key: "content",
      label: t("_header.TAB_ROOM_LABEL"),
      onClick: () => navigate("/home/content"),
      requiredUserType: 4,
    },

    {
      key: "content",
      label: t("_header.TAB_SPOKE_LABEL"),
      onClick: () =>
        navigate(`/home/${checkCredentials() ? "spoke" : "signin"}`),
      requiredUserType: 4,
    },

    {
      key: "content",
      label: t("_header.TAB_ADMIN_LABEL"),
      onClick: () =>
        navigate(`/home/${checkCredentials() ? "admin" : "signin"}`),
      requiredUserType: 5,
    },

    {
      key: "content",
      label: t("home.PROFILE"),
      onClick: () => navigate("/home/profile"),
      requiredUserType: 0,
    },
  ];

  return (
    <Box
      style={{
        height: "100%",
        width: "100%",

        borderBottom: "1px solid #c4c4c4",

        padding: "16px",
      }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}>
        <a href="/" style={{ float: "left", height: "100%" }}>
          <img src={logo} alt="logo" style={{ height: "60px" }} />
        </a>
        <Stack
          direction="row"
          alignItems="center"
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}>
          {btns &&
            btns.length > 0 &&
            btns.map((btn) => {
              return (
                user.type >= btn.requiredUserType && (
                  <Button key={btn.key} onClick={btn.onClick}>
                    {btn.label}
                  </Button>
                )
              );
            })}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Select
            value={language}
            onChange={handleChangeLanguage}
            options={[
              {
                value: "en",
                label: "English",
              },
              {
                value: "ko",
                label: "Korea",
              },
            ]}
          />
          {user ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>{user?.displayName || user?.email}</Typography>
              <Divider orientation="vertical" />
              <Button type="link" onClick={handleSignOut}>
                {"Logout"}
              </Button>
            </Stack>
          ) : (
            <>
              <a href="/signin" className="signin-up">
                Sign in / Sign up
              </a>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
