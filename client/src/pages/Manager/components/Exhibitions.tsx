import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ExhibitionsService from "src/api/ExhibitionsService";
import MediaService from "src/api/MediaService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import defaultImage from "src/assets/larchiveum/default-image.png";
import { Button, Pagination, Stack, Typography } from "src/components";
import { closeModal, openModal } from "src/features/modal/ModalSlice";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserAuthenticationStatus } from "src/features/user/selectors";
import { IExhibition, IPagination, IParams, IScene } from "src/interfaces";

import Exhibition from "./Exhibition";
import ExhibitionFormModal from "./ExhibitionFormModal";

type Props = {};

const Exhibitions = (props: Props) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isAuthenticatedUser = useAppSelector(getUserAuthenticationStatus);

	const [exhibitions, setExhibitions] = useState<IExhibition[]>([]);
	const [params, setParams] = useState<IParams>({
		page: 1,
		pageSize: 4,
	});
	const [pages, setPages] = useState<IPagination>({});
	const [scenes, setScenes] = useState<IScene[]>([]);
	const [shouldActiveExhibitionForm, setShouldActiveExhibitionForm] =
		useState(false);
	const [exhibitionType, setExhibitionType] = useState<"create" | "edit">(
		"create",
	);

	const loadExhibitions = useCallback(async () => {
		try {
			if (isAuthenticatedUser) {
				const res = await ExhibitionsService.getAllWithAuthExhibitions({
					...params,
					sort: "id|desc", // format <attribute>|<order type>
					isAdmin: 1,
				});
				if (res.result === "ok") {
					setExhibitions(res.data);
					setPages(res.pages);
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

	const handleCloseModal = () => {
		dispatch(closeModal());
	};

	const openPopupExhibition = (type, _id) => {
		setShouldActiveExhibitionForm(true);
		setExhibitionType(type);
	};

	const openPopupCustomMedia = (exhibitionId) => {
		if (exhibitionId) {
			MediaService.getListMedia(exhibitionId)
				.then((res) => {
					if (res.result === "ok") {
						console.log({ res });
					}
				})
				.catch((err) => {
					console.log({ err });
				})
				.finally(() => {
					handleCloseModal();
				});
		}
	};

	const getSceneThumnail = (sceneId) => {
		if (!sceneId) return defaultImage;
		return scenes.find((scene) => scene.id === sceneId)?.thumbnailUrl || "";
	};

	const handelTogglePublic = (exhibitionId) => {
		ExhibitionsService.patchTogglePublic(exhibitionId)
			.then((res) => {
				if (res.result === "ok") {
					exhibitions.forEach((exhibition) => {
						if (exhibition.id === exhibitionId) {
							exhibition.public = res.data.public;
							dispatch(
								showToast({
									type: "success",
									message: t("manager.MESSAGE_SUCCESS"),
								}),
							);
						}
					});
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
				handleCloseModal();
			});
	};

	const openPopupPublic = (exhibitionId) => {
		dispatch(
			openModal({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__TITLE"),
				body: (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__MESSAGE")}
					</div>
				),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CHANGE"),
						className: "btn1",
						callback: () => {
							handelTogglePublic(exhibitionId);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CANCEL"),
						className: "btn2",
						callback: () => {
							handleCloseModal();
						},
					},
				],
			}),
		);
	};

	const handelCloseRoom = (exhibitionId) => {
		ExhibitionsService.closeOneExhibition(exhibitionId)
			.then((res) => {
				if (res.result === "ok") {
					exhibitions.forEach((exhibition) => {
						if (exhibition.id === exhibitionId) {
							exhibition.closed = res.data.closed;
							dispatch(
								showToast({
									type: "success",
									message: t("manager.MESSAGE_SUCCESS"),
								}),
							);
						}
					});
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
				handleCloseModal();
			});
	};

	const openPopupCloseRoom = (exhibitionId) => {
		dispatch(
			openModal({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__TITLE"),
				body: (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__MESSAGE")}
					</div>
				),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CLOSE"),
						className: "",
						callback: () => {
							handelCloseRoom(exhibitionId);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CANCEL"),
						className: "",
						callback: () => {
							handleCloseModal();
						},
					},
				],
			}),
		);
	};

	const openPopupOpenRoom = () => {};
	const openDeleteRoom = () => {};

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

			<ExhibitionFormModal
				isActive={shouldActiveExhibitionForm}
				setIsActive={setShouldActiveExhibitionForm}
				type={exhibitionType}
				scenes={scenes}
			/>
		</section>
	);
};

("dasdsadasd");
0;
0;
1;
0;
0;
0;
("06/04/2023 00:00:00");
20;
("dsad");
1;
("AoKTb9H");
("05/04/2023 00:00:00");

export default Exhibitions;
