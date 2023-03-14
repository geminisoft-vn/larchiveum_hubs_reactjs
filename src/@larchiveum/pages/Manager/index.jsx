import React, { useEffect, useState } from "react";
import "src/utils/theme";
import "src/react-components/styles/global.scss";
import "src/assets/larchiveum/manager.scss";
import "src/assets/larchiveum/loading.scss";
import "react-datetime/css/react-datetime.css";
import Store from "src/@larchiveum/utilities/store";
import ExhibitionsService from "src/@larchiveum/utilities/apiServices/ExhibitionsService";
import MediaService from "src/@larchiveum/utilities/apiServices/MediaService";
import ProjectService from "src/@larchiveum/utilities/apiServices/ProjectService";
import Popup from "src/react-components/popup/popup";
import AddIcon from "src/assets/larchiveum/add_black_24dp.svg";
import "reactjs-popup/dist/index.css";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "src/assets/larchiveum/default-image.png";
import defaultModel from "src/assets/larchiveum/model-default.png";
import defaultImage1 from "src/assets/larchiveum/siri.gif";
import Pagination from "src/@larchiveum/pagination/pagination";
import { Header } from "src/@larchiveum/components";
import { APP_ROOT } from "src/@larchiveum/utilities/constants";
import {
  FaUserFriends,
  FaRegCalendarAlt,
  FaLink,
  FaTools,
  FaVideo,
  FaRegImage,
  FaCodepen,
  FaListOl
} from "react-icons/fa";
import UserService from "src/@larchiveum/utilities/apiServices/UserService";
import { object } from "prop-types";
import Language from "src/@larchiveum/languages/language";
import { useTranslation } from "react-i18next";
import Datetime from "react-datetime";
import ExhibitionFormModal from "./components/ExhibitionFormModal";

const Manager = () => {
  toast.configure();
  const { t } = useTranslation();
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
    pagination: {}
  });

  const [projects, setProjects] = useState({
    data: [],
    pagination: {}
  });

  const [medias, setMedias] = useState({
    data: [],
    pagination: {}
  });

  const [objects, setObjects] = useState({
    data: [],
    pagination: {}
  });

  const [filterExhibitionList, setfilterExhibitionList] = useState({
    page: 1,
    pageSize: 4,
    sort: "id|desc", //format <attribute>|<order type>
    isAdmin: 1
  });

  const [filterProjectList, setfilterProjectList] = useState({
    page: 1,
    pageSize: 4,
    sort: "id|desc" //format <attribute>|<order type>
  });

  function auth() {
    const user = Store.getUser();
    return UserService.checkToken(user?.token)
      .then(res => {
        if (res.result == "ok") {
          if (res.data.id != user?.id) {
            Store.removeUser();
          }
          setIsLoading(false);
          setIsLoadingF(false);
        } else {
          setIsLoading(false);
          setIsLoadingF(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsLoadingF(false);
      });
  }

  useEffect(() => {
    auth();
    getAllExhibitions();
    const user = Store.getUser();
    if (user?.type == 5) {
      getAllProjects();
    }

    setLanguage(Language.getLanguage());
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
      ExhibitionsService.getAllWithAuthExhibitions(data).then(res => {
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
      ExhibitionsService.getAllScenes().then(res => {
        if (res.result == "ok") {
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
      ProjectService.getListProjectWithObjects(data).then(res => {
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

  const openPopupExhibition = exhibition => {
    if (exhibition) {
      setExhibition({
        id: exhibition.id,
        name: exhibition?.room?.name,
        description: exhibition?.room?.description,
        sceneId: exhibition.sceneId,
        startDate: exhibition.startDate,
        endDate: exhibition.endDate,
        public: exhibition.public,
        maxSize: exhibition.maxSize,
        enableFly: exhibition.enableFly,
        enablePinObjects: exhibition.enablePinObjects,
        enableSpawnAndMoveMedia: exhibition.enableSpawnAndMoveMedia,
        enableSpawnCamera: exhibition.enableSpawnCamera,
        enableSpawnDrawing: exhibition.enableSpawnDrawing,
        enableSpawnEmoji: exhibition.enableSpawnEmoji
      });
    } else {
      setExhibition({
        maxSize: 5
      });
    }
    setShouldActiveExhibitionForm(true);
  };

  const closePopupExhibition = () => {
    setShouldActiveExhibitionForm(false);
  };

  const openPopupPublic = exhibitionId => {
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

  const handleChangeLanguage = event => {
    const lang = event.target.value;
    setLanguage(lang);
    Language.setLanguage(lang);
  };

  const handleSignOut = () => {
    Store.removeUser();
    window.location.href = "/";
  };

  const handelSpoke = () => {
    window.open(APP_ROOT + "/spoke/projects/" + projectId, "_blank");
    setIsOpenPopupChangeMediaURLGuide(false);
  };

  const closePopupSpoke = () => {
    setIsOpenPopupChangeMediaURLGuide(false);
  };

  const openPopupCloseRoom = exhibitionId => {
    setExhibitionId(exhibitionId);
    setIsOpenPopupConfirmCloseExhibition(true);
  };

  const closePopupCloseRoom = () => {
    setIsOpenPopupConfirmCloseExhibition(false);
  };

  const openPopupOpenRoom = exhibitionId => {
    setExhibitionId(exhibitionId);
    setIsOpenPopupConfirmOpenExhibition(true);
  };

  const closePopupOpenRoom = () => {
    setIsOpenPopupConfirmOpenExhibition(false);
  };

  const openDeleteRoom = exhibitionId => {
    setExhibitionId(exhibitionId);
    setIsOpenPopupConfirmDeleteExhibition(true);
  };

  const openPopupCustomMedia = exhibitionId => {
    setExhibitionId(exhibitionId);
    if (exhibitionId) {
      MediaService.getListMedia(exhibitionId).then(res => {
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
      pagination: {}
    });
  };

  const openPopupCustomObject = ProjectId => {
    if (ProjectId) {
      setProjectId(ProjectId);
      ProjectService.getListObject(ProjectId).then(res => {
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
      pagination: {}
    });
  };

  const handelSaveMediaURL = () => {
    setIconLoaded(true);
    const data = medias.data.map(item => {
      return {
        id: item.uuid,
        url: item.url
      };
    });
    const dataString = JSON.stringify(data);
    MediaService.updateMediaMany(dataString).then(res => {
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
    list_uuid = objects.data.map(item => {
      if (item?.changeable == true) {
        return item.uuid;
      }
      return false;
    });
    const dataString = JSON.stringify(list_uuid);
    console.log(projectId);
    ProjectService.updateChangeableObjects(projectId, dataString).then(res => {
      if (res.result == "ok") {
        setIconLoaded(false);
        closePopupCustomObject();
        setIsOpenPopupChangeMediaURLGuide(true);
        toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
      } else {
        toast.error(t("manager.UPDATE_CHANGEABLE_OBJECTS_ERROR"), { autoClose: 5000 });
      }
    });
  };

  const deleteRoom = () => {
    setIsOpenPopupConfirmDeleteExhibition(false);
  };

  const ActionListRoom = () => {
    setIsLoading(true);
    getAllExhibitions();
    setIsListRoom(true);
    setIsListProject(false);
  };

  const ActionListProject = () => {
    setIsLoading(true);
    getAllProjects();
    setIsListRoom(false);
    setIsListProject(true);
  };

  const changePages = page => {
    setIsLoading(true);
    setfilterExhibitionList({
      ...filterExhibitionList,
      page
    });
  };

  const changePagesProject = page => {
    setIsLoading(true);
    setfilterProjectList({
      ...filterProjectList,
      page
    });
  };

  const handleChange = evt => {
    const name = evt.target.name;
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;

    if (name == "enableSpawnAndMoveMedia" && value == false) {
      exhibition.enableSpawnCamera = false;
      exhibition.enablePinObjects = false;
    }
    setExhibition({ ...exhibition, [name]: value });
  };

  const handleChangeDatetime = evt => {
    const name = evt.name;
    const value = evt.value;
    let utc = undefined;
    if (value) {
      utc = moment(value)
        .tz(moment.tz.guess())
        .utc()
        .format();
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
    const value = evt.target.value;
    media.url = value;
    media.check = "checking";
    setMedias({ ...medias });
    fetch(media.url)
      .then(response => {
        const contentType = response.headers.get("content-type");
        const type = contentType.split("/")[0];
        if (media.type.includes(type)) {
          media.check = "ok";
        } else {
          media.check = "fail";
        }
        setMedias({ ...medias });
      })
      .catch(error => {
        media.check = "fail";
        setMedias({ ...medias });
      });
  };

  const getSceneThumnail = sceneId => {
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
    const handleChangeSceneThubmnail = e => {
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
            {scenes.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
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
    ExhibitionsService.postCreateOne(data).then(res => {
      if (res.result == "ok") {
        toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
        setShouldActiveExhibitionForm(false);
        // setExhibitions([...exhibitions, res.data]);
        window.location.reload();
      } else {
        toast.error(t("manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__" + res.error.toUpperCase()), { autoClose: 5000 });
      }
    });
  };

  const handleEdit = () => {
    const data = exhibition;
    ExhibitionsService.putUpdateOne(data).then(res => {
      if (res.result == "ok") {
        exhibitions.data.forEach(exhibition => {
          if (exhibition.id == res.data.id) {
            toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
            setShouldActiveExhibitionForm(false);
            getAllExhibitions();
          }
        });
      } else {
        toast.error(t("manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__" + res.error.toUpperCase()), { autoClose: 5000 });
      }
    });
  };

  const handelTogglePublic = exhibitionId => {
    ExhibitionsService.patchTogglePublic(exhibitionId).then(res => {
      if (res.result == "ok") {
        exhibitions.data.forEach(exhibition => {
          if (exhibition.id == exhibitionId) {
            exhibition.public = res.data.public;
            toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
          }
        });
        setIsOpenPopupConfirmChangePublic(!isOpenPopupConfirmChangePublic);
      } else {
        toast.error(t("manager.CHANGE_EXHIBITION_PUBLIC_ERROR"), { autoClose: 5000 });
      }
    });
  };

  const handelToggleDeleteRoom = exhibitionId => {
    ExhibitionsService.deleteOneExhibition(exhibitionId).then(res => {
      if (res.result == "ok") {
        toast.success(t("manager.MESSAGE_SUCCESS"), { autoClose: 5000 });
        setIsOpenPopupConfirmDeleteExhibition(!isOpenPopupConfirmDeleteExhibition);
        getAllExhibitions();
      } else {
        toast.error(t("manager.DELETE_EXHIBITION_ERROR"), { autoClose: 5000 });
      }
    });
  };

  const handelCloseRoom = exhibitionId => {
    ExhibitionsService.closeOneExhibition(exhibitionId).then(res => {
      if (res.result == "ok") {
        exhibitions.data.forEach(exhibition => {
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

  const handelOpenRoom = exhibitionId => {
    ExhibitionsService.openOneExhibition(exhibitionId).then(res => {
      if (res.result == "ok") {
        exhibitions.data.forEach(exhibition => {
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

  const renderListMedia = () => {
    return (
      <>
        {mediaLoaded ? (
          <>
            {medias.data.map((item, index) => {
              if (item) {
                const Thubmnail = () => {
                  if (item.type == "video") {
                    return (
                      <>
                        <video src={item?.url} />
                      </>
                    );
                  } else if (item.type == "image") {
                    return (
                      <>
                        <img src={item?.url} />
                      </>
                    );
                  } else {
                    return <></>;
                  }
                };
                const icon_type = () => {
                  if (item.type == "video") {
                    return <FaVideo className="icon_type" />;
                  } else if (item.type == "image") {
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
                          onChange={e => handleChangeURL(item, e)}
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
  };

  const renderListObject = () => {
    return (
      <>
        {objectLoaded ? (
          <>
            {objects.data.map((item, index) => {
              if (item) {
                const Thubmnail = () => {
                  if (item.type == "video") {
                    return (
                      <>
                        <video src={item?.src} />
                      </>
                    );
                  } else if (item.type == "image") {
                    return (
                      <>
                        <img src={item?.src} />
                      </>
                    );
                  } else {
                    return (
                      <>
                        <model-viewer poster={defaultModel} src={item?.src} />
                      </>
                    );
                  }
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
                  } else if (item.type == "image") {
                    return <FaRegImage className="icon_type" />;
                  } else {
                    return <FaCodepen className="icon_type" />;
                  }
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
                          onChange={e => handleChangeable(item, e)}
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
  };

  const renderTabs = () => {
    const user = Store.getUser();
    if (user?.type == 5) {
      return (
        <>
          <div className="tabs-Admin">
            <button className={isListRoom ? "active" : ""} onClick={ActionListRoom}>
              {t("manager.LIST_EXHIBITION")}
            </button>
            <button className={isListProject ? "active" : ""} onClick={ActionListProject}>
              {t("manager.LIST_PROJECT")}
            </button>
          </div>
        </>
      );
    }
  };

  const renderExhibitions = () => {
    return (
      <>
        {exhibitionsLoaded ? (
          <>
            {t("manager.LIST_EXHIBITION")}
            <button
              className="btn btn-create"
              onClick={() => {
                openPopupExhibition();
                setExhibitionType("create");
              }}
            >
              <img src={AddIcon} />
            </button>
            {exhibitions.data.map((item, index) => {
              const PublishButton = () => {
                if (item.public == 1) {
                  return (
                    <button
                      className="btn btn-unpublish"
                      onClick={() => {
                        openPopupPublic(item.id);
                      }}
                      data-id-exhibition={item.id}
                    >
                      {t("manager.PRIVATE")}
                    </button>
                  );
                } else {
                  return (
                    <button
                      className="btn btn-publish"
                      onClick={() => {
                        openPopupPublic(item.id);
                      }}
                      data-id-exhibition={item.id}
                    >
                      {t("manager.PUBLIC")}
                    </button>
                  );
                }
              };

              const ClosedButton = () => {
                if (item.closed == 1) {
                  return (
                    <button
                      className="btn btn-open"
                      onClick={() => {
                        openPopupOpenRoom(item.id);
                      }}
                      data-id-exhibition={item.id}
                    >
                      {t("manager.OPEN_EXHIBITION")}
                    </button>
                  );
                } else {
                  return (
                    <button
                      className="btn btn-close"
                      onClick={() => {
                        openPopupCloseRoom(item.id);
                      }}
                      data-id-exhibition={item.id}
                    >
                      {t("manager.CLOSE_EXHIBITION")}
                    </button>
                  );
                }
              };

              if (item.room) {
                return (
                  <div key={index} className={"items"}>
                    <span className="name-tour">{item.name}</span>
                    <img src={getSceneThumnail(item ? item.sceneId : undefined)} alt="" />
                    <FaTools
                      className="icon_edit_media"
                      onClick={() => {
                        openPopupCustomMedia(item.id);
                      }}
                      data-id-exhibition={item.id}
                    />
                    <div className="content">
                      <div>
                        <span className="text-bold">{item?.room?.name}</span>
                      </div>
                      <div className="d-flex">
                        <FaLink className="IconFa" /> :{" "}
                        <span className="ml-1">
                          <a href={APP_ROOT + "/" + item.roomId} target="_blank" rel="noopener noreferrer">
                            {APP_ROOT + "/" + item.roomId}
                          </a>
                        </span>
                      </div>
                      <div className="d-flex">
                        <FaUserFriends className="IconFa" /> :{" "}
                        <span className="ml-1">
                          {" "}
                          {item.reservationCount}/{item.maxSize}
                        </span>
                      </div>
                      <div>
                        <div className="d-flex">
                          <FaRegCalendarAlt className="IconFa" /> :
                          <span className="ml-1">
                            {item.startDate
                              ? moment
                                  .utc(item.startDate)
                                  .local()
                                  .locale(Language.getLanguage())
                                  .format("L LT")
                              : `<${t("manager.NOT_SET")}>`}
                            <span style={{ padding: "0 10px" }}> {"-"} </span>
                            {item.endDate
                              ? moment
                                  .utc(item.endDate)
                                  .local()
                                  .locale(Language.getLanguage())
                                  .format("L LT")
                              : `<${t("manager.NOT_SET")}>`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="btn-action">
                      <PublishButton />
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          openPopupExhibition(item);
                          setExhibitionType("edit");
                        }}
                        data-id-exhibition={item.id}
                      >
                        {t("manager.EDIT")}
                      </button>
                      <ClosedButton />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className={"items"}>
                    <span className="name-tour">{t("manager.EXHIBITION_UNAVAILABLE")}</span>
                    <img src={defaultImage1} alt="" />
                    <div className="content">
                      <div>
                        <span className="text-bold">{t("manager.EXHIBITION_UNAVAILABLE")}</span>
                      </div>
                      <div className="d-flex">
                        <FaLink className="IconFa" /> :{" "}
                        <span className="ml-1">
                          <a href="#" target="_blank">
                            ...
                          </a>
                        </span>
                      </div>
                      <div className="d-flex">
                        <FaUserFriends className="IconFa" /> : <span className="ml-1">.src.</span>
                      </div>
                      <div>
                        <div className="d-flex">
                          <FaRegCalendarAlt className="IconFa" /> :
                          <span className="ml-1">
                            {moment
                              .utc(item.startDate)
                              .local()
                              .locale(Language.getLanguage())
                              .format("L LT")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="btn-action">
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          openDeleteRoom(item.id);
                        }}
                        data-id-exhibition={item.id}
                      >
                        {t("manager.DELETE")}
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </>
        ) : (
          <></>
        )}
        {exhibitionsLoaded ? (
          exhibitions.data.length > 0 ? (
            <Pagination pagination={exhibitions.pagination} callFetchList={changePages} />
          ) : null
        ) : null}
      </>
    );
  };

  const renderProjects = () => {
    return (
      <>
        {projectsLoaded ? (
          <>
            {t("manager.LIST_PROJECT")}
            {projects.data.map((item, index) => {
              let count_Image = 0;
              let count_Video = 0;
              let count_Model = 0;
              item?.objects
                .filter(item => item.type === "image")
                .map(item => {
                  count_Image++;
                });
              item?.objects
                .filter(item => item.type === "video")
                .map(item => {
                  count_Video++;
                });
              item?.objects
                .filter(item => item.type.includes("model"))
                .map(item => {
                  count_Model++;
                });
              return (
                <div key={item.id} className={"items"}>
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
        {projectsLoaded ? (
          projects.data.length > 0 ? (
            <Pagination pagination={projects.pagination} callFetchList={changePagesProject} />
          ) : null
        ) : null}
      </>
    );
  };

  const AccountPermision = () => {
    const user = Store.getUser();
    if (user?.type >= 3) {
      return (
        <div className="title">
          <div className="col">
            {isListRoom && renderExhibitions()}
            {isListProject && renderProjects()}
          </div>
        </div>
      );
    } else {
      window.location.href = "/";
      return <></>;
    }
  };

  const IAuth = () => {
    const user = Store.getUser();

    function checkCredentials() {
      if (window?.APP?.store?.state?.credentials?.email && window?.APP?.store?.state?.credentials?.token) {
        return true;
      }
      return false;
    }

    const MasterAdmin = () => {
      if (user?.type == 5) {
        return (
          <>
            <a className="gotospoke" href={"/?page=content"}>
              {t("manager.CONTENT")}
            </a>
            <a className="gotospoke" href={"/?page=manager"}>
              {t("manager.ROOM")}
            </a>
            <a className="gotospoke" href={checkCredentials() ? "/spoke" : "/signin"}>
              {t("manager.SPOKE")}
            </a>
            <a className="gotoadmin" href={checkCredentials() ? "/admin" : "/signin"}>
              {t("manager.ADMIN")}
            </a>
          </>
        );
      } else {
        return <></>;
      }
    };
    if (user) {
      return (
        <span className="display-name">
          <MasterAdmin />
          <span className="nameA">{user.displayName || user.email}</span> |{" "}
          <a className="gotohome" onClick={handleSignOut}>
            {t("manager.SIGN_OUT")}
          </a>
        </span>
      );
    } else {
      return <></>;
    }
  };

  if (isLoadingF) {
    return (
      <div className="loader-2">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32" />
          </svg>
        </div>
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64" />
          </svg>
        </div>
      </div>
    );
  } else {
    if (isLoading) {
      return (
        <div className="loader-1">
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72" />
            </svg>
          </div>
        </div>
      );
    } else {
      return (
        <>
          {shouldActiveExhibitionForm && (
            <ExhibitionFormModal
              isActive={shouldActiveExhibitionForm}
              setIsActive={setShouldActiveExhibitionForm}
              exhibitionType={exhibitionType}
            />
          )}

          {isOpenPopupConfirmChangePublic && (
            <Popup
              title={<>{t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__TITLE")}</>}
              size={"sm"}
              content={
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__MESSAGE")}
                </div>
              }
              actions={[
                {
                  text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CHANGE"),
                  class: "btn1",
                  callback: () => {
                    handelTogglePublic(exhibitionId);
                  }
                },
                {
                  text: t("manager.POPUP_CONFRIM_CHANGE_PUBLIC__CANCEL"),
                  class: "btn2",
                  callback: () => {
                    closePopupPublic();
                  }
                }
              ]}
              handleClose={closePopupPublic}
            />
          )}

          {isOpenPopupChangeMediaURLGuide && (
            <Popup
              title={<>{t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__TITLE")}</>}
              size={"sm"}
              content={
                <>
                  {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT")}
                  <ul>
                    <li>- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_1")}</li>
                    <li>- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_2")}</li>
                    <li>- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_3")}</li>
                    <li>- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_4")}</li>
                    <li>- {t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CONTENT_STEP_5")}</li>
                  </ul>
                </>
              }
              actions={[
                {
                  text: t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__GO_TO_SPOKE"),
                  class: "btn1",
                  callback: () => {
                    handelSpoke(projectId);
                  }
                },
                {
                  text: t("manager.POPUP_CHANGE_MEDIA_URL_GUIDE__CANCEL"),
                  class: "btn2",
                  callback: () => {
                    closePopupSpoke();
                  }
                }
              ]}
              handleClose={closePopupSpoke}
            />
          )}

          {isOpenPopupConfirmCloseExhibition && (
            <Popup
              title={<>{t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__TITLE")}</>}
              size={"sm"}
              content={
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__MESSAGE")}
                </div>
              }
              actions={[
                {
                  text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CLOSE"),
                  class: "btn1",
                  callback: () => {
                    handelCloseRoom(exhibitionId);
                  }
                },
                {
                  text: t("manager.POPUP_CONFRIM_CLOSE_EXHIBITION__CANCEL"),
                  class: "btn2",
                  callback: () => {
                    closePopupCloseRoom();
                  }
                }
              ]}
              handleClose={closePopupCloseRoom}
            />
          )}

          {isOpenPopupConfirmOpenExhibition && (
            <Popup
              title={<>{t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__TITLE")}</>}
              size={"sm"}
              content={
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__MESSAGE")}
                </div>
              }
              actions={[
                {
                  text: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__CLOSE"),
                  class: "btn1",
                  callback: () => {
                    handelOpenRoom(exhibitionId);
                  }
                },
                {
                  text: t("manager.POPUP_CONFRIM_OPEN_EXHIBITION__CANCEL"),
                  class: "btn2",
                  callback: () => {
                    closePopupOpenRoom();
                  }
                }
              ]}
              handleClose={closePopupOpenRoom}
            />
          )}

          {isOpenPopupConfirmDeleteExhibition && (
            <Popup
              title={<>{t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__TITLE")}</>}
              size={"sm"}
              content={
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__MESSAGE")}
                </div>
              }
              actions={[
                {
                  text: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__DELETE"),
                  class: "btn1",
                  callback: () => {
                    handelToggleDeleteRoom(exhibitionId);
                  }
                },
                {
                  text: t("manager.POPUP_CONFRIM_DELETE_EXHIBITION__CANCEL"),
                  class: "btn2",
                  callback: () => {
                    deleteRoom();
                  }
                }
              ]}
              handleClose={deleteRoom}
            />
          )}

          {isOpenPopupMedia && (
            <Popup
              size={"xl"}
              title={t("manager.POPUP_MEDIA__TITLE")}
              content={
                <>
                  <form className="create100-form validate-form d-flex form-custom-media" name="form">
                    <div className="w-100">
                      <div className="p-t-13 p-b-9">{renderListMedia()}</div>
                    </div>
                  </form>
                </>
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
                  }
                },
                {
                  text: t("manager.POPUP_MEDIA__CANCEL"),
                  class: "btn-cancle",
                  callback: () => {
                    closePopupCustomMedia();
                  }
                }
              ]}
              handleClose={() => {
                closePopupCustomMedia();
              }}
            />
          )}

          {isOpenPopupObject && (
            <Popup
              size={"xl"}
              title={"List Object"}
              content={
                <>
                  <form className="create100-form validate-form d-flex form-custom-media" name="form">
                    <div className="w-100">
                      <div className="p-t-13 p-b-9">{renderListObject()}</div>
                    </div>
                  </form>
                </>
              }
              actions={[
                {
                  text: iconLoaded ? <div className="lds-dual-ring" /> : <span>{t("manager.POPUP_OBJECT__SAVE")}</span>,
                  class: "btn-handle",
                  callback: () => {
                    handelOpenPopupChangeMediaURLGuide();
                  }
                },
                {
                  text: t("manager.POPUP_OBJECT__CANCEL"),
                  class: "btn-cancle",
                  callback: () => {
                    closePopupCustomObject();
                  }
                }
              ]}
              handleClose={() => {
                closePopupCustomObject();
              }}
            />
          )}

          <div className="manager-page">
            <Header />
            <div className="row_2">
              {renderTabs()}
              <AccountPermision />
            </div>
          </div>
        </>
      );
    }
  }
};

export default Manager;
