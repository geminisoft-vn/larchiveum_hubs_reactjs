// @ts-nocheck
/* eslint-disable */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";

import ProjectService from "src/api/ProjectService";
import { useAppDispatch } from "src/app/hooks";
import { Modal, Stack } from "src/components";
import { showToast } from "src/features/toast/ToastSlice";
import MediaService from "src/api/MediaService";

const ObjectListModal = (props) => {
	const { projectId, exhibitionId, isActive, setIsActive } = props;

	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const [objects, setObjects] = useState([]);

	const load = () => {
		if (projectId) {
			ProjectService.getListObject(projectId)
				.then((res) => {
					if (res.result === "ok") {
						let clone = [...res.data];
						clone = clone.map((item) => ({
							...item,
							changeable: item.src.includes(item.uuid),
						}));
						setObjects(clone);
					}
				})
				.catch(() => {
					dispatch(
						showToast({
							type: "error",
							message: t("manager.GET_OBJECTS_ERROR"),
						}),
					);
				});
		}
	};

	const loadMedia = () => {
		let listUuid = [];
		listUuid = objects.map((item) => {
			if (item?.changeable === true) {
				return item.uuid;
			}
			return false;
		});
		const dataString = JSON.stringify(listUuid);
		ProjectService.updateChangeableObjects(projectId, dataString).then(
			(res) => {
				if (res.result == "ok") {
					console.log({ res });
				}
			},
		);
	};

	const handleCloseModal = () => {
		setIsActive(false);
	};

	const handleChangeable = (event, object) => {
		const clone = [...objects];
		const idx = clone.findIndex((obj) => obj.uuid === object.uuid);
		if (idx > -1) {
			clone[idx].changeable = event.target.checked;
			setObjects(clone);
		}
	};

	const handleSaveChangableURL = () => {
		let clone = [...objects];
		let changableObjects = clone.filter((obj) => obj.changeable);
		let uuids = changableObjects.map((obj) => obj.uuid);
		ProjectService.updateChangeableObjects(projectId, JSON.stringify(uuids))
			.then((res) => {
				if (res.result === "ok") {
					dispatch(
						showToast({
							type: "success",
							message: t("manager.MESSAGE_SUCCESS"),
						}),
					);
				}
			})
			.catch(() => {
				dispatch(
					showToast({
						type: "error",
						message: t("manager.UPDATE_CHANGEABLE_OBJECTS_ERROR"),
					}),
				);
			})
			.finally(() => {
				handleCloseModal();
			});
	};

	useEffect(() => {
		load();
	}, []);

	// useEffect(() => {
	// 	loadMedia();
	// }, [objects]);

	return (
		<Modal
			title="Media Edit"
			isActive={isActive}
			setIsActive={setIsActive}
			height={700}
			width={700}
			actions={[
				{
					text: t(`__BUTTON__.SAVE`),
					callback: handleSaveChangableURL,
				},
				{
					text: t(`__BUTTON__.CLOSE`),
					callback: handleCloseModal,
				},
			]}
		>
			<div>
				<Stack direction="col" gap={2} className="h-full overflow-y-auto">
					{objects &&
						(objects.length > 0 ? (
							objects.map((item, index) => {
								return (
									<div className="flex items-center gap-2">
										<div className="w-30">
											{item.type === "video" && <video src={item?.src} />}
											{item.type === "image" && (
												<img
													className="object-contain"
													src={item?.src}
													alt=""
													style={{
														width: 128,
														height: 128,
													}}
												/>
											)}
											{item.type !== "image" && item.type !== "video" && (
												<model-viewer poster={defaultModel} src={item?.src} />
											)}
										</div>
										<div className="flex flex-col">
											<h3 className="text-lg font-bold">{item?.name}</h3>
											<label className="flex items-center gap-2">
												<input
													className="largerCheckbox"
													type="checkbox"
													name="public"
													checked={!!item.changeable}
													onChange={(e) => handleChangeable(e, item)}
												/>
												<span className="textCheckbox">
													{t("manager.POPUP_OBJECT__URL_CHANEABLE")}
												</span>
											</label>
										</div>
									</div>
								);
							})
						) : (
							<Empty description="No Objects" />
						))}
				</Stack>
			</div>
		</Modal>
	);
};

export default ObjectListModal;
