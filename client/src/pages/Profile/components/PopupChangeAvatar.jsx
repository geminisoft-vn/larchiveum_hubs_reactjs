const PopupChangeAvatar = (props) => {
	const user = Store.getUser();
	const { t } = useTranslation();

	const [avatars, setAvatars] = useState([]);
	const [avatar, setAvatar] = useState(props?.avatar);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const handleClose = props?.handleClose;
	const handleResult = props?.handleResult;

	const handleChangeAvatar = (avatar) => {
		setIsSaving(true);
		const store = JSON.parse(localStorage.getItem("___hubs_store"));
		const user = Store.getUser();
		// -> set avatar -> save to local
		// -> check user
		//      + if have user -> call API change update user

		// -> save to local
		if (avatar.isCustomAvatar) {
			store.profile.avatarId = avatar.url;
		} else {
			store.profile.avatarId = avatar.id;
		}
		localStorage.setItem("___hubs_store", JSON.stringify(store));

		// check user
		if (user) {
			// + if have user -> call API change update user
			UserService.update(user.id, {
				avatarId: avatar.id,
			})
				.then((response) => {
					if (response.result == "ok") {
						Store.setUser(response.data);
						handleResult(avatar);
						setIsSaving(false);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			handleResult(avatar);
			setIsSaving(false);
		}
	};

	let selectedAvatar = avatar;

	useEffect(() => {
		loadAvatars();
	}, []);

	function loadAvatars() {
		AvatarService.getListAvatar()
			.then((response) => {
				if (response.result == "ok") {
					const avatars = response.data;
					setAvatars(avatars);
				} else {
					alert("Get list avatars fail");
				}
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				alert("Load list avatar fail !");
			});
	}

	const handleSelectAvatar = (e, avt) => {
		const elements = document.querySelectorAll(".preview-avatar");
		for (const element of elements) {
			element.style.border = "1px solid gray";
		}
		e.currentTarget.style.border = "4px solid blue";
		selectedAvatar = avt;
	};

	const handleConfirmSelectAvatar = () => {
		handleChangeAvatar(selectedAvatar);
		handleClose();
	};

	return (
		<Popup
			key="popup-change-avatar"
			size="lg"
			title={<>{t("profile.POPUP_CHANGE_AVATAR__TITLE")}</>}
			content={
				<div
					style={{
						width: "100%",
						overflowY: "auto",
						whiteSpace: "nowrap",
						maxHeight: "60vh",
						height: "60vh",
					}}
				>
					{isLoading ? (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								height: "100%",
							}}
						>
							<span>{t("profile.POPUP_CHANGE_AVATAR__LOADING")}</span>
						</div>
					) : (
						<div>
							{avatars.map((avt) => (
								<div
									key={avt.id}
									className="preview-avatar"
									onClick={(e) => {
										handleSelectAvatar(e, avt);
									}}
									style={{
										height: "200px",
										margin: "2%",
										float: "left",
										width: "21%",
										border:
											avt.id == avatar.id ? "4px solid blue" : "1px solid gray",
										backgroundColor: "whitesmoke",
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
								</div>
							))}
						</div>
					)}
				</div>
			}
			handleClose={handleClose}
			actions={[
				{
					text: isSaving
						? t("profile.POPUP_CHANGE_AVATAR__SAVING")
						: t("profile.POPUP_CHANGE_AVATAR__SAVE"),
					class: "btn2",
					callback: () => {
						handleConfirmSelectAvatar();
					},
				},
				{
					text: t("profile.POPUP_CHANGE_AVATAR__CANCEL"),
					class: "btn2",
					callback: () => {
						handleClose(false);
					},
				},
			]}
		/>
	);
};
