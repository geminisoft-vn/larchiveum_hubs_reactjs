import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import AvatarService from "src/api/AvatarService";
import UserService from "src/api/UserService";
import { useAppSelector } from "src/app/hooks";
import { Button, Header, Stack } from "src/components";
import { getUserInfo } from "src/features/user/selectors";
import { IAvatar } from "src/interfaces";
import { getLanguage, setLanguage } from "src/language";

import AvatarPickingModal from "./components/AvatarPickingModal";
import AvatarPreview from "./components/AvatarPreview";
import GeneralPreview from "./components/GeneralPreview";

const ProfilePage = () => {
	const user = useAppSelector(getUserInfo);
	const { t } = useTranslation();

	const navigate = useNavigate();

	const [avatar, setAvatar] = useState<IAvatar>();

	const [shouldOpenAvatarPickingModal, setShouldOpenAvatarPickingModal] =
		useState(false);

	const loadAvatar = () => {
		AvatarService.getOne(user.avatarId).then((json) => {
			if (json.result === "ok") {
				setAvatar(json.data);
			}
		});
	};

	console.log({ avatar });

	const handleOpenAvatarPickingModal = () => {
		setShouldOpenAvatarPickingModal(true);
	};

	useEffect(() => {
		loadAvatar();
	}, [user]);

	return (
		<>
			<Stack direction="col" gap={2}>
				<div>
					<Button onClick={() => navigate(-1)}>{t("profile.BACK")}</Button>
				</div>
				<Stack direction="row" alignItems="stretch" gap={2} className="w-full">
					<AvatarPreview
						avatar={avatar}
						handleOpenAvatarPickingModal={handleOpenAvatarPickingModal}
					/>
					<GeneralPreview defaultDisplayName={user.displayName} />
				</Stack>
			</Stack>
			{shouldOpenAvatarPickingModal && (
				<AvatarPickingModal
					isActive={shouldOpenAvatarPickingModal}
					setIsActive={setShouldOpenAvatarPickingModal}
					defaultAvatar={avatar}
					setAvatar={setAvatar}
				/>
			)}
		</>
	);
};

export default ProfilePage;
