import * as React from "react";

import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";


import {
  Box,
  Stack,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { green, blue, yellow, indigo } from "@mui/material/colors";

import { Link } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default function RoomCard({
  room,
  handleTogglePublic,
  handleCloseRoom,
  handleOpenRoom,
}) {
  const {
    name,
    roomId,
    hubSceneThumbnailUrl,
    closed,
    startDate,
    endDate,
    public: isPublic,
    reservationCount,
    maxSize,
  } = room;

  const { t } = useTranslation();

  return (
    <Paper elevation={4} sx={{ p: 2, minHeight: 256 }}>
      <Grid container spacing={1}>
        <Grid item lg={6} md={6}>
          <Box
            sx={{
              height: '100%',
              width: "100%",
            }}
          >
            <img
              alt=""
              src={hubSceneThumbnailUrl}
              style={{
                height: '100%',
                width: '100%',

                objectFit: "cover",

                borderRadius: 16,
              }}
            />
          </Box>
        </Grid>
        <Grid item lg={6} md={6}>
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Stack direction="column" alignItems="flex-start">
              <Typography noWrap variant="h4" sx={{ alignSelf: "center" }}>
                {name}
              </Typography>
              <Link
                to={`${import.meta.env.VITE_APP_ROOT}/${roomId}`}
                target="_blank"
              >
                <Button
                  startIcon={<LinkRoundedIcon />}
                  sx={{ textTransform: "none" }}
                >
                  {import.meta.env.VITE_APP_ROOT}/{roomId}
                </Button>
              </Link>
              <Button startIcon={<CalendarMonthRoundedIcon />} disabled>
                {startDate ? moment(startDate).format("DD/MM/YYYY") : "Not Set"}{" "}
                ~ {endDate ? moment(endDate).format("DD/MM/YYYY") : "Not Set"}
              </Button>
              <Button startIcon={<GroupRoundedIcon />} disabled>
                {reservationCount}/{maxSize}
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    checked={isPublic}
                    onChange={(e) => handleTogglePublic(room.id, isPublic)}
                    color="info"
                  />
                }
                label={t('LABEL.public')}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Link to={`/home/room-form/${room.id}`}>
                <Button
                  variant="contained"
                  sx={{
                    background: yellow[700],
                    "&.MuiButtonBase-root:hover": {
                      background: yellow[900],
                    },
                  }}
                >
                  {t('BUTTON.edit')}
                </Button>
              </Link>
              {closed ? (
                <Button
                  variant="contained"
                  sx={{
                    background: green[700],
                    "&.MuiButtonBase-root:hover": {
                      background: green[900],
                    },
                  }}
                  onClick={() => handleOpenRoom(room.id)}
                >
                  {t('BUTTON.open')}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleCloseRoom(room.id)}
                  sx={{
                    background: indigo[700],
                    "&.MuiButtonBase-root:hover": {
                      background: indigo[900],
                    },
                  }}
                >
                  {t('BUTTON.close')}
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
