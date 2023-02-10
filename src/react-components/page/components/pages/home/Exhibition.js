import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../contexts/UserContext";
import moment from "moment-timezone";
import constants from "../../../utils/constants";
import language from "../../../languages/language";
import { MdPublic, MdPeopleAlt, MdCalendarToday, MdOutlineCheckCircleOutline } from "react-icons/md";
import { Card, Space, Col, Row } from "antd";
import "./Exhibition.scss";

function Exhibition(props) {
  const { exhibition, openPopupReservation } = props;
  const { t } = useTranslation();
  const [user] = useContext(UserContext);
  const today = new Date();
  const startDate = exhibition.startDate ? new Date(exhibition.startDate) : null;
  const endDate = exhibition.endDate ? new Date(exhibition.endDate) : null;

  function handleGoToExhibition(exhibition) {
    let url = constants.API_URL_ROOT;
    const roomId = exhibition.roomId;
    if (roomId && roomId != "") {
      if (constants.APP_URL_ROOT === "https://larchiveum.link") {
        url += "/" + roomId;
      } else {
        url += "/hub.html?hub_id=" + roomId;
      }
    }

    url = new URL(url);

    if (user?.displayName) {
      url.searchParams.set("displayName", user.displayName);
    }

    if (user?.avatar) {
      url.searchParams.set("avatarId", user.avatar.url);
    } else if (user?.avatarId) {
      url.searchParams.set("avatarId", user.avatarId);
    }

    window.open(url.href, "_blank");
  }

  function handleGoToLogin() {
    window.location.href = "/?page=signin";
  }

  const ActionButton = () => {
    if (startDate && startDate > today && (exhibition.public || exhibition.reservated)) {
      return (
        <button
          key={"will-open-on"}
          className="signin-up btn-visit nt-time-yet"
          onClick={() => {
            //openPopupNotification(exhibition);
          }}
          data-id-exhibition={exhibition.id}
        >
          {t("home.WILL_OPEN_ON")} {moment(exhibition.startDate).format("MMMM DD")}
        </button>
      );
    }

    if (user && !exhibition.reservated && !exhibition.public && exhibition.reservationCount < exhibition.maxSize) {
      return (
        <button
          key={"reservation"}
          className="signin-up btn-visit reserved"
          onClick={openPopupReservation}
          data-id-exhibition={exhibition.id}
        >
          {t("home.MAKE_RESERVATION")}
        </button>
      );
    }

    if (!startDate || (startDate <= today && (exhibition.public || exhibition.reservated))) {
      return (
        <button
          key={"enter"}
          className="signin-up btn-visit"
          onClick={() => {
            handleGoToExhibition(exhibition);
          }}
          data-roomid={exhibition.roomId}
        >
          {t("home.ENTER")}
        </button>
      );
    }

    if (user && !exhibition.reservated && exhibition.reservationCount >= exhibition.maxSize) {
      return (
        <button key={"exhibition-full"} className="signin-up btn-visit full">
          {t("home.EXHIBITION_FULL")}
        </button>
      );
    }

    if (!user && !exhibition.public) {
      return (
        <button key={"signin"} className="signin-up btn-visit signin" onClick={handleGoToLogin}>
          {t("home.SIGN_IN")}
        </button>
      );
    }

    return <></>;
  };

  const StatusIcon = () => {
    if (exhibition.public) {
      return (
        <div className="span3">
          <MdPublic size={37} color="#FFF" />
        </div>
      );
    } else if (exhibition.reservated) {
      return (
        <div className="span3">
          <MdOutlineCheckCircleOutline size={37} color="#FFF" />
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Card className="exhibition" cover={<img src={exhibition?.room?.thumbnailUrl} alt="" />}>
      <StatusIcon />
      <Row>
        <Col span={24} style={{ fontWeight: "bold" }}>
          {exhibition?.name}
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ fontWeight: "bold" }}>
          {exhibition?.name}
        </Col>
      </Row>
      <Row>
        <Col span={24}>{exhibition?.description}</Col>
      </Row>
      <Row>
        <Col span={24}>
          <ActionButton />
        </Col>
      </Row>
    </Card>
    // <>
    //   <div className={"exhibitions"}>
    //     <img src={exhibition?.room?.thumbnailUrl} alt="" />
    //     <StatusIcon />
    //     <div className="span1">{exhibition?.room?.name}</div>
    //     <div className="span2">
    //       <p className="p-1">
    //         <MdPeopleAlt style={{ marginTop: "5px" }} />
    //         {exhibition.reservationCount}/{exhibition.maxSize}
    //       </p>
    //       {exhibition.startDate && (
    //         <p className="p-1">
    //           <MdCalendarToday style={{ marginTop: "5px" }} />
    //           {moment
    //             .utc(exhibition.startDate)
    //             .local()
    //             .locale(language.getLanguage())
    //             .format("L LT")}{" "}
    //           {" (start)"}
    //         </p>
    //       )}
    //       {exhibition.endDate && (
    //         <p className="p-1">
    //           <MdCalendarToday style={{ marginTop: "5px" }} />
    //           {moment
    //             .utc(exhibition.endDate)
    //             .local()
    //             .locale(language.getLanguage())
    //             .format("L LT")}{" "}
    //           {" (end)"}
    //         </p>
    //       )}
    //     </div>
    //     <ActionButton />
    //   </div>
    // </>
  );
}

export default Exhibition;
