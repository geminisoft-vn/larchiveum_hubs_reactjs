import { useTranslation } from "react-i18next";

import { Button } from "src/components";

const AvatarPreview = (props) => {
	const { handleOpenPopupChooseAvatar } = props;

	const { t } = useTranslation();

	const avatar = props?.avatar;

	return (
		<div className="flex-1 border rounded-lg flex flex-col">
			<div className="border-b p-2 text-center">
				{t("profile.AVATAR_PANEL__TITLE")}
			</div>
			<div style={{ width: "100%", height: 512 }}>
				<model-viewer
					style={{ width: "100%", height: "100%" }}
					src={avatar?.isCustomAvatar ? avatar?.url : avatar?.gltfs?.avatar}
					camera-controls
				/>
			</div>
			<div className="border-t p-2 flex justify-center">
				<Button onClick={handleOpenPopupChooseAvatar}>
					{t("profile.AVATAR_PANEL__CHOOSE_AVATAR")}
				</Button>
			</div>
		</div>
	);
};

export default AvatarPreview;
