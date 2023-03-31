import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCodepen, FaLink, FaListOl, FaRegCalendarAlt, FaRegImage, FaTools, FaUserFriends, FaVideo } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import moment from "moment-timezone";

import ExhibitionsService from "src/api/ExhibitionsService";
import MediaService from "src/api/MediaService";
import ProjectService from "src/api/ProjectService";
import UserService from "src/api/UserService";
// import Popup from "../../../../react-components/popup/popup";
import AddIcon from "src/assets/larchiveum/add_black_24dp.svg";
import defaultImage from "src/assets/larchiveum/default-image.png";
import defaultModel from "src/assets/larchiveum/model-default.png";
import { Header } from "src/components";
import { openModal } from "src/features/modal/ModalSlice";
import { getLanguage } from "src/language";
import { APP_ROOT } from "src/utilities/constants";
import Store from "src/utilities/store";

import Exhibition from "./components/Exhibition";
import ExhibitionFormModal from "./components/ExhibitionFormModal";

const Manager = () => {
	const { t } = useTranslation();
	const { search } = useLocation();
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();

	const [scenes, setScenes] = useState([]);
	const [exhibitionsLoaded, setExhibitionsLoaded] = useState(false);
	const [projectsLoaded, setProjectsLoaded] = useState(true);
	const [objectLoaded, setObjectLoaded] = useState(false);
	const [mediaLoaded, setMediaLoaded] = useState(false);
	const [iconLoaded, setIconLoaded] = useState(false);
	const [shouldActiveExhibitionForm, setShouldActiveExhibitionForm] = useState(false);
	const [isOpenPopupConfirmCloseExhibition, setIsOpenPopupConfirmCloseExhibition] = useState(false);
	const [isOpenPopupConfirmOpenExhibition, setIsOpenPopupConfirmOpenExhibition] = useState(false);
	const [isOpenPopupConfirmDeleteExhibition, setIsOpenPopupConfirmDeleteExhibition] = useState(false);
	const [isOpenPopupConfirmChangePublic, setIsOpenPopupConfirmChangePublic] = useState(false);
	const [isOpenPopupChangeMediaURLGuide, setIsOpenPopupChangeMediaURLGuide] = useState(false);
	const [isOpenPopupMedia, setIsOpenPopupMedia] = useState(false);
	const [isOpenPopupObject, setIsOpenPopupObject] = useState(false);
	const [exhibition, setExhibition] = useState(undefined);
	const [exhibitionType, setExhibitionType] = useState("create");
	const [exhibitionId, setExhibitionId] = useState(undefined);
	const [projectId, setProjectId] = useState(undefined);
	const [isLoadingF, setIsLoadingF] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isListRoom, setIsListRoom] = useState(true);
	const [isListProject, setIsListProject] = useState(false);
	const [language, setLanguage] = useState("en");

	const [exhibitions, setExhibitions] = useState({
		data: [],
		pagination: {},
	});

	const [projects, setProjects] = useState({
		data: [],
		pagination: {},
	});

	const [medias, setMedias] = useState({
		data: [],
		pagination: {},
	});

	const [objects, setObjects] = useState({
		data: [],
		pagination: {},
	});

	const [filterExhibitionList, setfilterExhibitionList] = useState({
		page: 1,
		pageSize: 4,
		sort: "id|desc", // format <attribute>|<order type>
		isAdmin: 1,
	});

	const [filterProjectList, setfilterProjectList] = useState({
		page: 1,
		pageSize: 4,
		sort: "id|desc", // format <attribute>|<order type>
	});

	useEffect(() => {
		getAllExhibitions();
		const user = Store.getUser();
		if (user?.type === 5) {
			getAllProjects();
		}

		setLanguage(getLanguage());
	}, [filterExhibitionList.page]);

	useEffect(() => {
		const user = Store.getUser();
		if (user?.type == 5) {
			getAllProjects();
		}
	}, [filterProjectList.page]);

	const getAllExhibitions = () => {
		const user = Store.getUser();
		const data = filterExhibitionList;
		if (user) {
			ExhibitionsService.getAllWithAuthExhibitions(data).then((res) => {
				if (res.result == "ok") {
					setExhibitions(res.data);
					setExhibitionsLoaded(true);
					setIsLoading(false);
					setIsLoadingF(false);
				} else {
					toast.error(t("manage.GET_EXHIBITIONS_ERROR"), { autoClose: 1000 });
					setIsLoading(false);
					setIsLoadingF(false);
				}
			});
			ExhibitionsService.getAllScenes().then((res) => {
				if (res.result == "ok") {
					res.data = res.data.map((item) => ({
						...item,
						label: item.name,
					}));
					setScenes(res.data);
				} else {
					toast.error(t("manage.GET_SCENES_ERROR"), { autoClose: 1000 });
				}
			});
		}
	};

	const getAllProjects = () => {
		const Auth = Store.getUser();
		const data = filterProjectList;
		if (Auth) {
			ProjectService.getListProjectWithObjects(data).then((res) => {
				if (res.result == "ok") {
					setProjects(res.data);
					setProjectsLoaded(true);
					setIsLoading(false);
				} else {
					toast.error(t("manage.GET_PROJECTS_ERROR"), { autoClose: 1000 });
					setIsLoading(false);
				}
			});
		}
	};

	const closePopupExhibition = () => {
		setShouldActiveExhibitionForm(false);
	};

	const handleOpenPublicModal = (exhibitionId) => {
		dispatch(
			openModal({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__TITLE"),
				body: (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__MESSAGE")}
					</div>
				),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CHANGE"),
						class: "btn1",
						callback: () => {
							handelTogglePublic(exhibitionId);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CANCEL"),
						class: "btn2",
						callback: () => {
							closePopupPublic();
						},
					},
				],
			}),
		);
		setExhibitionId(exhibitionId);
		setIsOpenPopupConfirmChangePublic(true);
	};

	const closePopupPublic = () => {
		setIsOpenPopupConfirmChangePublic(false);
	};

	// const openPopupSpoke = ProjectId => {
	//   setExhibitionId(ProjectId);
	//   setIsOpenPopupChangeMediaURLGuide(true);
	// };

	const handleChangeLanguage = (event) => {
		const lang = event.target.value;
		setLanguage(lang);
		Language.setLanguage(lang);
	};

	const handleSignOut = () => {
		Store.removeUser();
		window.location.href = "/";
	};

	const handelSpoke = () => {
		window.open(`${APP_ROOT}/spoke/projects/${projectId}`, "_blank");
		setIsOpenPopupChangeMediaURLGuide(false);
	};

	const closePopupSpoke = () => {
		setIsOpenPopupChangeMediaURLGuide(false);
	};

	const openPopupCloseRoom = (exhibitionId) => {
		dispatch(
			openModal({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__TITLE"),
				body: (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__MESSAGE")}
					</div>
				),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CLOSE"),
						className: "",
						callback: () => {
							handelCloseRoom(exhibitionId);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CANCEL"),
						className: "",
						callback: () => {
							closePopupCloseRoom();
						},
					},
				],
			}),
		);
		setExhibitionId(exhibitionId);
		setIsOpenPopupConfirmCloseExhibition(true);
	};

	const closePopupCloseRoom = () => {
		setIsOpenPopupConfirmCloseExhibition(false);
	};

	const openPopupOpenRoom = (exhibitionId) => {
		dispatch(
			openModal({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__TITLE"),
				body: (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__MESSAGE")}
					</div>
				),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__CLOSE"),
						className: "btn1",
						callback: () => {
							handelOpenRoom(exhibitionId);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__CANCEL"),
						className: "btn2",
						callback: () => {
							closePopupOpenRoom();
						},
					},
				],
			}),
		);
		setExhibitionId(exhibitionId);
		setIsOpenPopupConfirmOpenExhibition(true);
	};

	const closePopupOpenRoom = () => {
		setIsOpenPopupConfirmOpenExhibition(false);
	};

	const openDeleteRoom = (exhibitionId) => {
		dispatch(
			openModal({
				isActive: true,
				title: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__TITLE"),
				body: (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__MESSAGE")}
					</div>
				),
				actions: [
					{
						text: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__DELETE"),
						className: "btn1",
						callback: () => {
							handelToggleDeleteRoom(exhibitionId);
						},
					},
					{
						text: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__CANCEL"),
						className: "btn2",
						callback: () => {
							deleteRoom();
						},
					},
				],
			}),
		);
		setExhibitionId(exhibitionId);
		setIsOpenPopupConfirmDeleteExhibition(true);
	};

	const openPopupCustomMedia = (exhibitionId) => {
		setExhibitionId(exhibitionId);
		if (exhibitionId) {
			MediaService.getListMedia(exhibitionId).then((res) => {
				if (res.result == "ok") {
					setMedias(res.data);
					setMediaLoaded(true);
				} else {
					toast.error(t("manage.GET_MEDIAS_ERROR"), { autoClose: 3000 });
					closePopupCustomMedia();
				}
			});
		}
		setIsOpenPopupMedia(true);
	};

	const closePopupCustomMedia = () => {
		setIsOpenPopupMedia(false);
		setMedias({
			data: [],
			pagination: {},
		});
	};

	const openPopupCustomObject = (ProjectId) => {
		if (ProjectId) {
			setProjectId(ProjectId);
			ProjectService.getListObject(ProjectId).then((res) => {
				if (res.result == "ok") {
					setObjects(res.data);
					setObjectLoaded(true);
				} else {
					toast.error(t("manager.GET_OBJECTS_ERROR"), { autoClose: 1000 });
					closePopupCustomObject();
				}
			});
		}
		setIsOpenPopupObject(true);
	};

	const closePopupCustomObject = () => {
		setIsOpenPopupObject(false);
		setObjects({
			data: [],
			pagination: {},
		});
	};

	const handelSaveMediaURL = () => {
		setIconLoaded(true);
		const data = medias.data.map((item) => ({
			id: item.uuid,
			url: item.url,
		}));
		const dataString = JSON.stringify(data);
		MediaService.updateMediaMany(dataString).then((res) => {
			if (res.result == "ok") {
				toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
				setIconLoaded(false);
			} else {
				toast.error(t("manager.UPDATE_MEDIAS_ERROR"), { autoClose: 5000 });
			}
		});
	};

	const handelOpenPopupChangeMediaURLGuide = () => {
		setIconLoaded(true);
		let list_uuid = [];
		list_uuid = objects.data.map((item) => {
			if (item?.changeable == true) {
				return item.uuid;
			}
			return false;
		});
		const dataString = JSON.stringify(list_uuid);
		console.log(projectId);
		ProjectService.updateChangeableObjects(projectId, dataString).then((res) => {
			if (res.result == "ok") {
				setIconLoaded(false);
				closePopupCustomObject();
				setIsOpenPopupChangeMediaURLGuide(true);
				toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
			} else {
				toast.error(t("manager.UPDATE_CHANGEABLE_OBJECTS_ERROR"), {
					autoClose: 5000,
				});
			}
		});
	};

	const deleteRoom = () => {
		setIsOpenPopupConfirmDeleteExhibition(false);
	};

	const ActionListRoom = () => {
		getAllExhibitions();
	};

	const ActionListProject = () => {
		getAllProjects();
	};

	useEffect(() => {
		const tab = searchParams.get("tab");

		if (tab === "exhibition") ActionListRoom();
		if (tab === "project") ActionListProject();
	}, [search]);

	const changePages = (page) => {
		setIsLoading(true);
		setfilterExhibitionList({
			...filterExhibitionList,
			page,
		});
	};

	const changePagesProject = (page) => {
		setIsLoading(true);
		setfilterProjectList({
			...filterProjectList,
			page,
		});
	};

	const handleChange = (evt) => {
		const { name } = evt.target;
		const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;

		if (name == "enableSpawnAndMoveMedia" && value == false) {
			exhibition.enableSpawnCamera = false;
			exhibition.enablePinObjects = false;
		}
		setExhibition({ ...exhibition, [name]: value });
	};

	const handleChangeDatetime = (evt) => {
		const { name } = evt;
		const { value } = evt;
		let utc;
		if (value) {
			utc = moment(value).tz(moment.tz.guess()).utc().format();
		}
		setExhibition({ ...exhibition, [name]: utc });
	};

	const handleChangeable = (object, evt) => {
		if (object.changeable == true) {
			object.changeable = false;
		} else {
			object.changeable = true;
		}
		setObjects({ ...objects });
	};

	const handleChangeURL = (media, evt) => {
		const { value } = evt.target;
		media.url = value;
		media.check = "checking";
		setMedias({ ...medias });
		fetch(media.url)
			.then((response) => {
				const contentType = response.headers.get("content-type");
				const type = contentType.split("/")[0];
				if (media.type.includes(type)) {
					media.check = "ok";
				} else {
					media.check = "fail";
				}
				setMedias({ ...medias });
			})
			.catch((error) => {
				media.check = "fail";
				setMedias({ ...medias });
			});
	};

	const getSceneThumnail = (sceneId) => {
		let thumbnailUrl = null;
		for (const scene of scenes) {
			if (scene.id === sceneId) {
				thumbnailUrl = scene.thumbnailUrl;
				break;
			} else if (sceneId === undefined) {
				thumbnailUrl = defaultImage;
			}
		}
		return thumbnailUrl;
	};

	const ListScenes = () => {
		const handleChangeSceneThubmnail = (e) => {
			for (const scene of scenes) {
				if (scene.id === e.target.value) {
					setExhibition({ ...exhibition, [e.target.name]: e.target.value });
				}
			}
		};

		return (
			<>
				<div className="wrap-input100 validate-input">
					<select
						id="sceneSelection"
						className="input100"
						name="sceneId"
						value={exhibition ? exhibition.sceneId : undefined}
						onChange={handleChangeSceneThubmnail}
					>
						<option>---{t("manager.POPUP_EXHIBITION__LIST_SCENE_DEFAULT_OPTION")}---</option>
						{scenes.map((item, index) => (
							<option key={index} value={item.id}>
								{item.name}
							</option>
						))}
					</select>
					<span className="focus-input100" />
				</div>
				<div className="p-t-13 p-b-9">
					<span className="txt1">{t("manager.POPUP_EXHIBITION__SCENE_THUMBNAIL")}</span>
				</div>
				<img className="f-image-thumbnail" src={getSceneThumnail(exhibition ? exhibition.sceneId : undefined)} alt="" />
			</>
		);
	};

	const handleCreate = () => {
		const data = exhibition;
		ExhibitionsService.postCreateOne(data).then((res) => {
			if (res.result == "ok") {
				toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
				setShouldActiveExhibitionForm(false);
				// setExhibitions([...exhibitions, res.data]);
				window.location.reload();
			} else {
				toast.error(t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__${res.error.toUpperCase()}`), {
					autoClose: 5000,
				});
			}
		});
	};

	const handleEdit = () => {
		const data = exhibition;
		ExhibitionsService.putUpdateOne(data).then((res) => {
			if (res.result == "ok") {
				exhibitions.data.forEach((exhibition) => {
					if (exhibition.id == res.data.id) {
						toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
						setShouldActiveExhibitionForm(false);
						getAllExhibitions();
					}
				});
			} else {
				toast.error(t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__${res.error.toUpperCase()}`), {
					autoClose: 5000,
				});
			}
		});
	};

	const handelTogglePublic = (exhibitionId) => {
		ExhibitionsService.patchTogglePublic(exhibitionId).then((res) => {
			if (res.result == "ok") {
				exhibitions.data.forEach((exhibition) => {
					if (exhibition.id == exhibitionId) {
						exhibition.public = res.data.public;
						toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
					}
				});
				setIsOpenPopupConfirmChangePublic(!isOpenPopupConfirmChangePublic);
			} else {
				toast.error(t("manager.CHANGE_EXHIBITION_PUBLIC_ERROR"), {
					autoClose: 5000,
				});
			}
		});
	};

	const handelToggleDeleteRoom = (exhibitionId) => {
		ExhibitionsService.deleteOneExhibition(exhibitionId).then((res) => {
			if (res.result == "ok") {
				toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
				setIsOpenPopupConfirmDeleteExhibition(!isOpenPopupConfirmDeleteExhibition);
				getAllExhibitions();
			} else {
				toast.error(t("manager.DELETE_EXHIBITION_ERROR"), { autoClose: 5000 });
			}
		});
	};

	const handelCloseRoom = (exhibitionId) => {
		ExhibitionsService.closeOneExhibition(exhibitionId).then((res) => {
			if (res.result == "ok") {
				exhibitions.data.forEach((exhibition) => {
					if (exhibition.id == exhibitionId) {
						exhibition.closed = res.data.closed;
						toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
					}
				});
				setIsOpenPopupConfirmCloseExhibition(!isOpenPopupConfirmCloseExhibition);
			} else {
				toast.error(t("manager.CLOSE_EXHIBITION_ERROR"), { autoClose: 5000 });
			}
		});
	};

	const handelOpenRoom = (exhibitionId) => {
		ExhibitionsService.openOneExhibition(exhibitionId).then((res) => {
			if (res.result == "ok") {
				exhibitions.data.forEach((exhibition) => {
					if (exhibition.id == exhibitionId) {
						exhibition.closed = res.data.closed;
						toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
					}
				});
				setIsOpenPopupConfirmOpenExhibition(!isOpenPopupConfirmOpenExhibition);
			} else {
				toast.error(t("manager.OPEN_EXHIBITION_ERROR"), { autoClose: 5000 });
			}
		});
	};

	const renderListMedia = () => (
		<>
			{mediaLoaded ? (
				<>
					{medias.data.map((item, index) => {
						if (item) {
							const Thubmnail = () => {
								if (item.type == "video") {
									return <video src={item?.url} />;
								}
								if (item.type == "image") {
									return <img src={item?.url} />;
								}
								return <></>;
							};
							const icon_type = () => {
								if (item.type == "video") {
									return <FaVideo className="icon_type" />;
								}
								if (item.type == "image") {
									return <FaRegImage className="icon_type" />;
								}
							};

							return (
								<div key={index} className="items">
									<div className="w-30">{Thubmnail()}</div>
									<div className="w-70">
										<h3 className="mb-3">{item?.name}</h3>
										{icon_type()}
										<div className="wrap-input100 validate-input">
											<input
												className="input100"
												type="text"
												name="src"
												placeholder="URL"
												onChange={(e) => handleChangeURL(item, e)}
												value={item?.url}
											/>
											<span className="focus-input100" />
										</div>
										{item?.check != "cheking" ? "" : <span>{t("manager.POPUP_MEDIA__URL_CORRECT")}</span>}
										{item?.check != "fail" ? "" : <span>{t("manager.POPUP_MEDIA__URL_INCORRECT")}</span>}
									</div>
								</div>
							);
						}
					})}
				</>
			) : (
				<></>
			)}
		</>
	);

	const renderListObject = () => (
		<>
			{objectLoaded ? (
				<>
					{objects.data.map((item, index) => {
						if (item) {
							const Thubmnail = () => {
								if (item.type == "video") {
									return <video src={item?.src} />;
								}
								if (item.type == "image") {
									return <img src={item?.src} />;
								}
								return <model-viewer poster={defaultModel} src={item?.src} />;
							};
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
									<div className="w-30">{Thubmnail()}</div>
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
											<span className="textCheckbox">{t("manager.POPUP_OBJECT__URL_CHANEABLE")}</span>
										</label>
									</div>
								</div>
							);
						}
					})}
				</>
			) : (
				<></>
			)}
		</>
	);

	const renderTabs = () => {
		const user = Store.getUser();
		if (parseInt(user?.type, 10) === 5) {
			return (
				<ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
					<li className="mr-2">
						<a
							href="?tab=exhibition"
							aria-current="page"
							className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
						>
							{t("manager.LIST_EXHIBITION")}
						</a>
					</li>
					<li className="mr-2">
						<a
							href="?tab=project"
							className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
						>
							{t("manager.LIST_PROJECT")}
						</a>
					</li>
				</ul>
			);
		}
		return <div />;
	};

	const renderProjects = () => (
		<>
			{projectsLoaded ? (
				<>
					{t("manager.LIST_PROJECT")}
					{projects.data.map((item, index) => {
						let count_Image = 0;
						let count_Video = 0;
						let count_Model = 0;
						item?.objects
							.filter((item) => item.type === "image")
							.map((item) => {
								count_Image++;
							});
						item?.objects
							.filter((item) => item.type === "video")
							.map((item) => {
								count_Video++;
							});
						item?.objects
							.filter((item) => item.type.includes("model"))
							.map((item) => {
								count_Model++;
							});
						return (
							<div key={item.id} className="items">
								<span className="name-tour">{item?.name}</span>
								<img src={item?.thumbnail_url} alt="" />
								<div className="content">
									<div>
										<span className="text-bold">{item?.name}</span>
										<div className="d-flex-icon">
											<span>
												{count_Image}
												<FaVideo className="icon" />
											</span>
											<span>
												{count_Video}
												<FaRegImage className="icon" />
											</span>
											<span>
												{count_Model}
												<FaCodepen className="icon" />
											</span>
										</div>
									</div>
								</div>
								<div className="btn-action">
									<FaListOl
										className="btn-list-object"
										onClick={() => {
											openPopupCustomObject(item.id);
										}}
									/>
								</div>
							</div>
						);
					})}
				</>
			) : (
				<></>
			)}
			{/* {projectsLoaded ? (
          projects.data.length > 0 ? (
            <Pagination pagination={projects.pagination} callFetchList={changePagesProject} />
          ) : null
        ) : null} */}
		</>
	);

	const AccountPermision = () => {
		const user = Store.getUser();
		if (parseInt(user?.type) >= 3) {
			return (
				<div className="title">
					<div className="col">
						{isListRoom && <Exhibitions />}
						{isListProject && renderProjects()}
					</div>
				</div>
			);
		}
		return <div />;
	};

	return (
		<>
			{/* {shouldActiveExhibitionForm && (
				<ExhibitionFormModal
					isActive={shouldActiveExhibitionForm}
					setIsActive={setShouldActiveExhibitionForm}
					exhibitionType={exhibitionType}
					scenes={scenes}
				/>
			)}

			{isOpenPopupConfirmChangePublic && (
				<Popup
					title={<>{t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__TITLE")}</>}
					size="sm"
					content={
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__MESSAGE")}
						</div>
					}
					actions={[
						{
							text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CHANGE"),
							class: "btn1",
							callback: () => {
								handelTogglePublic(exhibitionId);
							},
						},
						{
							text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CANCEL"),
							class: "btn2",
							callback: () => {
								closePopupPublic();
							},
						},
					]}
					handleClose={closePopupPublic}
				/>
			)}

			{isOpenPopupChangeMediaURLGuide && (
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
								handelSpoke(projectId);
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

			{isOpenPopupConfirmCloseExhibition && (
				<Popup
					title={<>{t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__TITLE")}</>}
					size="sm"
					content={
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__MESSAGE")}
						</div>
					}
					actions={[
						{
							text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CLOSE"),
							class: "btn1",
							callback: () => {
								handelCloseRoom(exhibitionId);
							},
						},
						{
							text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CANCEL"),
							class: "btn2",
							callback: () => {
								closePopupCloseRoom();
							},
						},
					]}
					handleClose={closePopupCloseRoom}
				/>
			)}

			{isOpenPopupConfirmOpenExhibition && (
				<Popup
					title={<>{t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__TITLE")}</>}
					size="sm"
					content={
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__MESSAGE")}
						</div>
					}
					actions={[
						{
							text: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__CLOSE"),
							class: "btn1",
							callback: () => {
								handelOpenRoom(exhibitionId);
							},
						},
						{
							text: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__CANCEL"),
							class: "btn2",
							callback: () => {
								closePopupOpenRoom();
							},
						},
					]}
					handleClose={closePopupOpenRoom}
				/>
			)}

			{isOpenPopupConfirmDeleteExhibition && (
				<Popup
					title={<>{t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__TITLE")}</>}
					size="sm"
					content={
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							{t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__MESSAGE")}
						</div>
					}
					actions={[
						{
							text: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__DELETE"),
							class: "btn1",
							callback: () => {
								handelToggleDeleteRoom(exhibitionId);
							},
						},
						{
							text: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__CANCEL"),
							class: "btn2",
							callback: () => {
								deleteRoom();
							},
						},
					]}
					handleClose={deleteRoom}
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

			<div className="flex flex-col gap-2">
				{renderTabs()}
				<AccountPermision />
			</div>
		</>
	);
};

export default Manager;
