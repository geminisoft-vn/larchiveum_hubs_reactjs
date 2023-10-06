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
// import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

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

  // const totalUsage =
  //   capacity?.scene + capacity?.document + capacity?.avatar + capacity?.project;

  const dataKeys = ["avatar", "scene", "document", "project"];
  const totalUsage = dataKeys.reduce((acc, key) => acc + (capacity?.[key] || 0), 0);
  
  const data = dataKeys.map((key) => ({
    value: (capacity?.[key] || 0) / (1024 * 1024 * 1024),
    rawValue: capacity?.[key] || 0,
    name: t(`SYSTEM.${key}`),
  }));
  
  data.forEach((item, index) => {
    if (index === dataKeys.length - 1) {
      //"document"
      const usedPercentages = data.slice(0, dataKeys.length - 1).map((d) => parseFloat(d.percent));
      item.percent = (100 - usedPercentages.reduce((acc, curr) => acc + curr, 0)).toFixed(2);
    } else {
      item.percent = ((item.rawValue / totalUsage) * 100).toFixed(2);
    }
  });

  const COLORS = ["#354a5f", "#1dad94", "#11a3dd", "#f8b32e"];

  const size = {
    width: 500,
    height: 250,
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
  }));

  const renderCustomLabel = ({ cx, cy, chirldren }) => {
    const fontSize = 24;
    const fontWeight = "bold";
    const lineHeight = fontSize * 1;
    return (
      <g>
        <StyledText
          x={cx}
          y={cy - lineHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight={fontWeight}
        >
          {formatFileSize(totalUsage).split(" ")[0]}
        </StyledText>
        <StyledText
          x={cx}
          y={cy + lineHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize / 2}
        >
          {formatFileSize(totalUsage).split(" ")[1]}
        </StyledText>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) =>
  active && payload && payload.length ? (
    <div
      className="custom-tooltip"
      style={{
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "0px 4px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p className="label">{`${payload[0].name} : ${formatFileSize(payload[0].payload.rawValue)} ~ ${(payload[0].payload.percent)} %`}</p>
    </div>
  ) : null;


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
              <PieChart width={500} height={280}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  align="right"
                  verticalAlign="middle"
                  layout="vertical"
                />
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
