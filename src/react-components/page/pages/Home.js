/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import "../../../assets/larchiveum/style.scss";
import moment from "moment-timezone";
import Store from "../../../utilities/store";
import ExhibitionsService from "../../../utilities/apiServices/ExhibitionsService";
import ReserveService from "../../../utilities/apiServices/ReserveService";
import Pagination from "../../../react-components/pagination/pagination";
import { APP_ROOT } from "../../../utilities/constants";
import { toast } from "react-toastify";
import Language from "../languages/language";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";
import { MdPublic, MdPeopleAlt, MdCalendarToday, MdOutlineCheckCircleOutline } from "react-icons/md";
import { ManagerLayout } from "../components/layouts/ManagerLayout";
import InputSelect from "../components/inputs/InputSelect";
import Exhibition from "../components/pages/home/Exhibition";
import "react-toastify/dist/ReactToastify.css";

export function HomePage() {
  return <Home />;
}

function Home() {
  toast.configure();
  const [exhibitionsLoaded, setExhibitionsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentExhibitionId, setCurrentExhibitionId] = useState(null);
  const [exhibitions, setExhibitions] = useState({
    data: [],
    pagination: {}
  });
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

  const handleButtonLogin = () => {
    window.location.href = "/?page=signin";
  };

  const changePages = page => {
    setfilterExhibitionList({
      ...filterExhibitionList,
      page
    });
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
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {exhibitions &&
            exhibitions.data.map((exhibition, i) => (
              <Col span={6} key={i} style={{ marginBottom: "20px" }}>
                <Exhibition exhibition={exhibition} />
              </Col>
            ))}
        </Row>
        <Row>
          <Col span={24}>
            {exhibitionsLoaded ? (
              exhibitions.data.length > 0 ? (
                <Pagination pagination={exhibitions.pagination} callFetchList={changePages} />
              ) : null
            ) : null}
          </Col>
        </Row>
      </ManagerLayout>
    </>
  );
}
