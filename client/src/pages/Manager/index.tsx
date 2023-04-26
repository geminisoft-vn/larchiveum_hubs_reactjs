import Exhibitions from "./components/Exhibitions";

const Manager = () => {
	// const getAllProjects = () => {
	// 	ProjectService.getListProjectWithObjects({
	// 		page: 1,
	// 		pageSize: 4,
	// 		sort: "id|desc", // format <attribute>|<order type>
	// 	}).then((res) => {
	// 		if (res.result === "ok") {
	// 			setProjects(res.data);
	// 			setProjectsLoaded(true);
	// 			setIsLoading(false);
	// 		} else {
	// 			toast.error(t("manage.GET_PROJECTS_ERROR"), { autoClose: 1000 });
	// 			setIsLoading(false);
	// 		}
	// 	});
	// };

	// const handleSpoke = () => {
	// 	window.open(`${APP_ROOT}/spoke/projects/${projectId}`, "_blank");
	// 	setIsOpenPopupChangeMediaURLGuide(false);
	// };

	// const openPopupCustomObject = (ProjectId) => {
	// 	if (ProjectId) {
	// 		setProjectId(ProjectId);
	// 		ProjectService.getListObject(ProjectId).then((res) => {
	// 			if (res.result === "ok") {
	// 				setObjects(res.data);
	// 				setObjectLoaded(true);
	// 			} else {
	// 				toast.error(t("manager.GET_OBJECTS_ERROR"), { autoClose: 1000 });
	// 				closePopupCustomObject();
	// 			}
	// 		});
	// 	}
	// 	setIsOpenPopupObject(true);
	// };

	// const handelSaveMediaURL = () => {
	// 	setIconLoaded(true);
	// 	const data = medias.data.map((item) => ({
	// 		id: item.uuid,
	// 		url: item.url,
	// 	}));
	// 	const dataString = JSON.stringify(data);
	// 	MediaService.updateMediaMany(dataString).then((res) => {
	// 		if (res.result === "ok") {
	// 			toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
	// 			setIconLoaded(false);
	// 		} else {
	// 			toast.error(t("manager.UPDATE_MEDIAS_ERROR"), { autoClose: 5000 });
	// 		}
	// 	});
	// };

	// const handleChangeable = (object, evt) => {
	// 	if (object.changeable == true) {
	// 		object.changeable = false;
	// 	} else {
	// 		object.changeable = true;
	// 	}
	// 	setObjects({ ...objects });
	// };

	// const handleChangeURL = (media, evt) => {
	// 	const { value } = evt.target;
	// 	media.url = value;
	// 	media.check = "checking";
	// 	setMedias({ ...medias });
	// 	fetch(media.url)
	// 		.then((response) => {
	// 			const contentType = response.headers.get("content-type");
	// 			const type = contentType.split("/")[0];
	// 			if (media.type.includes(type)) {
	// 				media.check = "ok";
	// 			} else {
	// 				media.check = "fail";
	// 			}
	// 			setMedias({ ...medias });
	// 		})
	// 		.catch((error) => {
	// 			media.check = "fail";
	// 			setMedias({ ...medias });
	// 		});
	// };

	// const renderListMedia = () => (
	// 	<>
	// 		{mediaLoaded ? (
	// 			<>
	// 				{medias.data.map((item, index) => {
	// 					if (item) {
	// 						const Thubmnail = () => {
	// 							if (item.type == "video") {
	// 								return <video src={item?.url} />;
	// 							}
	// 							if (item.type == "image") {
	// 								return <img src={item?.url} />;
	// 							}
	// 							return <></>;
	// 						};
	// 						const icon_type = () => {
	// 							if (item.type == "video") {
	// 								return <FaVideo className="icon_type" />;
	// 							}
	// 							if (item.type == "image") {
	// 								return <FaRegImage className="icon_type" />;
	// 							}
	// 						};

	// 						return (
	// 							<div key={index} className="items">
	// 								<div className="w-30">{Thubmnail()}</div>
	// 								<div className="w-70">
	// 									<h3 className="mb-3">{item?.name}</h3>
	// 									{icon_type()}
	// 									<div className="wrap-input100 validate-input">
	// 										<input
	// 											className="input100"
	// 											type="text"
	// 											name="src"
	// 											placeholder="URL"
	// 											onChange={(e) => handleChangeURL(item, e)}
	// 											value={item?.url}
	// 										/>
	// 										<span className="focus-input100" />
	// 									</div>
	// 									{item?.check != "cheking" ? (
	// 										""
	// 									) : (
	// 										<span>{t("manager.POPUP_MEDIA__URL_CORRECT")}</span>
	// 									)}
	// 									{item?.check != "fail" ? (
	// 										""
	// 									) : (
	// 										<span>{t("manager.POPUP_MEDIA__URL_INCORRECT")}</span>
	// 									)}
	// 								</div>
	// 							</div>
	// 						);
	// 					}
	// 				})}
	// 			</>
	// 		) : (
	// 			<></>
	// 		)}
	// 	</>
	// );

	// const renderListObject = () => (
	// 	<>
	// 		{objectLoaded ? (
	// 			<>
	// 				{objects.data.map((item, index) => {
	// 					if (item) {
	// 						const Thubmnail = () => {
	// 							if (item.type == "video") {
	// 								return <video src={item?.src} />;
	// 							}
	// 							if (item.type == "image") {
	// 								return <img src={item?.src} />;
	// 							}
	// 							return <model-viewer poster={defaultModel} src={item?.src} />;
	// 						};
	// 						if (item?.changeable == undefined) {
	// 							if (item.src.includes(item.uuid)) {
	// 								item.changeable = true;
	// 							} else {
	// 								item.changeable = false;
	// 							}
	// 						}
	// 						const icon_type = () => {
	// 							if (item.type == "video") {
	// 								return <FaVideo className="icon_type" />;
	// 							}
	// 							if (item.type == "image") {
	// 								return <FaRegImage className="icon_type" />;
	// 							}
	// 							return <FaCodepen className="icon_type" />;
	// 						};
	// 						return (
	// 							<div key={index} className="items list_obj">
	// 								<div className="w-30">{Thubmnail()}</div>
	// 								<div className="w-70">
	// 									<h3 className="mb-3">{item?.name}</h3>
	// 									{icon_type()}
	// 									<label className="checkbox_Url_change">
	// 										<input
	// 											className="largerCheckbox"
	// 											type="checkbox"
	// 											name="public"
	// 											checked={item?.changeable}
	// 											onChange={(e) => handleChangeable(item, e)}
	// 										/>
	// 										<span className="textCheckbox">
	// 											{t("manager.POPUP_OBJECT__URL_CHANEABLE")}
	// 										</span>
	// 									</label>
	// 								</div>
	// 							</div>
	// 						);
	// 					}
	// 				})}
	// 			</>
	// 		) : (
	// 			<></>
	// 		)}
	// 	</>
	// );

	// const renderProjects = () => (
	// 	<>
	// 		{projectsLoaded ? (
	// 			<div className="flex flex-col gap-2">
	// 				<p className="text-center text-lg font-bold">
	// 					{t("manager.LIST_PROJECT")}
	// 				</p>
	// 				<div className="flex flex-col gap-2">
	// 					{projects.data.map((item, index) => {
	// 						let countImage = 0;
	// 						let countVideo = 0;
	// 						let countModel = 0;
	// 						item?.objects
	// 							.filter((item) => item.type === "image")
	// 							.map((item) => {
	// 								countImage++;
	// 							});
	// 						item?.objects
	// 							.filter((item) => item.type === "video")
	// 							.map((item) => {
	// 								countVideo++;
	// 							});
	// 						item?.objects
	// 							.filter((item) => item.type.includes("model"))
	// 							.map((item) => {
	// 								countModel++;
	// 							});
	// 						return (
	// 							<div
	// 								key={item.id}
	// 								className="grid grid-cols-12 rounded-lg bg-gray-100"
	// 							>
	// 								<div className="col-span-3 rounded-lg">
	// 									<img
	// 										className="h-full w-full"
	// 										src={item?.thumbnail_url}
	// 										alt=""
	// 									/>
	// 								</div>
	// 								<div className="col-span-6 flex flex-col justify-around p-4">
	// 									<p className="text-lg font-bold">{item?.name}</p>
	// 									<div className="flex items-center gap-4">
	// 										<div className="flex items-center gap-2">
	// 											{count_Image}
	// 											<FaVideo className="text-lg" />
	// 										</div>
	// 										<div className="flex items-center gap-2">
	// 											{count_Video}
	// 											<FaRegImage className="text-lg" />
	// 										</div>
	// 										<div className="flex items-center gap-2">
	// 											{count_Model}
	// 											<FaCodepen className="text-lg" />
	// 										</div>
	// 									</div>
	// 								</div>
	// 								<div className="col-span-3 flex items-center justify-center">
	// 									<FaListOl
	// 										className="text-lg"
	// 										onClick={() => {
	// 											openPopupCustomObject(item.id);
	// 										}}
	// 									/>
	// 								</div>
	// 							</div>
	// 						);
	// 					})}
	// 				</div>
	// 			</div>
	// 		) : (
	// 			<></>
	// 		)}
	// 		{/* {projectsLoaded ? (
	//         projects.data.length > 0 ? (
	//           <Pagination pagination={projects.pagination} callFetchList={changePagesProject} />
	//         ) : null
	//       ) : null} */}
	// 	</>
	// );

	// useEffect(() => {
	// 	// getAllExhibitions();
	// 	if (user?.type === 5) {
	// 		getAllProjects();
	// 	}

	// 	setLanguage(getLanguage());
	// }, [filterExhibitionList.page]);

	// useEffect(() => {
	// 	if (user?.type === 5) {
	// 		getAllProjects();
	// 	}
	// }, [filterProjectList.page]);

	return (
		<>
			{/* {isOpenPopupChangeMediaURLGuide && (
				<Popup
					title={<>{t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__TITLE")}</>}
					size="sm"
					content={
						<>
							{t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT")}
							<ul>
								<li>
									- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_1")}
								</li>
								<li>
									- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_2")}
								</li>
								<li>
									- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_3")}
								</li>
								<li>
									- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_4")}
								</li>
								<li>
									- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_5")}
								</li>
							</ul>
						</>
					}
					actions={[
						{
							text: t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__GO_TO_SPOKE"),
							class: "btn1",
							callback: () => {
								// handleSpoke(projectId);
							},
						},
						{
							text: t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CANCEL"),
							class: "btn2",
							callback: () => {
								closePopupSpoke();
							},
						},
					]}
					handleClose={closePopupSpoke}
				/>
			)}

			{isOpenPopupMedia && (
				<Popup
					size="xl"
					title={t("manager.POPUP_MEDIA__TITLE")}
					content={
						<form
							className="create100-form validate-form d-flex form-custom-media"
							name="form"
						>
							<div className="w-100">
								<div className="p-t-13 p-b-9">{renderListMedia()}</div>
							</div>
						</form>
					}
					actions={[
						{
							text: iconLoaded ? (
								<div className="lds-dual-ring" />
							) : (
								<span> {t("manager.POPUP_MEDIA__SAVE")} </span>
							),
							class: "btn-handle",
							callback: () => {
								handelSaveMediaURL();
							},
						},
						{
							text: t("manager.POPUP_MEDIA__CANCEL"),
							class: "btn-cancle",
							callback: () => {
								closePopupCustomMedia();
							},
						},
					]}
					handleClose={() => {
						closePopupCustomMedia();
					}}
				/>
			)}

			{isOpenPopupObject && (
				<Popup
					size="xl"
					title="List Object"
					content={
						<form
							className="create100-form validate-form d-flex form-custom-media"
							name="form"
						>
							<div className="w-100">
								<div className="p-t-13 p-b-9">{renderListObject()}</div>
							</div>
						</form>
					}
					actions={[
						{
							text: iconLoaded ? (
								<div className="lds-dual-ring" />
							) : (
								<span>{t("manager.POPUP_OBJECT__SAVE")}</span>
							),
							class: "btn-handle",
							callback: () => {
								handelOpenPopupChangeMediaURLGuide();
							},
						},
						{
							text: t("manager.POPUP_OBJECT__CANCEL"),
							class: "btn-cancle",
							callback: () => {
								closePopupCustomObject();
							},
						},
					]}
					handleClose={() => {
						closePopupCustomObject();
					}}
				/>
			)} */}

			<Exhibitions />
		</>
	);
};

export default Manager;
