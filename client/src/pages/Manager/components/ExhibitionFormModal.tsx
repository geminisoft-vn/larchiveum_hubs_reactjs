import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import "./ExhibitionFormModal.style.scss";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import _pick from "lodash/pick";
import _transform from "lodash/transform";
import moment from "moment";
import * as yup from "yup";

import ExhibitionsService from "src/api/ExhibitionsService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
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
import {
	getExhibition,
	updateExhibition,
} from "src/features/exhibition/ExhibitionSlide";
import { showToast } from "src/features/toast/ToastSlice";
import { IExhibition, IScene } from "src/interfaces";
import { DATE_TIME_FORMAT } from "src/utilities/constants";

type Props = {
	isActive: boolean;
	setIsActive(value: boolean): void;
	type: "edit" | "create";
	exhibitionId: number;
	scenes: IScene[];
};

const ExhibitionFormModal = (props: Props) => {
	const { isActive, setIsActive, type, exhibitionId, scenes } = props;

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const exhibition = useAppSelector(getExhibition(exhibitionId));
	const transformedDefaultValues = useMemo(() => {
		if (exhibitionId) {
			const fields = _pick(exhibition, [
				"name",
				"description",
				"public",
				"maxSize",
				"startDate",
				"endDate",
				"sceneId",
				"enableSpawnAndMoveMedia",
				"enableSpawnCamera",
				"enablePinObjects",
				"enableSpawnDrawing",
				"enableSpawnEmoji",
				"enableFly",
			]);

			return _transform(
				fields,
				(result, value, key) => {
					if (key.startsWith("enable") || key === "public") {
						if (value === 1) result[key] = true;
						if (value === 0) result[key] = false;
					}
					if (
						typeof value === "string" &&
						(key === "startDate" || key === "endDate")
					) {
						result[key] = moment(value).format(DATE_TIME_FORMAT);
					}
				},
				fields,
			);
		}
		return {
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
		};
	}, [exhibitionId, exhibition]);

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
	} = useForm<Partial<IExhibition>>({
		reValidateMode: "onSubmit",
		defaultValues: transformedDefaultValues,
		resolver: yupResolver(schema),
	});

	const getSceneThumnail = (sceneId) => {
		if (!sceneId) return defaultImage;
		return scenes.find((scene) => scene.id === sceneId)?.thumbnailUrl || "";
	};

	const handleSaveForm = handleSubmit((data) => {
		const dataToSend = _transform(
			data,
			(result, value, key) => {
				if (typeof value === "boolean") {
					if (data[key]) result[key] = 1;
					if (!data[key]) result[key] = 0;
				}
				if (key === "maxSize" && typeof value === "string")
					result[key] = parseInt(value, 10);
			},
			data,
		);

		if (type === "create") {
			ExhibitionsService.postCreateOne(dataToSend)
				.then((res) => {
					if (res.result === "ok") {
						dispatch(
							showToast({
								type: "success",
								message: t("manager.MESSAGE_SUCCESS"),
							}),
						);
						setIsActive(false);
					}
				})
				.catch((err) => {
					dispatch(
						showToast({
							type: "error",
							message: t(
								`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__${err.response.data.error.toUpperCase()}`,
							),
						}),
					);
				});
		} else if (type === "edit") {
			ExhibitionsService.putUpdateOne(exhibitionId, dataToSend)
				.then((res) => {
					if (res.result === "ok") {
						dispatch(
							showToast({
								type: "success",
								message: t("manager.MESSAGE_SUCCESS"),
							}),
						);
						dispatch(
							updateExhibition({
								id: exhibitionId,
								dataToUpdate: dataToSend,
							}),
						);
						setIsActive(false);
					}
				})
				.catch((err) => {
					if (err.response) {
						dispatch(
							showToast({
								type: "error",
								message: t(
									`manager.CREATE_OR_UPDATE_EXHIBITION_ERROR__${err.response.data.error.toUpperCase()}`,
								),
							}),
						);
					}
				});
		}
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

	useEffect(() => {
		setSceneThumbnail(getSceneThumnail(getValues("sceneId")));
	}, []);

	return (
		<Modal
			isActive={isActive}
			setIsActive={setIsActive}
			width={1024}
			maxHeight="max-content"
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
			<div className="grid grid-cols-12 gap-2 p-4">
				<div className="col-span-4">
					<FormItem
						label={t("manager.POPUP_EXHIBITION__NAME_LABEL")}
						error={errors.name?.message}
						renderInput={() => {
							return (
								<TextInput
									placeholder={t("manager.POPUP_EXHIBITION__NAME_PLACEHOLDER")}
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
									handleChangeDate={(newDate) => setValue("startDate", newDate)}
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
				<div className="col-span-6 h-full">
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
										className="h-full"
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
											defaultValue={getValues("sceneId") || ""}
											{...register("sceneId")}
											options={scenes}
											handleChange={(sceneId) => {
												setValue("sceneId", sceneId || "af7NxRw");
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
	);
};

export default ExhibitionFormModal;
