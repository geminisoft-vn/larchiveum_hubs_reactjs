import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Button } from "@mui/material";
import { indigo, red, yellow } from "@mui/material/colors";
import Cookies from "js-cookie";
import moment from "moment";

import { useAuth } from "src/hooks";

import qs from "qs";

const RoomCardAction = ({ room, handleReservate }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGoToRoom = () => {
    let params = {};
    if (user) {
      params["hub-token"] = user?.hubToken;
      params["user-id"] = user?.id;
      params["displayName"] = user?.username;
      params["avatarId"] = user?.avatar?.id;
    }
    window.open(
      `${import.meta.env.VITE_APP_ROOT}/${room?.hubRoomId}/${qs.stringify(
        params
      )}`
    );
  };

  if (
    room.startDate &&
    moment(room.startDate).isAfter(moment()) &&
    (room.public || room.reservated)
  ) {
    return (
      <Button
        sx={{
          background: yellow[700],
          color: "#fff",
          "&.MuiButtonBase-root:hover": {
            background: yellow[900]
          }
        }}
      >
        {t("BUTTON.incoming")} {moment(room.startDate).format("MMMM DD")}
      </Button>
    );
  }

  if (
    user &&
    !room.reservated &&
    !room.public &&
    room.reservationCount < room.maxSize
  ) {
    return (
      <Button
        endIcon={<ConfirmationNumberRoundedIcon />}
        variant="contained"
        color="secondary"
        onClick={() => handleReservate(room.id)}
      >
        {t("BUTTON.reservate")}
      </Button>
    );
  }

  if (
    (user && !room.public && room.reservated) ||
    ((!room.startDate || !room.endDate) && room.public) ||
    (room.startDate && moment(room.startDate).isBefore(moment()) && room.public)
  ) {
    return (
      <Button
        variant="contained"
        endIcon={<OpenInNewRoundedIcon />}
        onClick={handleGoToRoom}
      >
        {t("BUTTON.enter")}
      </Button>
    );
  }

  if (user && room.reservationCount >= room.maxSize) {
    return (
      <Button
        variant="contained"
        disabled
        sx={{
          background: red[700],
          "&.MuiButtonBase-root:hover": {
            background: red[900]
          }
        }}
      >
        {t("BUTTON.full")}
      </Button>
    );
  }

  if (!user && !room.public) {
    return (
      <Link to="/auth/signin">
        <Button
          endIcon={<LoginRoundedIcon />}
          variant="contained"
          sx={{
            background: indigo[700],
            color: "#fff",
            "&.MuiButtonBase-root:hover": {
              background: indigo[900]
            }
          }}
        >
          {t("BUTTON.login")}
        </Button>
      </Link>
    );
  }

  return <div />;
};

export default RoomCardAction;
