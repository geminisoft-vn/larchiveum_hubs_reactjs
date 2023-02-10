import React, { useEffect, useState } from "react";
import "../../../utils/theme";
import "../../../react-components/styles/global.scss";
import "../../../assets/larchiveum/style.scss";
import "../../../assets/larchiveum/loading.scss";
import moment from "moment-timezone";
import Store from "../../../utilities/store";
import ExhibitionsService from "../../../utilities/apiServices/ExhibitionsService";
import ReserveService from "../../../utilities/apiServices/ReserveService";
import Pagination from "../../../react-components/pagination/pagination";
import { APP_ROOT } from "../../../utilities/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Language from "../languages/language";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";
import { MdPublic, MdPeopleAlt, MdCalendarToday, MdOutlineCheckCircleOutline } from "react-icons/md";
import { ManagerLayout } from "../components/layout/ManagerLayout";
import InputSelect from "../components/inputs/InputSelect";

export function HomePage() {
  return <Home />;
}

function Home() {
  toast.configure();
  const [exhibitionsLoaded, setExhibitionsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isActiveSortASC, setIsActiveSortASC] = useState(true);
  const [isActiveSortDESC, setIsActiveSortDESC] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [currentExhibitionId, setCurrentExhibitionId] = useState(null);
  const [exhibitions, setExhibitions] = useState({
    data: [],
    pagination: {}
  });
  const [exhibitionNoti, setExhibitionNoti] = useState(undefined);
  const [filterExhibitionList, setfilterExhibitionList] = useState({
    page: 1,
    pageSize: 9,
    sort: "startDate|desc" //format <attribute>|<order type>,
  });
  const { t } = useTranslation();

  useEffect(
    () => {
      // redirect to verify page
      const qs = new URLSearchParams(location.search);
      if (qs.has("auth_topic")) {
        const redirectUrl = new URL("/verify", window.location);
        redirectUrl.search = location.search;
        window.location = redirectUrl;
      }
      getAllExhibitions();
    },
    [filterExhibitionList.page, filterExhibitionList.sort]
  );

  const togglePopup = exhibitionId => {
    setIsOpen(!isOpen);
    setCurrentExhibitionId(exhibitionId);
  };

  const getAllExhibitions = () => {
    const user = Store.getUser();
    const data = filterExhibitionList;
    if (user) {
      ExhibitionsService.getAllWithAuthExhibitions(data).then(res => {
        if (res.result == "ok") {
          setExhibitions(res.data);
          console.log(res.data);
          setExhibitionsLoaded(true);
        } else if (res.result == "fail" && res.error == "get_exhibitions_fail") {
          toast.error("Get Exhibitions fail !", { autoClose: 1000 });
        }
      });
    } else {
      ExhibitionsService.getAllExhibitions(data).then(res => {
        if (res.result == "ok") {
          setExhibitions(res.data);
          setExhibitionsLoaded(true);
        } else if (res.result == "fail" && res.error == "get_exhibitions_fail") {
          toast.error("Get Exhibitions fail !", { autoClose: 1000 });
        }
      });
    }
  };

  const handleSignOut = () => {
    Store.removeUser();
    window.location.reload();
  };

  const handleButtonVisit = event => {
    const user = Store.getUser();
    let url = APP_ROOT;
    const roomId = event.currentTarget.getAttribute("data-roomid");
    if (roomId && roomId != "") {
      if (APP_ROOT === "https://larchiveum.link") {
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
  };

  const openPopupReservation = event => {
    const exhibitionId = event.currentTarget.getAttribute("data-id-exhibition");
    togglePopup(exhibitionId);
  };

  const handleReservate = () => {
    console.log(currentExhibitionId);
    const exhibitionId = currentExhibitionId;
    ReserveService.createReservations(exhibitionId).then(res => {
      if (res.result == "ok") {
        exhibitions.data.forEach(exhibition => {
          if (exhibition.id == exhibitionId) {
            exhibition.reservated = true;
            exhibition.reservationCount = exhibition.reservationCount + 1;
            toast.success("Successful reservation!", { autoClose: 1000 });
          }
        });
        setIsOpen(!isOpen);
      } else if (res.result == "fail") {
        toast.error("Error reservation!", { autoClose: 1000 });
      }
    });
  };

  const handleButtonLogin = event => {
    window.location.href = "/?page=signin";
  };

  const changePages = page => {
    setfilterExhibitionList({
      ...filterExhibitionList,
      page
    });
  };

  const sortNewest = () => {
    setfilterExhibitionList({
      sort: "startDate|desc"
    });
    setIsActiveSortASC(true);
    setIsActiveSortDESC(false);
  };

  const sortOldest = () => {
    setfilterExhibitionList({
      sort: "startDate|asc"
    });
    setIsActiveSortASC(false);
    setIsActiveSortDESC(true);
  };

  const renderExhibitions = () => {
    return (
      <>
        {exhibitionsLoaded ? (
          <>
            {exhibitions.data.map((item, index) => {
              const user = Store.getUser();
              const today = new Date();
              const startDate = item.startDate ? new Date(item.startDate) : null;
              const endDate = item.endDate ? new Date(item.endDate) : null;

              const ActionButton = () => {
                if (startDate && startDate > today && (item.public || item.reservated)) {
                  return (
                    <button
                      key={"will-open-on"}
                      className="signin-up btn-visit nt-time-yet"
                      onClick={() => {
                        openPopupNotification(item);
                      }}
                      data-id-exhibition={item.id}
                    >
                      {t("home.WILL_OPEN_ON")} {moment(item.startDate).format("MMMM DD")}
                    </button>
                  );
                }

                if (user && !item.reservated && !item.public && item.reservationCount < item.maxSize) {
                  return (
                    <button
                      key={"reservation"}
                      className="signin-up btn-visit reserved"
                      onClick={openPopupReservation}
                      data-id-exhibition={item.id}
                    >
                      {t("home.MAKE_RESERVATION")}
                    </button>
                  );
                }

                if (!startDate || (startDate <= today && (item.public || item.reservated))) {
                  return (
                    <button
                      key={"enter"}
                      className="signin-up btn-visit"
                      onClick={handleButtonVisit}
                      data-roomid={item.roomId}
                    >
                      {t("home.ENTER")}
                    </button>
                  );
                }

                if (user && !item.reservated && item.reservationCount >= item.maxSize) {
                  return (
                    <button key={"exhibition-full"} className="signin-up btn-visit full">
                      {t("home.EXHIBITION_FULL")}
                    </button>
                  );
                }

                if (!user && !item.public) {
                  return (
                    <button key={"signin"} className="signin-up btn-visit signin" onClick={handleButtonLogin}>
                      {t("home.SIGN_IN")}
                    </button>
                  );
                }

                return <></>;
              };

              const StatusIcon = () => {
                if (item.public) {
                  return (
                    <div className="span3">
                      <MdPublic size={37} color="#FFF" />
                    </div>
                  );
                } else if (item.reservated) {
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
                <>
                  <div key={index} className={"items"}>
                    <img src={item?.room?.thumbnailUrl} alt="" />
                    <StatusIcon />
                    <div className="span1">{item?.room?.name}</div>
                    <div className="span2">
                      <p className="p-1">
                        <MdPeopleAlt style={{ marginTop: "5px" }} />
                        {item.reservationCount}/{item.maxSize}
                      </p>
                      {item.startDate && (
                        <p className="p-1">
                          <MdCalendarToday style={{ marginTop: "5px" }} />
                          {moment
                            .utc(item.startDate)
                            .local()
                            .locale(Language.getLanguage())
                            .format("L LT")}{" "}
                          {" (start)"}
                        </p>
                      )}
                      {item.endDate && (
                        <p className="p-1">
                          <MdCalendarToday style={{ marginTop: "5px" }} />
                          {moment
                            .utc(item.endDate)
                            .local()
                            .locale(Language.getLanguage())
                            .format("L LT")}{" "}
                          {" (end)"}
                        </p>
                      )}
                    </div>
                    <ActionButton />
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  const openPopupNotification = exhibitionNoti => {
    if (exhibitionNoti) {
      setExhibitionNoti({
        name: exhibitionNoti?.room?.name,
        description: exhibitionNoti?.room?.description,
        sceneId: exhibitionNoti.sceneId,
        thumbnailUrl: exhibitionNoti?.room?.thumbnailUrl,
        startDate: moment(exhibitionNoti.startDate).format("YYYY-MM-DD hh:mma"),
        maxSize: exhibitionNoti.maxSize
      });
    } else {
      setExhibitionNoti(null);
    }
    setIsOpenNotification(true);
  };

  const closePopupNotification = () => {
    setIsOpenNotification(false);
  };

  const handleChangeSort = sort => {
    setfilterExhibitionList({
      ...filterExhibitionList,
      sort: sort
    });
  };

  return (
    <>
      {/* {isOpen && (
        <Popup
          key={"popup-confirm-reservation"}
          size={"sm"}
          title={<>{t("home.POPUP_CONFIRM_RESERVATION__TITLE")}</>}
          content={
            <>
              <br />
              <div style={{ textAlign: "center" }}>{t("home.POPUP_CONFIRM_RESERVATION__MESSAGE")}</div>
              <br />
            </>
          }
          actions={[
            {
              text: t("home.POPUP_CONFIRM_RESERVATION__YES"),
              class: "btn1",
              callback: () => {
                handleReservate();
              }
            },
            {
              text: t("home.POPUP_CONFIRM_RESERVATION__CANCEL"),
              class: "btn2",
              callback: () => {
                togglePopup();
              }
            }
          ]}
          handleClose={togglePopup}
        />
      )}

      {isOpenNotification && (
        <Popup
          key={"popup-exhibition-not-open-yet"}
          size={"lg"}
          title={<>{t("home.POPUP_EXHIBITION_NOT_OPEN_YET__TTILE")}</>}
          content={
            <>
              <div className="info-room">
                <p className="noti-title">{t("home.POPUP_EXHIBITION_NOT_OPEN_YET__MESSAGE")}</p>
              </div>
            </>
          }
          actions={[
            {
              text: t("home.POPUP_EXHIBITION_NOT_OPEN_YET__CLOSE"),
              class: "btn2",
              callback: () => {
                closePopupNotification();
              }
            }
          ]}
          handleClose={closePopupNotification}
        />
      )} */}
      <ManagerLayout>
        <Row style={{ padding: "10px 0" }}>
          <Col span={24}>
            <InputSelect
              inline
              defaultValue={filterExhibitionList.sort}
              onChange={handleChangeSort}
              options={[
                {
                  value: "startDate|desc",
                  label: "Newest"
                },
                {
                  value: "startDate|asc",
                  label: "Oldnest"
                }
              ]}
            />
          </Col>
        </Row>
        <div className="col">{renderExhibitions()}</div>
        <div className="">
          {exhibitionsLoaded ? (
            exhibitions.data.length > 0 ? (
              <Pagination pagination={exhibitions.pagination} callFetchList={changePages} />
            ) : null
          ) : null}
        </div>
      </ManagerLayout>
    </>
  );
}
