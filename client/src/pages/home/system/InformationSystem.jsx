import {
  Box,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { Loader } from "src/components/loader";
import StatisticService from "src/services/StatisticService";
import request from "src/utils/request";
import useSWR from "swr";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const InformationSystemPage = () => {

  const { t } = useTranslation();
  const { data: capacity, mutate, isLoading } = useSWR(
    `/auth/statistic`,
    (url) => {
      return request
        .get(url, {
          headers: {
            Authorization: `Bearer ${Cookies.get("__LARCHIVEUM__COOKIES")}`,
          },
        })
        .then((res) => res.data.data);
    }
  );

  function formatFileSize(bytes) {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }

  const totalUsage =
    capacity?.scene + capacity?.document + capacity?.avatar + capacity?.project;

  const data = [
    {
      value: capacity?.avatar / (1024 * 1024 * 1024),
      label: t("SYSTEM.avatar"),
      color: "#354a5f",
    },
    {
      value: capacity?.scene / (1024 * 1024 * 1024),
      label: t("SYSTEM.scene"),
      color: "#1dad94",
    },
    {
      value: capacity?.document / (1024 * 1024 * 1024),
      label: t("SYSTEM.document"),
      color: "#11a3dd",
    },
    {
      value: capacity?.project / (1024 * 1024 * 1024),
      label: t("SYSTEM.project"),
      color: "#f8b32e",
    },
  ];

  const size = {
    width: 500,
    height: 250,
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
  }));

  const PieCenterLabel = ({ children }) => {
    const { width, height, left, top } = useDrawingArea();
    return (
      <>
        <StyledText
          x={left + width / 2}
          y={top + height / 2}
          fontSize={24}
          fontWeight="bold"
        >
          {children.split(" ")[0]}
        </StyledText>
        <StyledText
          x={left + width / 2}
          y={top + height / 2 + 20}
          fontSize={14}
        >
          {children.split(" ")[1]}
        </StyledText>
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      {/* justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }} */}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Box
          sx={{
            width: 128,
            height: 64,
            position: "relative",
            marginTop: 4,
            marginBottom: 0,
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        {!isLoading && capacity && (
          <>
            <Typography variant="body1" style={{ marginBottom: "40px" }}>
              Version: {capacity?.version}
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Divider textAlign="left">
                {/* <Typography variant="subtitle1" gutterBottom>
                  Usage
                </Typography> */}
                <Chip label={t("SYSTEM.usage")} variant="outlined" />
              </Divider>
              <PieChart series={[{ data, innerRadius: 60 }]} {...size}>
                <PieCenterLabel>{formatFileSize(totalUsage)}</PieCenterLabel>
              </PieChart>
            </Paper>
          </>
        )}
        {isLoading && <Loader />}{" "}
      </Grid>
    </Grid>
  );
};

export default InformationSystemPage;
