import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import moment from "moment";
import PropTypes from "prop-types";

import Iconify from "src/components/iconify";
//
import SvgColor from "src/components/svg-color";

import RoomCardAction from "./RoomCardAction";

// ----------------------------------------------------------------------

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)"
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),

  backgroundColor: "#fff"
}));

const StyledInfo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  color: theme.palette.text.disabled
}));

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute"
});

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  }
}));
// ----------------------------------------------------------------------

const RoomCard = ({ room, index, handleReservate }) => {
  const {
    hubSceneThumbnailUrl,
    name,
    reservationCount,
    maxSize,
    startDate,
    endDate,
    user,
    public: _public
  } = room;

  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card sx={{ position: "relative" }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: theme => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)"
              }
            })
          }}
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
              ...((latestPostLarge || latestPost) && { display: "none" })
            }}
          />

          <StyledTooltip
            title={
              <Box sx={{ my: 1.5, px: 2.5 }}>
                <Typography variant="subtitle2" noWrap>
                  {user?.username}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {user?.email}
                </Typography>
              </Box>
            }
            arrow
          >
            <StyledAvatar
              alt={name}
              src={
                user?.avatar?.images?.preview?.url ||
                "/assets/images/avatars/avatar_default.jpg"
              }
              sx={{
                ...((latestPostLarge || latestPost) && {
                  zIndex: 9,
                  top: 24,
                  left: 24,
                  width: 40,
                  height: 40
                })
              }}
            />
          </StyledTooltip>

          <StyledCover alt={name} src={hubSceneThumbnailUrl} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute"
            })
          }}
        >
          {(startDate || endDate) && (
            <Typography
              gutterBottom
              noWrap
              variant="caption"
              sx={{ color: "text.disabled", display: "block" }}
            >
              {startDate ? moment(startDate).format("DD/MM/YYYY") : null} ~{" "}
              {endDate ? moment(endDate).format("DD/MM/YYYY") : null}
            </Typography>
          )}

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="h5"
              color="inherit"
              underline="hover"
              noWrap
              sx={{
                ...(latestPostLarge && { typography: "h4" }),
                ...((latestPostLarge || latestPost) && {
                  color: "common.white"
                })
              }}
            >
              {name}
            </Typography>
            {_public ? (
              <PublicRoundedIcon
                sx={{
                  color: "#000",
                  ...((latestPostLarge || latestPost) && {
                    color: "#fff"
                  })
                }}
              />
            ) : (
              <SecurityRoundedIcon
                sx={{
                  color: "#000",
                  ...((latestPostLarge || latestPost) && {
                    color: "#fff"
                  })
                }}
              />
            )}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              marginTop: 2
            }}
          >
            <RoomCardAction room={room} handleReservate={handleReservate} />
            <StyledInfo>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: "grey.500"
                  })
                }}
              >
                <Iconify
                  icon={"eva:people-fill"}
                  sx={{ width: 16, height: 16, mr: 0.5 }}
                />
                <Typography variant="caption">
                  {reservationCount || 0} / {maxSize}
                </Typography>
              </Box>
            </StyledInfo>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default RoomCard;
