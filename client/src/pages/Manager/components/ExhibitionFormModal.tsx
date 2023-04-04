import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import "./ExhibitionFormModal.style.scss";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import _transform from "lodash/transform";
import moment from "moment";
import * as yup from "yup";

import ExhibitionsService from "src/api/ExhibitionsService";
import { useAppDispatch } from "src/app/hooks";
import defaultImage from "src/assets/larchiveum/default-image.png";
import {
	AutoComplete,
	DateTimePicker,
	FormContainer,
	FormItem,
	Modal,
	Stack,
	Switch,
	Textarea,
	TextInput,
} from "src/components";
import { showToast } from "src/features/toast/ToastSlice";
import { IExhibition, IScene } from "src/interfaces";

type Props = {
	isActive: boolean;
	setIsActive(value: boolean): void;
	type: "edit" | "create";
	scenes: IScene[];
};

const ExhibitionFormModal = (props: Props) => {
	const { isActive, setIsActive, type, scenes } = props;

	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const [sceneThumnail, setSceneThumbnail] = useState("");

	const schema = yup.object().shape({
		name: yup
			.string()
			.min(4, t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_NAME`))
			.max(255, t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_NAME`))
			.required(t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_NAME`)),
		description: yup
			.string()
			.min(
				1,
				t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_DESCRIPTION`),
			)
			.max(
				1000,
				t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_DESCRIPTION`),
			)
			.required(
				t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_DESCRIPTION`),
			),
		startDate: yup
			.string()
			.required(
				t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_START_DATE`),
			),
		endDate: yup
			.string()
			.test(
				"is-valid-end-date",
				t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_DATE`),
				function (value) {
					const _this: yup.TestContext = this;
					return moment(value).isAfter(_this.parent?.startDate);
				},
			)
			.required(
				t(`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__INVALID_END_DATE`),
			),
	});

	const {
		handleSubmit,
		register,
		setValue,
		getValues,
		control,
		watch,
		clearErrors,
		formState: { errors },
	} = useForm({
		reValidateMode: "onSubmit",
		defaultValues: {
			name: "",
			description: "",
			public: false,
			maxSize: 0,
			startDate: "",
			endDate: "",
			sceneId: "",
			enableSpawnAndMoveMedia: false,
			enableSpawnCamera: false,
			enablePinObjects: false,
			enableSpawnDrawing: false,
			enableSpawnEmoji: false,
			enableFly: false,
		},
		resolver: yupResolver(schema),
	});

	const getSceneThumnail = (sceneId) => {
		if (!sceneId) return defaultImage;
		return scenes.find((scene) => scene.id === sceneId)?.thumbnailUrl || "";
	};

	const handleSaveForm = handleSubmit((data) => {
		const dataToSend = {};

		console.log(moment(data.startDate));
		// if (type === "create") {
		// 	dataToSend = _transform(
		// 		data,
		// 		(result, value, key) => {
		// 			if (typeof value === "boolean") {
		// 				if (data[key]) result[key] = 1;
		// 				if (!data[key]) result[key] = 0;
		// 			}
		// 			if (key === "maxSize" && typeof value === "string")
		// 				result[key] = parseInt(value, 10);
		// 		},
		// 		data,
		// 	);
		// 	ExhibitionsService.postCreateOne(dataToSend)
		// 		.then((res) => {
		// 			if (res.result === "ok") {
		// 				dispatch(
		// 					showToast({
		// 						type: "success",
		// 						message: t("manager.MESSAGE_SUCCESS"),
		// 					}),
		// 				);
		// 				setIsActive(false);
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			dispatch(
		// 				showToast({
		// 					type: "error",
		// 					message: t(
		// 						`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__${err.response.data.error.toUpperCase()}`,
		// 					),
		// 				}),
		// 			);
		// 		});
		// }
	});

	const handleCloseModal = () => {
		setIsActive(false);
	};

	useEffect(() => {
		const subscription = watch((value, { name, type: _type }) => {
			clearErrors();
			if (_type === "change") {
				if (name && name === "enableSpawnAndMoveMedia" && !value[name]) {
					setValue("enableSpawnCamera", false);
					setValue("enablePinObjects", false);
				}
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<FormContainer onSubmit={handleSaveForm}>
			<Modal
				isActive={isActive}
				setIsActive={setIsActive}
				title={
					type === "edit"
						? t("manager.POPUP_EXHIBITION__EDIT_TITLE")
						: t("manager.POPUP_EXHIBITION__CREATE_TITLE")
				}
				actions={[
					{
						text:
							type === "edit"
								? t("manager.POPUP_EXHIBITION__EDIT")
								: t("manager.POPUP_EXHIBITION__CREATE"),
						className: "",
						callback: handleSaveForm,
					},
					{
						text: t("__BUTTON__.CLOSE"),
						className: "",
						callback: () => handleCloseModal(),
					},
				]}
			>
				<div className="grid grid-cols-12 gap-2">
					<div className="col-span-4">
						<FormItem
							label={t("manager.POPUP_EXHIBITION__NAME_LABEL")}
							error={errors.name?.message}
							renderInput={() => {
								return (
									<TextInput
										placeholder={t(
											"manager.POPUP_EXHIBITION__NAME_PLACEHOLDER",
										)}
										{...register("name")}
									/>
								);
							}}
						/>
					</div>

					<div className="col-span-4">
						<FormItem
							label={t("manager.POPUP_EXHIBITION__START_DATE_LABEL")}
							error={errors.startDate?.message}
							renderInput={() => {
								return (
									<DateTimePicker
										{...register("startDate")}
										date={moment(getValues("startDate"))}
										handleChangeDate={(newDate) =>
											setValue("startDate", newDate)
										}
									/>
								);
							}}
						/>
					</div>
					<div className="col-span-4">
						<FormItem
							label={t("manager.POPUP_EXHIBITION__END_DATE_LABEL")}
							error={errors.endDate?.message}
							renderInput={() => {
								return (
									<DateTimePicker
										{...register("endDate")}
										date={moment(getValues("endDate"))}
										handleChangeDate={(newDate) => setValue("endDate", newDate)}
									/>
								);
							}}
						/>
					</div>
					<div className="col-span-6">
						<Stack
							direction="col"
							justifyContent="between"
							gap={2}
							className="h-full"
						>
							<FormItem
								label={t("manager.POPUP_EXHIBITION__DESCRIPTION_LABEL")}
								error={errors.description?.message}
								renderInput={() => {
									return (
										<Textarea
											rows={7}
											placeholder={t(
												"manager.POPUP_EXHIBITION__DESCRIPTION_PLACEHOLDER",
											)}
											{...register("description")}
										/>
									);
								}}
							/>

							<Stack direction="row" justifyContent="between">
								<FormItem
									label={t("manager.POPUP_EXHIBITION__PUBLIC")}
									renderInput={() => {
										return (
											<Controller
												control={control}
												name="public"
												render={({ field }) => {
													return <Switch {...field} />;
												}}
											/>
										);
									}}
								/>

								<FormItem
									label={t("manager.POPUP_EXHIBITION__MAX_SIZE")}
									error={errors.maxSize?.message}
									renderInput={() => {
										return <TextInput type="number" {...register("maxSize")} />;
									}}
								/>
							</Stack>
						</Stack>
					</div>
					<div className="col-span-6">
						<Stack direction="col" gap={2}>
							{scenes && scenes.length > 0 && (
								<Controller
									name="sceneId"
									control={control}
									render={() => {
										return (
											<AutoComplete
												label={t("manager.POPUP_EXHIBITION__LIST_SCENE_LABEL")}
												{...register("sceneId")}
												options={scenes}
												handleChange={(sceneId) => {
													setValue("sceneId", sceneId || "");
													setSceneThumbnail(getSceneThumnail(sceneId));
												}}
											/>
										);
									}}
								/>
							)}
							<img
								className="rounded-lg object-cover"
								src={sceneThumnail || defaultImage}
								alt=""
							/>
						</Stack>
					</div>

					<div className="col-span-12">
						<Stack
							direction="col"
							alignItems="start"
							justifyContent="start"
							gap={2}
						>
							<FormItem
								label={t("manager.POPUP_EXHIBITION__CREATE_AND_MOVE_OBJECTS")}
								placement="right"
								renderInput={() => {
									return (
										<Controller
											control={control}
											name="enableSpawnAndMoveMedia"
											render={({ field }) => {
												return <Switch {...field} />;
											}}
										/>
									);
								}}
							/>

							<Stack className="ml-12" direction="col" gap={2}>
								<FormItem
									label={t("manager.POPUP_EXHIBITION__CREATE_CAMERAS")}
									placement="right"
									renderInput={() => {
										return (
											<Controller
												control={control}
												name="enableSpawnCamera"
												render={({ field }) => {
													return (
														<Switch
															{...field}
															disabled={!watch("enableSpawnAndMoveMedia")}
														/>
													);
												}}
											/>
										);
									}}
								/>

								<FormItem
									label={t("manager.POPUP_EXHIBITION__PIN_OBJECTS")}
									placement="right"
									renderInput={() => {
										return (
											<Controller
												control={control}
												name="enablePinObjects"
												render={({ field }) => {
													return (
														<Switch
															{...field}
															disabled={!watch("enableSpawnAndMoveMedia")}
														/>
													);
												}}
											/>
										);
									}}
								/>
							</Stack>

							<FormItem
								label={t("manager.POPUP_EXHIBITION__CREATE_DRAWINGS")}
								placement="right"
								renderInput={() => {
									return (
										<Controller
											control={control}
											name="enableSpawnDrawing"
											render={({ field }) => {
												return <Switch {...field} />;
											}}
										/>
									);
								}}
							/>

							<FormItem
								label={t("manager.POPUP_EXHIBITION__CREATE_EMOJI")}
								placement="right"
								renderInput={() => {
									return (
										<Controller
											control={control}
											name="enableSpawnEmoji"
											render={({ field }) => {
												return <Switch {...field} />;
											}}
										/>
									);
								}}
							/>

							<FormItem
								label={t("manager.POPUP_EXHIBITION__ALLOW_FLY")}
								placement="right"
								renderInput={() => {
									return (
										<Controller
											control={control}
											name="enableFly"
											render={({ field }) => {
												return <Switch {...field} />;
											}}
										/>
									);
								}}
							/>
						</Stack>
					</div>
				</div>
			</Modal>
		</FormContainer>

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

export default ExhibitionFormModal;
