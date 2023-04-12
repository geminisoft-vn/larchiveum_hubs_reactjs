import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";

import DocumentService from "src/api/DocumentService";
import MediaService from "src/api/MediaService";
import {
	Button,
	FormContainer,
	FormItem,
	Progress,
	Stack,
	TextInput,
	Typography,
} from "src/components";
import { closeModal } from "src/features/modal/ModalSlice";
import { openPopup } from "src/features/popup/PopupSlide";
import { updateProgress } from "src/features/progress/ProgressSlice";
import { showToast } from "src/features/toast/ToastSlice";
import { IDocument } from "src/interfaces";
import { tinyApp } from "src/utilities/constants";

const DocumentForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { documentId } = useParams();

	const dispatch = useDispatch();

	const [editorData, setEditorData] = useState<string>("");

	const { handleSubmit, register } = useForm<Partial<IDocument>>({
		defaultValues: async () => {
			const res = await DocumentService.getOne(documentId);
			if (res.result === "ok") {
				const { content } = res.data;
				setEditorData(content);
				console.log(res.data, editorData);
				return res.data;
			}
			return {
				title: "",
				description: "",
			};
		},
	});

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleSaveDocument = handleSubmit((data) => {
		const dataToSend = {
			title: data.title,
			description: data.description,
			content: editorData,
		};
		if (documentId) {
			// edit
			DocumentService.update(documentId, {
				title: data.title,
				description: data.description,
				content: editorData,
			})
				.then(() => {
					dispatch(
						showToast({
							type: "success",
							message: t(`__TOAST__.SUCCESS`),
						}),
					);
				})
				.then(() => {
					handleGoBack();
				})
				.catch(() => {
					dispatch(
						showToast({
							type: "error",
							message: t(`__TOAST__.ERROR`),
						}),
					);
				});
		} else {
			// create
			DocumentService.create(dataToSend)
				.then(() => {
					dispatch(
						showToast({
							type: "success",
							message: t(`__TOAST__.SUCCESS`),
						}),
					);
				})
				.then(() => {
					handleGoBack();
				})
				.catch(() => {
					dispatch(
						showToast({
							type: "error",
							message: t(`__TOAST__.ERROR`),
						}),
					);
				});
		}
	});

	function onPickFile(callback, value, meta) {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		if (meta.filetype === "image") {
			input.setAttribute("accept", "image/*");
		}
		if (meta.filetype === "media") {
			input.setAttribute("accept", "video/*,audio/*");
		}

		input.addEventListener("change", (e) => {
			const { files } = e.target as HTMLInputElement;
			if (files) {
				// dispatch(
				// 	openPopup({
				// 		isActive: true,
				// 		title: files[0].name,
				// 		content: <Progress />,
				// 	}),
				// );
				MediaService.upload(
					files[0],
					(progress) => {
						dispatch(updateProgress(progress));
					},
					null,
				)
					.then((res) => {
						if (res.result === "ok") {
							callback(res.data, { title: files[0].name });
						}
					})
					.finally(() => {
						closeModal();
					});
			}
		});

		input.click();
	}

	return (
		<FormContainer onSubmit={handleSaveDocument}>
			<Typography className="text-bold text-center font-bold">
				{documentId ? "Edit Document" : "Create Document"}
			</Typography>
			<Stack direction="col" gap={2}>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="between"
					className="w-full"
				>
					<Button beforeIcon={<LeftOutlined />} onClick={handleGoBack}>
						{t(
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__BACK_BUTTON_LABEL",
						)}
					</Button>
					<Button type="submit" onClick={() => {}}>
						{documentId ? t("__BUTTON__.EDIT") : t("__BUTTON__.CREATE")}
					</Button>
				</Stack>
				<Stack direction="col" gap={2} className="w-full">
					<FormItem
						label={t(
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__TITLE_INPUT_LABEL",
						)}
						renderInput={() => (
							<TextInput
								{...register("title")}
								placeholder={t(
									"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__TITLE_INPUT_PLACEHOLDER",
								)}
								className=""
							/>
						)}
					/>
					<FormItem
						label={t(
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__DESCRIPTION_INPUT_LABEL",
						)}
						renderInput={() => (
							<TextInput
								{...register("description")}
								placeholder={t(
									"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__DESCRIPTION_INPUT_PLACEHOLDER",
								)}
								className=""
							/>
						)}
					/>
				</Stack>

				<Editor
					apiKey={tinyApp.apiKey}
					initialValue={editorData}
					onChange={(e) => {
						setEditorData(e.target.getBody().innerHTML);
					}}
					init={{
						min_height: 512,
						width: "100%",
						menubar: true,
						file_picker_callback: onPickFile,
						image_title: true,
						automatic_uploads: true,
						file_picker_types: "image",
						content_css: "flex",
						plugins: [
							"advlist",
							"autolink",
							"lists",
							"link",
							"image",
							"media",
							"charmap",
							"preview",
							"anchor",
							"searchreplace",
							"visualblocks",
							"fullscreen",
							"insertdatetime",
							"table",
							"help",
							"wordcount",
							"autoresize",
						],
						toolbar:
							"undo redo | casechange blocks | bold italic backcolor | image media file | " +
							"alignleft aligncenter alignright alignjustify | " +
							"bullist numlist checklist outdent indent | removeformat | code table help",
					}}
				/>
			</Stack>
		</FormContainer>
	);
};

export default DocumentForm;
