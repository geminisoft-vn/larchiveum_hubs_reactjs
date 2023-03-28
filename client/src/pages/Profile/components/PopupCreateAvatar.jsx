const PopupCreateAvatar = (props) => {
	const user = Store.getUser();
	const { t } = useTranslation();

	const [avatarUrl, setAvatarUrl] = useState(null);
	const [isHiddenCreateButton, setIsHiddenCreateButton] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const handleClose = props?.handleClose;
	const handleResult = props?.handleResult;

	const handleCreateAvatar = () => {
		setIsSaving(true);
		if (user) {
			AvatarService.create({ url: avatarUrl })
				.then((response) => {
					setIsSaving(false);
					handleResult(response.data);
				})
				.catch((error) => {
					setIsSaving(false);
					console.log(error);
				});
		} else {
			setIsSaving(false);
			handleResult({
				isCustomAvatar: true,
				url: avatarUrl,
			});
		}
	};

	useEffect(() => {
		window.addEventListener("message", (event) => {
			if (
				event.origin.startsWith("https://larchiveum.ready") &&
				event.data.toString().includes(".glb")
			) {
				setAvatarUrl(event.data);
				setIsHiddenCreateButton(false);
			}
		});
	}, []);

	return (
		<Popup
			size="lg"
			title={<>Change Avatar</>}
			content={
				<div style={{ position: "relative", width: "100%", height: "60vh" }}>
					<iframe
						src="https://larchiveum.readyplayer.me/avatar?frameApi"
						width="100%"
						height="100%"
					/>
					{avatarUrl && (
						<div
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
								top: "0px",
								backgroundColor: "white",
							}}
						>
							<model-viewer
								style={{ width: "100%", height: "100%" }}
								src={avatarUrl}
								camera-controls
							/>
						</div>
					)}
				</div>
			}
			actions={[
				{
					text: isSaving ? "Saving..." : "Choose",
					class: "btn2",
					hidden: isHiddenCreateButton,
					callback: handleCreateAvatar,
				},
			]}
			handleClose={handleClose}
		/>
	);
};
