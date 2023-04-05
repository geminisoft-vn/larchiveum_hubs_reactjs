import { useTranslation } from "react-i18next";

import { Button } from "src/components";

const AvatarPreview = (props) => {
	const { avatar, handleOpenAvatarPickingModal } = props;

	const { t } = useTranslation();

	return (
		<div className="flex flex-1 flex-col rounded-lg border">
			<div className="border-b p-2 text-center">
				{t("profile.AVATAR_PANEL__TITLE")}
			</div>
			<div style={{ width: "100%", height: 512 }}>
				<model-viewer
					style={{ display: "block", width: "100%", height: "100%" }}
					src={avatar?.isCustomAvatar ? avatar?.url : avatar?.gltfs?.avatar}
					camera-controls
				/>
			</div>
			<div className="flex justify-center border-t p-2">
				<Button onClick={handleOpenAvatarPickingModal}>
					{t("profile.AVATAR_PANEL__CHOOSE_AVATAR")}
				</Button>
			</div>
		</div>
	);
};

export default AvatarPreview;
