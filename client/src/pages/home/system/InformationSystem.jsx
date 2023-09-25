import { Box, Grid, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import StatisticService from "src/services/StatisticService";
import request from "src/utils/request";
import useSWR from "swr";

const InformationSystemPage = () => {

  const [version, setVersion] = useState("1.0.0");
  const { data: capacity, mutate } = useSWR(`/auth/statistic`, (url) => {
    return request
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("__LARCHIVEUM__COOKIES")}`,
        },
      })
      .then((res) => res.data.data);
  });

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

  const hubVersion = capacity?.version;
  const sceneUsage = formatFileSize(capacity?.scene);
  const avatarUsage = formatFileSize(capacity?.avatar);
  const projectUsage = formatFileSize(capacity?.project);

  return (
    <Grid container spacing={2}>
      {/* justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }} */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box
          sx={{
            width: 128,
            height: 64,
            position: "relative",
            marginTop: 4,
            marginBottom: 6, 
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{
              objectFit: "contain",
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        {
          capacity && <><Typography variant="body1">Version: {hubVersion}</Typography>
          <Typography variant="body1">Avatar Usage: {avatarUsage}</Typography>
          <Typography variant="body1">Scene Usage: {sceneUsage}</Typography>
          <Typography variant="body1">Project Resource Usage: {projectUsage}</Typography></>
        }
      </Grid>
    </Grid>
  );
};

export default InformationSystemPage;
