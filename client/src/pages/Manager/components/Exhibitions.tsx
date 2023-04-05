import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ExhibitionsService from "src/api/ExhibitionsService";
import MediaService from "src/api/MediaService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import defaultImage from "src/assets/larchiveum/default-image.png";
import { Button, Pagination, Stack, Typography } from "src/components";
import {
	getExhibitions,
	setExhibitions,
	updateExhibition,
} from "src/features/exhibition/ExhibitionSlide";
import { closePopup, openPopup } from "src/features/popup/PopupSlide";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserAuthenticationStatus } from "src/features/user/selectors";
import { IParams, IScene } from "src/interfaces";

import Exhibition from "./Exhibition";
import ExhibitionFormModal from "./ExhibitionFormModal";

type Props = {};

const Exhibitions = (props: Props) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isAuthenticatedUser = useAppSelector(getUserAuthenticationStatus);
	const { data: exhibitions, pages } = useAppSelector(getExhibitions);

	const [params, setParams] = useState<IParams>({
		page: 1,
		pageSize: 4,
	});
	const [scenes, setScenes] = useState<IScene[]>([]);
	const [shouldActiveExhibitionForm, setShouldActiveExhibitionForm] =
		useState(false);
	const [exhibitionType, setExhibitionType] = useState<"create" | "edit">(
		"create",
	);
	const [exhibitionId, setExhibitionId] = useState<number>(0);

	const loadExhibitions = useCallback(async () => {
		try {
			if (isAuthenticatedUser) {
				const res = await ExhibitionsService.getAllWithAuthExhibitions({
					...params,
					sort: "id|desc", // format <attribute>|<order type>
					isAdmin: 1,
				});
				if (res.result === "ok") {
					dispatch(
						setExhibitions({
							data: res.data,
							items: res.items,
							pages: res.pages,
						}),
					);
				}
			}
		} catch (err) {
			dispatch(
				showToast({
					type: "error",
					message: t("manager.GET_EXHIBITIONS_ERROR"),
				}),
			);
		}
	}, [params.page]);

	const loadScenes = useCallback(async () => {
		try {
			const res = await ExhibitionsService.getAllScenes();
			if (res.result === "ok") {
				res.data = res.data.map((item) => ({
					...item,
					label: item.name,
				}));
				setScenes(res.data);
			}
		} catch (err) {
			dispatch(
				showToast({
					type: "error",
					message: t("manager.GET_SCENES_ERROR"),
				}),
			);
		}
	}, []);

	const handleClosePopup = () => {
		dispatch(closePopup());
	};

	const openPopupExhibition = (type, _id) => {
		setShouldActiveExhibitionForm(true);
		setExhibitionType(type);
		setExhibitionId(_id);
	};

	const openPopupCustomMedia = (id) => {
		if (id) {
			MediaService.getListMedia(id)
				.then((res) => {
					if (res.result === "ok") {
						console.log({ res });
					}
				})
				.catch((err) => {
					console.log({ err });
				})
				.finally(() => {
					handleClosePopup();
				});
		}
	};

	const getSceneThumnail = (sceneId) => {
		if (!sceneId) return defaultImage;
		return scenes.find((scene) => scene.id === sceneId)?.thumbnailUrl || "";
	};
	const handelTogglePublic = (id) => {
		ExhibitionsService.patchTogglePublic(id)
			.then((res) => {
				if (res.result === "ok") {
					dispatch(
						showToast({
							type: "success",
							message: t("manager.MESSAGE_SUCCESS"),
						}),
					);
					dispatch(
						updateExhibition({
							id: exhibitionId,
							dataToUpdate: {
								public: res.data.public,
							},
						}),
					);
				} else {
					dispatch(
						showToast({
							type: "error",
							message: t("manager.CHANGE_EXHIBITION_PUBLIC_ERROR"),
						}),
					);
				}
			})
			.finally(() => {
				handleClosePopup();
			});
	};

	const openPopupPublic = (id) => {
		dispatch(
			openPopup({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__TITLE"),
				content: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__MESSAGE"),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CHANGE"),
						className: "btn1",
						callback: () => {
							handelTogglePublic(id);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CANCEL"),
						className: "btn2",
						callback: handleClosePopup,
					},
				],
			}),
		);
	};

	const handelCloseRoom = (id) => {
		ExhibitionsService.closeOneExhibition(id)
			.then((res) => {
				if (res.result === "ok") {
					dispatch(
						showToast({
							type: "success",
							message: t("manager.MESSAGE_SUCCESS"),
						}),
					);
					dispatch(
						updateExhibition({
							id,
							dataToUpdate: {
								closed: res.data.closed,
							},
						}),
					);
				}
			})
			.catch(() => {
				dispatch(
					showToast({
						type: "error",
						message: t("manager.CLOSE_EXHIBITION_ERROR"),
					}),
				);
			})
			.finally(() => {
				handleClosePopup();
			});
	};

	const openPopupCloseRoom = (id) => {
		dispatch(
			openPopup({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__TITLE"),
				content: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__MESSAGE"),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CLOSE"),
						className: "",
						callback: () => {
							handelCloseRoom(id);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CANCEL"),
						className: "",
						callback: () => {
							handleClosePopup();
						},
					},
				],
			}),
		);
	};

	const openPopupOpenRoom = () => {};

	const handelToggleDeleteRoom = (id) => {
		ExhibitionsService.deleteOneExhibition(id)
			.then((res) => {
				if (res.result === "ok") {
					dispatch(
						showToast({
							type: "success",
							message: t("manager.MESSAGE_SUCCESS"),
						}),
					);

					dispatch(
						updateExhibition({
							id,
							dataToUpdate: {
								deleted: res.data.deleted,
							},
						}),
					);
				}
			})
			.catch((err) => {
				if (err.response) {
					dispatch(
						showToast({
							type: "error",
							message: "manager.DELETE_EXHIBITION_ERROR",
						}),
					);
				}
			})
			.finally(() => {
				handleClosePopup();
			});
	};

	const openDeleteRoom = (id) => {
		dispatch(
			openPopup({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__TITLE"),
				content: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__MESSAGE"),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__DELETE"),
						className: "btn1",
						callback: () => {
							handelToggleDeleteRoom(id);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CANCEL"),
						className: "",
						callback: () => {
							handleClosePopup();
						},
					},
				],
			}),
		);
	};

	useEffect(() => {
		loadExhibitions();
	}, [loadExhibitions]);

	useEffect(() => {
		loadScenes();
	}, [loadScenes]);

	return (
		<section className="w-full">
			<Stack direction="col" alignItems="center" gap={2} className="my-4">
				<Typography className="text-center text-lg font-bold">
					{t("manager.LIST_EXHIBITION")}
				</Typography>
				<Button
					className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-blue-500 p-4 text-lg text-white shadow-lg"
					onClick={() => {
						openPopupExhibition("create", "");
					}}
				>
					+
				</Button>
				<Stack direction="col" gap={2} className="w-full">
					{exhibitions &&
						exhibitions.map((exhibition) => {
							return (
								<Exhibition
									key={exhibition.id}
									exhibition={exhibition}
									openPopupCustomMedia={openPopupCustomMedia}
									getSceneThumnail={getSceneThumnail}
									openPopupPublic={openPopupPublic}
									openPopupExhibition={openPopupExhibition}
									openPopupCloseRoom={openPopupCloseRoom}
									openPopupOpenRoom={openPopupOpenRoom}
									openDeleteRoom={openDeleteRoom}
								/>
							);
						})}
				</Stack>

				<Pagination
					page={params.page}
					pageCount={pages.total}
					setParams={setParams}
					hasNext={pages.hasNext}
					hasPrev={pages.hasPrev}
				/>
			</Stack>

			{shouldActiveExhibitionForm && (
				<ExhibitionFormModal
					isActive={shouldActiveExhibitionForm}
					setIsActive={setShouldActiveExhibitionForm}
					type={exhibitionType}
					exhibitionId={exhibitionId}
					scenes={scenes}
				/>
			)}
		</section>
	);
};

export default Exhibitions;
