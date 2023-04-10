// @ts-nocheck
/* eslint-disable */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";

import ProjectService from "src/api/ProjectService";
import { useAppDispatch } from "src/app/hooks";
import { Modal, Stack } from "src/components";
import { showToast } from "src/features/toast/ToastSlice";

const ObjectListModal = (props) => {
	const { projectId, isActive, setIsActive } = props;

	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const [objects, setObjects] = useState([]);

	const load = () => {
		if (projectId) {
			ProjectService.getListObject(projectId)
				.then((res) => {
					if (res.result === "ok") {
						setObjects(res.data);
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

	useEffect(() => {
		load();
	}, []);

	return (
		<Modal
			title="Media Edit"
			isActive={isActive}
			setIsActive={setIsActive}
			actions={[
				{
					text: t(`__BUTTON__.SAVE`),
					callback: () => {},
				},
				{
					text: t(`__BUTTON__.CLOSE`),
					callback: handleCloseModal,
				},
			]}
		>
			<Stack direction="col" gap={2}>
				{objects &&
					(objects.length > 0 ? (
						objects.map((item, index) => {
							// if (item?.changeable == undefined) {
							// 	if (item.src.includes(item.uuid)) {
							// 		item.changeable = true;
							// 	} else {
							// 		item.changeable = false;
							// 	}
							// }
							// const icon_type = () => {
							// 	if (item.type == "video") {
							// 		return <FaVideo className="icon_type" />;
							// 	}
							// 	if (item.type == "image") {
							// 		return <FaRegImage className="icon_type" />;
							// 	}
							// 	return <FaCodepen className="icon_type" />;
							// };

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
												checked={item.changeable}
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
		</Modal>
	);
};

export default ObjectListModal;
