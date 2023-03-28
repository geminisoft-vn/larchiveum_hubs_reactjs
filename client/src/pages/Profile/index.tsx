import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// import Popup from "../../../../react-components/popup/popup";
import { Button, Header, Stack } from "src/components";
import { getLanguage, setLanguage } from "src/language";
import AvatarService from "src/utilities/apiServices/AvatarService";
import UserService from "src/utilities/apiServices/UserService";
import Store from "src/utilities/store";
import Validator from "src/utilities/validator";

import AvatarPreview from "./components/AvatarPreview";
import GeneralPreview from "./components/GeneralPreview";

const ProfilePage = () => {
	const user = Store.getUser();
	const { t } = useTranslation();

	const navigate = useNavigate();

	const [avatars, setAvatars] = useState([]);
	const [avatar, setAvatar] = useState(null);
	const [displayName, setDisplayName] = useState(null);

	const [isLoading, setIsLoading] = useState(true);
	const [isOpenPopupChangeAvatar, setIsOpenPopupChangeAvatar] = useState(false);
	const [isOpenPopupCreateAvatar, setIsOpenPopupCreateAvatar] = useState(false);
	// const [isOpenPopupChangeDisplayName, setIsOpenPopupChangeDisplayName] = useState(false);

	useEffect(() => {
		AvatarService.getListAvatar().then((response) => {
			if (response.result == "ok") {
				const avatars = response.data;
				loadFromLocalStorage(avatars);
				setLanguage(getLanguage());
				setIsLoading(false);
			} else {
				alert("Get list avatar fail");
			}
		});
	}, []);

	function loadFromLocalStorage(avatars) {
		const store = JSON.parse(
			window.localStorage.getItem("___hubs_store") || "",
		);
		const user = Store.getUser();

		if (user) {
			// if don't have user
			// + displayName
			//    -> set displayName by displayName of user -> save to local
			// + avatar
			//    -> check user avatar
			//    + if user has avatar -> set avatar by avatar of user
			//    + else -> check user.avatarId
			//        + if user.avatarId not null -> get avatar is avatar in list ( which has avatarId = user.avatarId )
			//        + else -> set avatar is default (first avatar in list)
			//    -> save to local

			// + displayName
			if (user.displayName) {
				// -> set displayName by displayName of user -> save to local
				store.profile.displayName = user.displayName;
				setDisplayName(store.profile.displayName);
			}

			// + avatar
			if (user.avatar) {
				// -> if user has avatar -> set avatar by avatar of user
				const { avatar } = user;
				setAvatar({ ...avatar });
			} else {
				// check user.avatarId
				let avatar;
				if (user.avatarId) {
					// -> get avatar is avatar in list ( which has avatarId = user.avatarId )
					avatar = avatars.find((avt) => avt.id == user.avatarId);
				} else {
					// -> set avatar is default (first avatar in list)
					avatar = avatars[0];
				}
				setAvatar({ ...avatar });
			}
		} else {
			// if don't have user
			// + displayName
			//    -> if have displayName in local -> set displayName by displayName in local
			//    -> else -> set default displayName -> save to local
			// + avatar
			//    -> if have avatar in local -> set avatar by avatar in local
			//    -> else -> set default avatar (first avatar in avatars) -> save to local

			// + displayName
			if (store.profile.displayName) {
				// -> if have displayName in local -> set displayName by displayName in local
				setDisplayName(store.profile.displayName);
			} else {
				// -> else -> set default displayName -> save to local
				store.profile.displayName = `Visitor-${moment().format(
					"YYYYMMDDhhmmss",
				)}`;
				setDisplayName(store.profile.displayName);
			}

			// + avatar
			if (store.profile.avatarId) {
				// -> if have avatar in local -> set avatar by avatar in local
				let avatar = avatars.find((avt) => avt.id == store.profile.avatarId);
				if (!avatar) {
					avatar = {
						isCustomAvatar: true,
						url: store.profile.avatarId,
					};
				}
				setAvatar({ ...avatar });
			} else {
				// -> else -> set default avatar (first avatar in avatars) -> save to local
				const avatar = avatars[0];
				setAvatar({ ...avatar });
			}
		}

		localStorage.setItem("___hubs_store", JSON.stringify(store));
	}

	const handleResultAvatar = (avatar) => {
		setAvatar({ ...avatar });
	};

	const handleResultDisplayName = (displayName) => {
		setDisplayName(displayName);
	};

	const handleChangeLanguage = (event) => {
		const lang = event.target.value;
		setLanguage(lang);
		setLanguage(lang);
	};

	return (
		<Stack direction="col" gap={2}>
			<div>
				<Button onClick={() => navigate(-1)}>{t("profile.BACK")}</Button>
			</div>
			<Stack direction="row" alignItems="stretch" gap={2} className="w-full">
				<AvatarPreview
					props={{
						avatar,
						handleOpenPopupChooseAvatar: () => {
							setIsOpenPopupChangeAvatar(true);
						},
						handleOpenPopupCreateAvatar: () => {
							setIsOpenPopupCreateAvatar(true);
						},
					}}
				/>
				<GeneralPreview
					props={{
						displayName,
						handleChange: handleResultDisplayName,
					}}
				/>
			</Stack>
			{/* {isOpenPopupChangeAvatar && (
				<PopupChangeAvatar
					props={{
						avatars,
						avatar,
						handleClose: () => {
							setIsOpenPopupChangeAvatar(false);
						},
						handleResult: handleResultAvatar,
					}}
				/>
			)} */}
			{/* {isOpenPopupCreateAvatar && (
				<PopupCreateAvatar
					props={{
						handleClose: () => {
							setIsOpenPopupCreateAvatar(false);
						},
						handleResult: (avatar) => {
							handleResultAvatar(avatar);
							setIsOpenPopupCreateAvatar(false);
						},
					}}
				/>
			)} */}
			{/* {isOpenPopupChangeDisplayName && (
                        <PopupChangeDisplayName props={{
                            displayName: displayName,
                            handleClose: ()=>{
                                setIsOpenPopupChangeDisplayName(false);
                            },
                            handleResult: (displayName)=>{
                                handleResultDisplayName(displayName);
                                setIsOpenPopupChangeDisplayName(false);
                            },
                        }}/>
                    )} */}
		</Stack>
	);
};

export default ProfilePage;
