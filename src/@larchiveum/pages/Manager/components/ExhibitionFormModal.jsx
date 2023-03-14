import React from "react";
import PropTypes from "prop-types";
// import "./ExhibitionFormModal.style.scss";

import { useTranslation } from "react-i18next";

import { Modal, TextField, DateTimePicker } from "src/@larchiveum/components";
import { Autocomplete, Stack, Switch } from "@mui/material";

const ExhibitionFormModal = props => {
  const { isActive, setIsActive, exhibition, exhibitionType } = props;

  const { t } = useTranslation();

  return (
    <Modal
      width={1024}
      isActive={isActive}
      setIsActive={setIsActive}
      title={
        exhibitionType == "edit" ? (
          <> {t("manager.POPUP_EXHIBITION__EDIT_TITLE")} </>
        ) : (
          <> {t("manager.POPUP_EXHIBITION__CREATE_TITLE")}</>
        )
      }
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField />
          <DateTimePicker />
          <DateTimePicker />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Stack direction="column">
            <TextField multiline rows={4} />
            <Stack direction="row">
              <Switch />
              <TextField />
            </Stack>
          </Stack>
          <Stack direction="column">
            <Autocomplete renderInput={params => <TextField {...params} />} />
          </Stack>
        </Stack>
      </Stack>
      {/* <form className="create100-form validate-form" name="form" style={{ maxHeight: "60vh", overflowY: "scroll" }}>
        <div className="d-flex">
          <div style={{ width: "40%", padding: "10px" }}>
            <div className="p-t-13 p-b-9">
              <span className="txt1">{t("manager.POPUP_EXHIBITION__NAME_LABEL")}</span>
            </div>
            <div className="wrap-input100 validate-input">
              <input {...register(exhibition.name)} placeholder={t("manager.POPUP_EXHIBITION__NAME_PLACEHOLDER")} />
              <span className="focus-input100" />
            </div>
            <div className="p-t-13 p-b-9">
              <span className="txt1">{t("manager.POPUP_EXHIBITION__DESCRIPTION_LABEL")}</span>
            </div>
            <div className="wrap-input100 validate-input">
              <textarea
                {...register(exhibition.description)}
                placeholder={t("manager.POPUP_EXHIBITION__DESCRIPTION_PLACEHOLDER")}
              />
              <span className="focus-input100" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "40%" }}>
                <div className="p-t-13 p-b-9">
                  <span className="txt1" style={{ fontSize: "13px" }}>
                    {t("manager.POPUP_EXHIBITION__PUBLIC")}
                  </span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    name="public"
                    checked={exhibition ? exhibition.public : undefined}
                    onChange={handleChange}
                  />
                  <span className="slider round" />
                </label>
              </div>
              <div style={{ width: "60%", paddingTop: "10px" }}>
                <div
                  style={{
                    float: "left",
                    height: "50px",
                    width: "40%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    paddingRight: "10px"
                  }}
                >
                  <span className="txt1">{t("manager.POPUP_EXHIBITION__MAX_SIZE")}</span>
                </div>
                <div className="wrap-input100 validate-input" style={{ float: "left", width: "60%" }}>
                  <input
                    className="input100"
                    type="number"
                    min={0}
                    max={50}
                    name="maxSize"
                    value={exhibition ? exhibition.maxSize : 5}
                    onChange={handleChange}
                  />
                  <span className="focus-input100" />
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "60%", padding: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="item-input" style={{ width: "48%" }}>
                <div className="p-t-13 p-b-9">
                  <span className="txt1">{t("manager.POPUP_EXHIBITION__START_DATE_LABEL")}</span>
                </div>
                <div className="wrap-input100 validate-input">
                  <Datetime
                    key={"input-start-date"}
                    value={
                      exhibition?.startDate
                        ? moment
                            .utc(exhibition.startDate)
                            .local()
                            .format("MM/DD/YYYY hh:mm a")
                        : undefined
                    }
                    onChange={value => {
                      handleChangeDatetime({
                        name: "startDate",
                        value: value
                      });
                    }}
                    timeFormat={true}
                    displayTimeZone={moment.tz.guess()}
                    closeOnSelect={true}
                    inputProps={{
                      placeholder: "MM/DD/YYYY hh:mm a",
                      className: "input100",
                      name: "startDate"
                    }}
                  />
                  <span className="focus-input100" />
                </div>
              </div>
              <div className="item-input" style={{ width: "48%" }}>
                <div className="p-t-13 p-b-9">
                  <span className="txt1">{t("manager.POPUP_EXHIBITION__END_DATE_LABEL")}</span>
                </div>
                <div className="wrap-input100 validate-input">
                  <Datetime
                    key={"input-end-date"}
                    value={
                      exhibition?.endDate
                        ? moment
                            .utc(exhibition.endDate)
                            .local()
                            .format("MM/DD/YYYY hh:mm a")
                        : undefined
                    }
                    onChange={value => {
                      handleChangeDatetime({
                        name: "endDate",
                        value: value
                      });
                    }}
                    timeFormat={true}
                    displayTimeZone={moment.tz.guess()}
                    closeOnSelect={true}
                    inputProps={{
                      placeholder: "MM/DD/YYYY hh:mm a",
                      className: "input100",
                      name: "endDate"
                    }}
                  />
                  <span className="focus-input100" />
                </div>
              </div>
            </div>
            <div className="p-t-13 p-b-9">
              <span className="txt1">{t("manager.POPUP_EXHIBITION__LIST_SCENE_LABEL")}</span>
            </div>
            <ListScenes />
          </div>
        </div>
        <div style={{ width: "100%", padding: "10px" }}>
          <span className="txt1">{t("manager.POPUP_EXHIBITION__ROOM_MEMBER_PERMISSIONS")}</span>
          <div style={{ position: "relative", width: "100%", height: "40px", marginTop: "10px" }}>
            <div style={{ width: "150px", float: "left" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  name="enableSpawnAndMoveMedia"
                  checked={exhibition ? exhibition.enableSpawnAndMoveMedia : false}
                  onChange={handleChange}
                />
                <span className="slider round" />
              </label>
            </div>
            <div style={{ float: "left" }}>
              <span>{t("manager.POPUP_EXHIBITION__CREATE_AND_MOVE_OBJECTS")}</span>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", height: "40px" }}>
            <div style={{ width: "150px", float: "left", paddingLeft: "50px" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  name="enableSpawnCamera"
                  disabled={!exhibition?.enableSpawnAndMoveMedia}
                  checked={exhibition ? exhibition.enableSpawnCamera : false}
                  onChange={handleChange}
                />
                <span className="slider round" />
              </label>
            </div>
            <div style={{ float: "left" }}>
              <span>{t("manager.POPUP_EXHIBITION__CREATE_CAMERAS")}</span>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", height: "40px" }}>
            <div style={{ width: "150px", float: "left", paddingLeft: "50px" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  name="enablePinObjects"
                  disabled={!exhibition?.enableSpawnAndMoveMedia}
                  checked={exhibition ? exhibition.enablePinObjects : false}
                  onChange={handleChange}
                />
                <span className="slider round" />
              </label>
            </div>
            <div style={{ float: "left" }}>
              <span>{t("manager.POPUP_EXHIBITION__PIN_OBJECTS")}</span>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", height: "40px" }}>
            <div style={{ width: "150px", float: "left" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  name="enableSpawnDrawing"
                  checked={exhibition ? exhibition.enableSpawnDrawing : false}
                  onChange={handleChange}
                />
                <span className="slider round" />
              </label>
            </div>
            <div style={{ float: "left" }}>
              <span>{t("manager.POPUP_EXHIBITION__CREATE_DRAWINGS")}</span>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", height: "40px" }}>
            <div style={{ width: "150px", float: "left" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  name="enableSpawnEmoji"
                  checked={exhibition ? exhibition.enableSpawnEmoji : false}
                  onChange={handleChange}
                />
                <span className="slider round" />
              </label>
            </div>
            <div style={{ float: "left" }}>
              <span>{t("manager.POPUP_EXHIBITION__CREATE_EMOJI")}</span>
            </div>
          </div>
          <div style={{ position: "relative", width: "100%", height: "40px" }}>
            <div style={{ width: "150px", float: "left" }}>
              <label className="switch">
                <input
                  type="checkbox"
                  name="enableFly"
                  checked={exhibition ? exhibition.enableFly : false}
                  onChange={handleChange}
                />
                <span className="slider round" />
              </label>
            </div>
            <div style={{ float: "left" }}>
              <span>{t("manager.POPUP_EXHIBITION__ALLOW_FLY")}</span>
            </div>
          </div>
        </div>
      </form> */}
    </Modal>

    // <Popup
    //   size={"xl"}
    //   title={
    //     exhibitionType == "edit" ? (
    //       <> {t("manager.POPUP_EXHIBITION__EDIT_TITLE")} </>
    //     ) : (
    //       <> {t("manager.POPUP_EXHIBITION__CREATE_TITLE")}</>
    //     )
    //   }
    //   content={
    //     <>
    //       <form className="create100-form validate-form" name="form" style={{ maxHeight: "60vh", overflowY: "scroll" }}>
    //         <div className="d-flex">
    //           <div style={{ width: "40%", padding: "10px" }}>
    //             <div className="p-t-13 p-b-9">
    //               <span className="txt1">{t("manager.POPUP_EXHIBITION__NAME_LABEL")}</span>
    //             </div>
    //             <div className="wrap-input100 validate-input">
    //               <input
    //                 className="input100"
    //                 type="text"
    //                 name="name"
    //                 value={exhibition ? exhibition.name : undefined}
    //                 onChange={handleChange}
    //                 placeholder={t("manager.POPUP_EXHIBITION__NAME_PLACEHOLDER")}
    //               />
    //               <span className="focus-input100" />
    //             </div>
    //             <div className="p-t-13 p-b-9">
    //               <span className="txt1">{t("manager.POPUP_EXHIBITION__DESCRIPTION_LABEL")}</span>
    //             </div>
    //             <div className="wrap-input100 validate-input">
    //               <textarea
    //                 className="textarea100"
    //                 name="description"
    //                 value={exhibition ? exhibition.description : undefined}
    //                 onChange={handleChange}
    //                 placeholder={t("manager.POPUP_EXHIBITION__DESCRIPTION_PLACEHOLDER")}
    //                 rows="10"
    //                 style={{ height: "205px" }}
    //               />
    //               <span className="focus-input100" />
    //             </div>
    //             <div style={{ display: "flex", justifyContent: "space-between" }}>
    //               <div style={{ width: "40%" }}>
    //                 <div className="p-t-13 p-b-9">
    //                   <span className="txt1" style={{ fontSize: "13px" }}>
    //                     {t("manager.POPUP_EXHIBITION__PUBLIC")}
    //                   </span>
    //                 </div>
    //                 <label className="switch">
    //                   <input
    //                     type="checkbox"
    //                     name="public"
    //                     checked={exhibition ? exhibition.public : undefined}
    //                     onChange={handleChange}
    //                   />
    //                   <span className="slider round" />
    //                 </label>
    //               </div>
    //               <div style={{ width: "60%", paddingTop: "10px" }}>
    //                 <div
    //                   style={{
    //                     float: "left",
    //                     height: "50px",
    //                     width: "40%",
    //                     display: "flex",
    //                     alignItems: "center",
    //                     justifyContent: "right",
    //                     paddingRight: "10px"
    //                   }}
    //                 >
    //                   <span className="txt1">{t("manager.POPUP_EXHIBITION__MAX_SIZE")}</span>
    //                 </div>
    //                 <div className="wrap-input100 validate-input" style={{ float: "left", width: "60%" }}>
    //                   <input
    //                     className="input100"
    //                     type="number"
    //                     min={0}
    //                     max={50}
    //                     name="maxSize"
    //                     value={exhibition ? exhibition.maxSize : 5}
    //                     onChange={handleChange}
    //                   />
    //                   <span className="focus-input100" />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div style={{ width: "60%", padding: "10px" }}>
    //             <div style={{ display: "flex", justifyContent: "space-between" }}>
    //               <div className="item-input" style={{ width: "48%" }}>
    //                 <div className="p-t-13 p-b-9">
    //                   <span className="txt1">{t("manager.POPUP_EXHIBITION__START_DATE_LABEL")}</span>
    //                 </div>
    //                 <div className="wrap-input100 validate-input">
    //                   <Datetime
    //                     key={"input-start-date"}
    //                     value={
    //                       exhibition?.startDate
    //                         ? moment
    //                             .utc(exhibition.startDate)
    //                             .local()
    //                             .format("MM/DD/YYYY hh:mm a")
    //                         : undefined
    //                     }
    //                     onChange={value => {
    //                       handleChangeDatetime({
    //                         name: "startDate",
    //                         value: value
    //                       });
    //                     }}
    //                     timeFormat={true}
    //                     displayTimeZone={moment.tz.guess()}
    //                     closeOnSelect={true}
    //                     inputProps={{
    //                       placeholder: "MM/DD/YYYY hh:mm a",
    //                       className: "input100",
    //                       name: "startDate"
    //                     }}
    //                   />
    //                   <span className="focus-input100" />
    //                 </div>
    //               </div>
    //               <div className="item-input" style={{ width: "48%" }}>
    //                 <div className="p-t-13 p-b-9">
    //                   <span className="txt1">{t("manager.POPUP_EXHIBITION__END_DATE_LABEL")}</span>
    //                 </div>
    //                 <div className="wrap-input100 validate-input">
    //                   <Datetime
    //                     key={"input-end-date"}
    //                     value={
    //                       exhibition?.endDate
    //                         ? moment
    //                             .utc(exhibition.endDate)
    //                             .local()
    //                             .format("MM/DD/YYYY hh:mm a")
    //                         : undefined
    //                     }
    //                     onChange={value => {
    //                       handleChangeDatetime({
    //                         name: "endDate",
    //                         value: value
    //                       });
    //                     }}
    //                     timeFormat={true}
    //                     displayTimeZone={moment.tz.guess()}
    //                     closeOnSelect={true}
    //                     inputProps={{
    //                       placeholder: "MM/DD/YYYY hh:mm a",
    //                       className: "input100",
    //                       name: "endDate"
    //                     }}
    //                   />
    //                   <span className="focus-input100" />
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="p-t-13 p-b-9">
    //               <span className="txt1">{t("manager.POPUP_EXHIBITION__LIST_SCENE_LABEL")}</span>
    //             </div>
    //             <ListScenes />
    //           </div>
    //         </div>
    //         <div style={{ width: "100%", padding: "10px" }}>
    //           <span className="txt1">{t("manager.POPUP_EXHIBITION__ROOM_MEMBER_PERMISSIONS")}</span>
    //           <div style={{ position: "relative", width: "100%", height: "40px", marginTop: "10px" }}>
    //             <div style={{ width: "150px", float: "left" }}>
    //               {/* <ToggleInput
    //               checked={exhibition?.enableSpawnAndMoveMedia}
    //               name="enableSpawnAndMoveMedia"
    //               onChange={handleChange}
    //             /> */}
    //               <label className="switch">
    //                 <input
    //                   type="checkbox"
    //                   name="enableSpawnAndMoveMedia"
    //                   checked={exhibition ? exhibition.enableSpawnAndMoveMedia : false}
    //                   onChange={handleChange}
    //                 />
    //                 <span className="slider round" />
    //               </label>
    //             </div>
    //             <div style={{ float: "left" }}>
    //               <span>{t("manager.POPUP_EXHIBITION__CREATE_AND_MOVE_OBJECTS")}</span>
    //             </div>
    //           </div>
    //           <div style={{ position: "relative", width: "100%", height: "40px" }}>
    //             <div style={{ width: "150px", float: "left", paddingLeft: "50px" }}>
    //               {/* <ToggleInput
    //               checked={exhibition?.enableSpawnCamera}
    //               name="enableSpawnCamera"
    //               onChange={handleChange}
    //             /> */}
    //               <label className="switch">
    //                 <input
    //                   type="checkbox"
    //                   name="enableSpawnCamera"
    //                   disabled={!exhibition?.enableSpawnAndMoveMedia}
    //                   checked={exhibition ? exhibition.enableSpawnCamera : false}
    //                   onChange={handleChange}
    //                 />
    //                 <span className="slider round" />
    //               </label>
    //             </div>
    //             <div style={{ float: "left" }}>
    //               <span>{t("manager.POPUP_EXHIBITION__CREATE_CAMERAS")}</span>
    //             </div>
    //           </div>
    //           <div style={{ position: "relative", width: "100%", height: "40px" }}>
    //             <div style={{ width: "150px", float: "left", paddingLeft: "50px" }}>
    //               {/* <ToggleInput
    //               checked={exhibition?.enablePinObjects}
    //               name="enablePinObjects"
    //               onChange={handleChange}
    //             /> */}
    //               <label className="switch">
    //                 <input
    //                   type="checkbox"
    //                   name="enablePinObjects"
    //                   disabled={!exhibition?.enableSpawnAndMoveMedia}
    //                   checked={exhibition ? exhibition.enablePinObjects : false}
    //                   onChange={handleChange}
    //                 />
    //                 <span className="slider round" />
    //               </label>
    //             </div>
    //             <div style={{ float: "left" }}>
    //               <span>{t("manager.POPUP_EXHIBITION__PIN_OBJECTS")}</span>
    //             </div>
    //           </div>
    //           <div style={{ position: "relative", width: "100%", height: "40px" }}>
    //             <div style={{ width: "150px", float: "left" }}>
    //               {/* <ToggleInput
    //               checked={exhibition?.enableSpawnDrawing}
    //               name="enableSpawnDrawing"
    //               onChange={handleChange}
    //             /> */}
    //               <label className="switch">
    //                 <input
    //                   type="checkbox"
    //                   name="enableSpawnDrawing"
    //                   checked={exhibition ? exhibition.enableSpawnDrawing : false}
    //                   onChange={handleChange}
    //                 />
    //                 <span className="slider round" />
    //               </label>
    //             </div>
    //             <div style={{ float: "left" }}>
    //               <span>{t("manager.POPUP_EXHIBITION__CREATE_DRAWINGS")}</span>
    //             </div>
    //           </div>
    //           <div style={{ position: "relative", width: "100%", height: "40px" }}>
    //             <div style={{ width: "150px", float: "left" }}>
    //               {/* <ToggleInput
    //               checked={exhibition?.enableSpawnEmoji}
    //               name="enableSpawnEmoji"
    //               onChange={handleChange}
    //             /> */}
    //               <label className="switch">
    //                 <input
    //                   type="checkbox"
    //                   name="enableSpawnEmoji"
    //                   checked={exhibition ? exhibition.enableSpawnEmoji : false}
    //                   onChange={handleChange}
    //                 />
    //                 <span className="slider round" />
    //               </label>
    //             </div>
    //             <div style={{ float: "left" }}>
    //               <span>{t("manager.POPUP_EXHIBITION__CREATE_EMOJI")}</span>
    //             </div>
    //           </div>
    //           <div style={{ position: "relative", width: "100%", height: "40px" }}>
    //             <div style={{ width: "150px", float: "left" }}>
    //               {/* <ToggleInput
    //               checked={exhibition?.enableFly}
    //               name="enableFly"
    //               onChange={handleChange}
    //             /> */}
    //               <label className="switch">
    //                 <input
    //                   type="checkbox"
    //                   name="enableFly"
    //                   checked={exhibition ? exhibition.enableFly : false}
    //                   onChange={handleChange}
    //                 />
    //                 <span className="slider round" />
    //               </label>
    //             </div>
    //             <div style={{ float: "left" }}>
    //               <span>{t("manager.POPUP_EXHIBITION__ALLOW_FLY")}</span>
    //             </div>
    //           </div>
    //         </div>
    //       </form>
    //     </>
    //   }
    //   actions={[
    //     {
    //       text: exhibitionType == "edit" ? t("manager.POPUP_EXHIBITION__EDIT") : t("manager.POPUP_EXHIBITION__CREATE"),
    //       class: "btn-handle",
    //       callback: () => {
    //         exhibitionType == "edit" ? handleEdit() : handleCreate();
    //       }
    //     },
    //     {
    //       text: t("manager.POPUP_EXHIBITION__CANCEL"),
    //       class: "btn-cancle",
    //       callback: () => {
    //         closePopupExhibition();
    //       }
    //     }
    //   ]}
    //   handleClose={() => {
    //     closePopupExhibition();
    //   }}
    // />
  );
};

ExhibitionFormModal.propTypes = {};

export default ExhibitionFormModal;
