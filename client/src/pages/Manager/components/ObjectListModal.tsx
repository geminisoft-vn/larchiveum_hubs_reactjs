import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ProjectService from "src/api/ProjectService";
import { useAppDispatch } from "src/app/hooks";
import { showToast } from "src/features/toast/ToastSlice";

const ObjectListModal = (props) => {
	const { projectId } = props;

	const { t } = useTranslation();

	const dispatch = useAppDispatch();

	const [objects, setObjects] = useState([]);

	const load = () => {
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
	};

	const handleChangeable = (object, evt) => {
		if (object.changeable === true) {
			object.changeable = false;
		} else {
			object.changeable = true;
		}
		setObjects({ ...objects });
	};

	useEffect(() => {
		load();
	}, []);

	return objects.map((item, index) => {
		if (item?.changeable == undefined) {
			if (item.src.includes(item.uuid)) {
				item.changeable = true;
			} else {
				item.changeable = false;
			}
		}
		const icon_type = () => {
			if (item.type == "video") {
				return <FaVideo className="icon_type" />;
			}
			if (item.type == "image") {
				return <FaRegImage className="icon_type" />;
			}
			return <FaCodepen className="icon_type" />;
		};
		return (
			<div key={index} className="items list_obj">
				<div className="w-30">
					{item.type === "video" && <video src={item?.src} />}
					{item.type === "image" && <img src={item?.src} alt="" />}
					{item.type !== "image" && item.type !== "video" && (
						<model-viewer poster={defaultModel} src={item?.src} />
					)}
				</div>
				<div className="w-70">
					<h3 className="mb-3">{item?.name}</h3>
					{icon_type()}
					<label className="checkbox_Url_change">
						<input
							className="largerCheckbox"
							type="checkbox"
							name="public"
							checked={item?.changeable}
							onChange={(e) => handleChangeable(item, e)}
						/>
						<span className="textCheckbox">
							{t("manager.POPUP_OBJECT__URL_CHANEABLE")}
						</span>
					</label>
				</div>
			</div>
		);
	});
};

export default ObjectListModal;
