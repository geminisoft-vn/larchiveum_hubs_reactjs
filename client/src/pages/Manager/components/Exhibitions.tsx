import { Empty } from "antd";
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
import { getLoaderInfo } from "src/features/loader/LoaderSlice";
import { setPagination } from "src/features/pagination/PaginationSlice";
import { closePopup, openPopup } from "src/features/popup/PopupSlide";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserAuthenticationStatus } from "src/features/user/selectors";
import { IParams, IScene } from "src/interfaces";

import Exhibition from "./Exhibition";
import ExhibitionFormModal from "./ExhibitionFormModal";
import ObjectListModal from "./ObjectListModal";

type Props = {};

const Exhibitions = (props: Props) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isAuthenticatedUser = useAppSelector(getUserAuthenticationStatus);
	const isActiveLoader = useAppSelector(getLoaderInfo);
	const { data: exhibitions } = useAppSelector(getExhibitions);

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

	const [shouldOpenObjectListModal, setShouldOpenObjectListModal] =
		useState(false);
	const [projectId, setProjectId] = useState<string>("");

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
						}),
					);
					dispatch(setPagination(res.pages));
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

	const loadScenes = async () => {
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
	};

	const handleClosePopup = () => {
		dispatch(closePopup());
	};

	const openPopupExhibition = (type, _id) => {
		setShouldActiveExhibitionForm(true);
		setExhibitionType(type);
		setExhibitionId(_id);
	};

	const openPopupCustomMedia = (
		_projectId?: string,
		_exhibitionId?: number,
	) => {
		setShouldOpenObjectListModal(true);
		if (_projectId) {
			setProjectId(_projectId);
		}
		if (_exhibitionId) {
			setExhibitionId(_exhibitionId);
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
							id,
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
						className: "",
						callback: () => {
							handelTogglePublic(id);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CANCEL"),
						className: "",
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

	const handelOpenRoom = (id) => {
		ExhibitionsService.openOneExhibition(id)
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
						message: t("manager.OPEN_EXHIBITION_ERROR"),
					}),
				);
			})
			.finally(() => {
				handleClosePopup();
			});
	};

	const openPopupOpenRoom = (id) => {
		dispatch(
			openPopup({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__TITLE"),
				content: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__MESSAGE"),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__CLOSE"),
						className: "",
						callback: () => {
							handelOpenRoom(id);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__CANCEL"),
						className: "",
						callback: () => {
							handleClosePopup();
						},
					},
				],
			}),
		);
	};

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
	}, []);

	return (
		<section className="h-full w-full">
			<Stack
				direction="col"
				alignItems="center"
				justifyContent="between"
				gap={2}
				className="my-4 h-full p-4"
			>
				<Button
					className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-blue-500 p-4 text-lg text-white shadow-lg"
					onClick={() => {
						openPopupExhibition("create", "");
					}}
				>
					+
				</Button>
				<Stack direction="col" gap={4} className="w-full">
					{!isActiveLoader &&
						exhibitions &&
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
					{!isActiveLoader && exhibitions.length === 0 && <Empty />}
				</Stack>

				<Pagination page={params.page} setParams={setParams} />
			</Stack>

			{shouldActiveExhibitionForm && (
				<ExhibitionFormModal
					isActive={shouldActiveExhibitionForm}
					setIsActive={setShouldActiveExhibitionForm}
					type={exhibitionType}
					exhibitionId={exhibitionId}
					scenes={scenes}
          loadExhibitions={loadExhibitions}
				/>
			)}

			{shouldOpenObjectListModal && (
				<ObjectListModal
					isActive={shouldOpenObjectListModal}
					setIsActive={setShouldOpenObjectListModal}
					projectId={projectId}
					exhibitionId={exhibitionId}
				/>
			)}
		</section>
	);
};

export default Exhibitions;