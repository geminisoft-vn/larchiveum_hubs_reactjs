import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxiosResponse } from "axios";

import ExhibitionsService from "src/api/ExhibitionsService";
import MediaService from "src/api/MediaService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import defaultImage from "src/assets/larchiveum/default-image.png";
import { Button, Pagination, Stack, Typography } from "src/components";
import { closeModal, openModal } from "src/features/modal/ModalSlice";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserAuthenticationStatus } from "src/features/user/selectors";
import {
	IAxiosResponse,
	IExhibition,
	IPagination,
	IParams,
	IScene,
} from "src/interfaces";
import Store from "src/utilities/store";

import Exhibition from "./Exhibition";

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

	const openPopupExhibition = () => {};

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
					dispatch(closeModal());
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
				dispatch(closeModal());
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
							dispatch(closeModal());
						},
					},
				],
			}),
		);
	};
	const setExhibitionType = () => {};
	const openPopupCloseRoom = () => {};
	const openPopupOpenRoom = () => {};
	const openDeleteRoom = () => {};

	useEffect(() => {
		loadExhibitions();
	}, [loadExhibitions]);

	useEffect(() => {
		loadScenes();
	}, [loadScenes]);

	return (
		<Stack direction="col" alignItems="center" gap={2} className="my-4">
			<Typography className="text-center text-lg font-bold">
				{t("manager.LIST_EXHIBITION")}
			</Typography>
			{/* <Button
				className="btn btn-create"
				onClick={() => {
					// openPopupExhibition();
					// setExhibitionType("create");
				}}
			>
				<img src={AddIcon} />
			</Button> */}
			<Stack direction="col" gap={2}>
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
								setExhibitionType={setExhibitionType}
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
	);
};

export default Exhibitions;
