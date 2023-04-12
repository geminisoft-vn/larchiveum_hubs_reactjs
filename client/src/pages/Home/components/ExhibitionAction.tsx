import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import ReserveService from "src/api/ReserveService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { updateExhibition } from "src/features/exhibition/ExhibitionSlide";
import { closePopup, openPopup } from "src/features/popup/PopupSlide";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserInfo } from "src/features/user/selectors";
import { APP_ROOT } from "src/utilities/constants";

const ExhibitionAction = (props) => {
	const { exhibition } = props;

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const { t } = useTranslation();
	const user = useAppSelector(getUserInfo);

	const handleClosePopup = () => {
		dispatch(closePopup());
	};

	const handleReservate = () => {
		ReserveService.createReservations(exhibition.id)
			.then((res) => {
				if (res.result === "ok") {
					dispatch(
						showToast({
							type: "success",
							message: "Successful reservation!",
						}),
					);
					dispatch(
						updateExhibition({
							id: exhibition.id,
							dataToUpdate: {
								reservated: res.data.reservated,
								reservationCount: res.data.reservationCount,
							},
						}),
					);
				}
			})
			.catch(() => {
				dispatch(
					showToast({
						type: "error",
						message: "Error reservation!",
					}),
				);
			})
			.finally(() => {
				handleClosePopup();
			});
	};

	const openPopupReservation = () => {
		dispatch(
			openPopup({
				isActive: true,
				width: "max-content",
				title: t("home.POPUP_CONFIRM_RESERVATION__TITLE"),
				content: t("home.POPUP_CONFIRM_RESERVATION__MESSAGE"),
				actions: [
					{
						text: t("home.POPUP_CONFIRM_RESERVATION__YES"),
						className: "",
						important: true,
						callback: () => {
							handleReservate();
						},
					},
					{
						text: t("home.POPUP_CONFIRM_RESERVATION__CANCEL"),
						className: "",
						callback: () => {
							handleClosePopup();
						},
					},
				],
			}),
		);
	};

	const openPopupNotification = () => {
		dispatch(
			openPopup({
				isActive: true,
				title: t("home.POPUP_EXHIBITION_NOT_OPEN_YET__TTILE"),
				content: t("home.POPUP_EXHIBITION_NOT_OPEN_YET__MESSAGE"),
				actions: [
					{
						text: t("home.POPUP_EXHIBITION_NOT_OPEN_YET__CLOSE"),
						className: "",
						callback: () => {
							handleClosePopup();
						},
					},
				],
			}),
		);
	};

	if (
		exhibition.startDate &&
		moment(exhibition.startDate).isAfter(moment()) &&
		(exhibition.public || exhibition.reservated)
	) {
		return (
			<button
				key="will-open-on"
				className="rounded-lg bg-yellow-600 p-2 text-white"
				onClick={openPopupNotification}
			>
				{t("home.WILL_OPEN_ON")}{" "}
				{moment(exhibition.startDate).format("MMMM DD")}
			</button>
		);
	}

	if (
		user &&
		!exhibition.reservated &&
		!exhibition.public &&
		exhibition.reservationCount < exhibition.maxSize
	) {
		return (
			<button
				key="reservation"
				className="rounded-lg bg-yellow-600 p-2 text-white"
				onClick={openPopupReservation}
			>
				{t("home.MAKE_RESERVATION")}
			</button>
		);
	}

	if (
		!exhibition.startDate ||
		(moment(exhibition.startDate).isBefore(moment()) &&
			(exhibition.public || exhibition.reservated))
	) {
		return (
			<button
				key="enter"
				className="rounded-lg bg-blue-600 p-2 text-white"
				onClick={() => {
					window.open(`${APP_ROOT}/${exhibition.roomId}`, "_blank");
				}}
			>
				{t("home.ENTER")}
			</button>
		);
	}

	if (
		user &&
		!exhibition.reservated &&
		exhibition.reservationCount >= exhibition.maxSize
	) {
		return (
			<button
				key="exhibition-full"
				className="rounded-lg bg-red-600 p-2 text-white"
			>
				{t("home.EXHIBITION_FULL")}
			</button>
		);
	}

	if (!user && !exhibition.public) {
		return (
			<button
				key="signin"
				className="rounded-lg bg-purple-600 p-2 text-white"
				onClick={() => navigate("/auth/signin")}
			>
				{t("home.SIGN_IN")}
			</button>
		);
	}
	return <div />;
};

export default ExhibitionAction;
