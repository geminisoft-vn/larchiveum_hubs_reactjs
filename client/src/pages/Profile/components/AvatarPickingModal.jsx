import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import AvatarService from "src/api/AvatarService";
import UserService from "src/api/UserService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Modal } from "src/components";
import { getUserInfo } from "src/features/user/selectors";
import { updateUser } from "src/features/user/UserSlice";

const AvatarPickingModal = (props) => {
	const { isActive, setIsActive, defaultAvatar } = props;

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const user = useAppSelector(getUserInfo);

	const [avatars, setAvatars] = useState([]);
	const [selectedAvatar, setSelectedAvatar] = useState("");

	const handleChangeAvatar = () => {
		UserService.update(user.id, {
			avatarId: selectedAvatar.id,
		})
			.then((res) => {
				if (res.result === "ok") {
					dispatch(
						updateUser({
							avatarId: res.data.avatarId,
						}),
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadAvatars = () => {
		AvatarService.getListAvatar()
			.then((res) => {
				if (res.result === "ok") {
					setAvatars(res.data);
				}
			})
			.catch(() => {
				// alert("Load list avatar fail !");
			});
	};

	const handleCloseModal = () => {
		setIsActive(false);
	};

	useEffect(() => {
		loadAvatars();
	}, []);

	useEffect(() => {
		setSelectedAvatar(defaultAvatar);
	}, [defaultAvatar]);

	const handleSelectAvatar = (avt) => {
		setSelectedAvatar(avt);
	};

	const handleConfirmSelectAvatar = () => {
		handleChangeAvatar();
		handleCloseModal();
	};

	return (
		<Modal
			isActive={isActive}
			setIsActive={setIsActive}
			title={t("profile.POPUP_CHANGE_AVATAR__TITLE")}
			actions={[
				{
					text: t("profile.POPUP_CHANGE_AVATAR__SAVE"),
					className: "btn2",
					callback: () => {
						handleConfirmSelectAvatar();
					},
				},
				{
					text: t("profile.POPUP_CHANGE_AVATAR__CANCEL"),
					className: "btn2",
					callback: () => {
						handleCloseModal();
					},
				},
			]}
		>
			<div className="grid h-full w-full grid-cols-12 gap-2 overflow-y-auto">
				{avatars &&
					avatars.map((avt) => (
						<button
							key={avt.id}
							className={clsx(
								"col-span-3 w-full rounded-lg border bg-gray-100",
								selectedAvatar &&
									avt.id === selectedAvatar.id &&
									"border-blue-500",
							)}
							onClick={() => {
								handleSelectAvatar(avt);
							}}
						>
							{avt.isCustomAvatar ? (
								<model-viewer
									style={{ width: "100%", height: "100%" }}
									src={avt.url}
								/>
							) : (
								<img
									style={{ width: "100%", height: "100%" }}
									src={avt.images.preview.url}
									alt=""
								/>
							)}
						</button>
					))}
			</div>
		</Modal>
	);
};

export default AvatarPickingModal;
