import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// ICON
import {
	MdCalendarToday,
	MdOutlineCheckCircleOutline,
	MdPeopleAlt,
	MdPublic,
} from "react-icons/md";
import { toast } from "react-toastify";
import { Box, Stack } from "@mui/material";
import moment from "moment-timezone";

import { Pagination } from "src/components";
import { IParams } from "src/interfaces";
import { getLanguage } from "src/language";
import ExhibitionsService from "src/utilities/apiServices/ExhibitionsService";
import ReserveService from "src/utilities/apiServices/ReserveService";
import UserService from "src/utilities/apiServices/UserService";
// import Popup from "../../../../react-components/popup/popup";
import { APP_ROOT } from "src/utilities/constants";
import Store from "src/utilities/store";

import Exhibitions from "./components/Exhibitions";
import Filter from "./components/Filter";

import "react-toastify/dist/ReactToastify.css";

function HomePage() {
	const [exhibitionsLoaded, setExhibitionsLoaded] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isActiveSortASC, setIsActiveSortASC] = useState(true);
	const [isActiveSortDESC, setIsActiveSortDESC] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isOpenNotification, setIsOpenNotification] = useState(false);
	const [currentExhibitionId, setCurrentExhibitionId] = useState(null);
	const [exhibitions, setExhibitions] = useState([]);
	const [exhibitionNoti, setExhibitionNoti] = useState(undefined);
	const [params, setParams] = useState<IParams>({
		page: 1,
		perPage: 9,
		sort: "startDate|desc", // format <attribute>|<order type>,
	});

	const user = Store.getUser();
	const { t } = useTranslation();

	function auth() {
		const token = Store.getUser()?.token;
		UserService.checkToken(token)
			.then((res) => {
				if (res.result === "ok") {
					const data = Store.getUser();
					if (res.data.id !== data?.id) {
						Store.removeUser();
					}
				} else {
					Store.removeUser();
				}
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
			});
	}

	useEffect(() => {
		auth();
		// redirect to verify page
		const qs = new URLSearchParams(window.location.search);
		if (qs.has("auth_topic")) {
			const redirectUrl = new URL("/verify", window.location);
			redirectUrl.search = window.location.search;
			window.location = redirectUrl;
		}
		getAllExhibitions();
	}, [params.page, params.sort]);

	const togglePopup = (exhibitionId) => {
		setIsOpen(!isOpen);
		setCurrentExhibitionId(exhibitionId);
	};

	const getAllExhibitions = () => {
		const user = Store.getUser();
		const data = params;
		if (user) {
			ExhibitionsService.getAllWithAuthExhibitions(data).then((res) => {
				if (res.result === "ok") {
					const { data } = res.data;
					console.log({ res });
					setExhibitions(data);
					setExhibitionsLoaded(true);
				} else if (
					res.result == "fail" &&
					res.error == "get_exhibitions_fail"
				) {
					toast.error("Get Exhibitions fail !", { autoClose: 1000 });
				}
			});
		} else {
			ExhibitionsService.getAllExhibitions(data).then((res) => {
				if (res.result === "ok") {
					const { data } = res.data;
					setExhibitions(data);
					setExhibitionsLoaded(true);
				} else if (
					res.result === "fail" &&
					res.error === "get_exhibitions_fail"
				) {
					toast.error("Get Exhibitions fail !", { autoClose: 1000 });
				}
			});
		}
	};

	const handleSignOut = () => {
		Store.removeUser();
		window.location.reload();
	};

	const handleButtonVisit = (event) => {
		const user = Store.getUser();
		let url = APP_ROOT;
		const roomId = event.currentTarget.getAttribute("data-roomid");
		if (roomId && roomId != "") {
			if (APP_ROOT === "https://larchiveum.link") {
				url += `/${roomId}`;
			} else {
				url += `/hub.html?hub_id=${roomId}`;
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

	const openPopupReservation = (event) => {
		const exhibitionId = event.currentTarget.getAttribute("data-id-exhibition");
		togglePopup(exhibitionId);
	};

	const handleReservate = () => {
		const exhibitionId = currentExhibitionId;
		ReserveService.createReservations(exhibitionId).then((res) => {
			if (res.result === "ok") {
				exhibitions.data.forEach((exhibition) => {
					if (exhibition.id == exhibitionId) {
						exhibition.reservated = true;
						exhibition.reservationCount += 1;
						toast.success("Successful reservation!", { autoClose: 1000 });
					}
				});
				setIsOpen(!isOpen);
			} else if (res.result == "fail") {
				toast.error("Error reservation!", { autoClose: 1000 });
			}
		});
	};

	const handleButtonLogin = (event) => {
		window.location.href = "/?page=signin";
	};

	const changePages = (page) => {
		setParams({
			...params,
			page,
		});
	};

	const sortNewest = () => {
		setParams({
			sort: "startDate|desc",
		});
		setIsActiveSortASC(true);
		setIsActiveSortDESC(false);
	};

	const sortOldest = () => {
		setParams({
			sort: "startDate|asc",
		});
		setIsActiveSortASC(false);
		setIsActiveSortDESC(true);
	};

	const ActionButton = useCallback((item, startDate, endDate, today) => {
		if (startDate && startDate > today && (item.public || item.reservated)) {
			return (
				<button
					key="will-open-on"
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

		if (
			user &&
			!item.reservated &&
			!item.public &&
			item.reservationCount < item.maxSize
		) {
			return (
				<button
					key="reservation"
					className="signin-up btn-visit reserved"
					onClick={openPopupReservation}
					data-id-exhibition={item.id}
				>
					{t("home.MAKE_RESERVATION")}
				</button>
			);
		}

		if (
			!startDate ||
			(startDate <= today && (item.public || item.reservated))
		) {
			return (
				<button
					key="enter"
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
				<button key="exhibition-full" className="signin-up btn-visit full">
					{t("home.EXHIBITION_FULL")}
				</button>
			);
		}

		if (!user && !item.public) {
			return (
				<button
					type=""
					key="signin"
					className="signin-up btn-visit signin"
					onClick={handleButtonLogin}
				>
					{t("home.SIGN_IN")}
				</button>
			);
		}
		return <div />;
	}, []);

	const StatusIcon = useCallback((item) => {
		if (item.public) {
			return (
				<div className="span3">
					<MdPublic size={37} color="#FFF" />
				</div>
			);
		}
		if (item.reservated) {
			return (
				<div className="span3">
					<MdOutlineCheckCircleOutline size={37} color="#FFF" />
				</div>
			);
		}

		return <div />;
	}, []);

	const renderExhibitions = () => {
		exhibitions.data.map((item) => {
			const user = Store.getUser();
			const today = new Date();
			const startDate = item.startDate ? new Date(item.startDate) : null;
			const endDate = item.endDate ? new Date(item.endDate) : null;

			return (
				<div key={item.id} className="items">
					<img src={item?.room?.thumbnailUrl} alt="" />
					<StatusIcon item={item} />
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
									.locale(getLanguage())
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
									.locale(getLanguage())
									.format("L LT")}{" "}
								{" (end)"}
							</p>
						)}
					</div>
					<ActionButton
						item={item}
						startDate={startDate}
						endDate={endDate}
						today={today}
					/>
				</div>
			);
		});
	};

	const openPopupNotification = (exhibitionNoti) => {
		if (exhibitionNoti) {
			setExhibitionNoti({
				name: exhibitionNoti?.room?.name,
				description: exhibitionNoti?.room?.description,
				sceneId: exhibitionNoti.sceneId,
				thumbnailUrl: exhibitionNoti?.room?.thumbnailUrl,
				startDate: moment(exhibitionNoti.startDate).format("YYYY-MM-DD hh:mma"),
				maxSize: exhibitionNoti.maxSize,
			});
		} else {
			setExhibitionNoti(null);
		}
		setIsOpenNotification(true);
	};

	const closePopupNotification = () => {
		setIsOpenNotification(false);
	};

	// if (isLoading) {
	//   return (
	//     <div className="loader-2">
	//       <div className="loader">
	//         <svg viewBox="0 0 80 80">
	//           <circle id="test" cx="40" cy="40" r="32" />
	//         </svg>
	//       </div>
	//       <div className="loader triangle">
	//         <svg viewBox="0 0 86 80">
	//           <polygon points="43 8 79 72 7 72" />
	//         </svg>
	//       </div>
	//       <div className="loader">
	//         <svg viewBox="0 0 80 80">
	//           <rect x="8" y="8" width="64" height="64" />
	//         </svg>
	//       </div>
	//     </div>
	//   );
	// } else {

	// }

	return (
		<Box
			sx={{
				height: "100%",

				p: 2,
			}}
		>
			{/* {isOpen && (
        <Popup
          key="popup-confirm-reservation"
          size="sm"
          title={<>{t("home.POPUP_CONFIRM_RESERVATION__TITLE")}</>}
          content={
            <>
              <br />
              <div style={{ textAlign: "center" }}>
                {t("home.POPUP_CONFIRM_RESERVATION__MESSAGE")}
              </div>
              <br />
            </>
          }
          actions={[
            {
              text: t("home.POPUP_CONFIRM_RESERVATION__YES"),
              class: "btn1",
              callback: () => {
                handleReservate();
              },
            },
            {
              text: t("home.POPUP_CONFIRM_RESERVATION__CANCEL"),
              class: "btn2",
              callback: () => {
                togglePopup();
              },
            },
          ]}
          handleClose={togglePopup}
        />
      )} */}

			{/* {isOpenNotification && (
        <Popup
          key="popup-exhibition-not-open-yet"
          size="lg"
          title={<>{t("home.POPUP_EXHIBITION_NOT_OPEN_YET__TTILE")}</>}
          content={
            <div className="info-room">
              <p className="noti-title">
                {t("home.POPUP_EXHIBITION_NOT_OPEN_YET__MESSAGE")}
              </p>
            </div>
          }
          actions={[
            {
              text: t("home.POPUP_EXHIBITION_NOT_OPEN_YET__CLOSE"),
              class: "btn2",
              callback: () => {
                closePopupNotification();
              },
            },
          ]}
          handleClose={closePopupNotification}
        />
      )} */}

			<Stack direction="column" alignItems="center" spacing={2}>
				<Filter
					sortNewest={sortNewest}
					sortOldest={sortOldest}
					isActiveSortASC={isActiveSortASC}
					isActiveSortDESC={isActiveSortDESC}
				/>

				<Exhibitions exhibitions={exhibitions} />

				<Pagination
					totalItems={exhibitions.length}
					page={params.page}
					perPage={params.perPage}
					setParams={setParams}
				/>
			</Stack>
		</Box>
	);
}

export default HomePage;
