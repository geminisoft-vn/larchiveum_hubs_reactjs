import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import {
	Button,
	FormContainer,
	FormItem,
	Progress,
	Stack,
	TextInput,
} from "src/components";
import { closeModal, openModal } from "src/features/modal/ModalSlice";
import { updateProgress } from "src/features/progress/ProgressSlice";
import DocumentService from "src/utilities/apiServices/DocumentService";
import MediaService from "src/utilities/apiServices/MediaService";
import { tinyApp } from "src/utilities/constants";

const DocumentForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { handleSubmit, register } = useForm();

	const [editorData, setEditorData] = useState<string>("");

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleSaveDocument = handleSubmit((data) => {
		const dataToSend = {
			title: data.title,
			description: data.description,
			content: editorData,
		};
		DocumentService.create(dataToSend)
			.then((res) => {
				handleGoBack();
			})
			.catch((error) => {});
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
				dispatch(
					openModal({
						isActive: true,
						title: files[0].name,
						body: <Progress />,
					}),
				);
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
			<Stack direction="col" gap={2}>
				<Stack
					direction="row"
					alignItems="center"
					justfyContent="between"
					className="w-full"
				>
					<Button onClick={handleGoBack}>
						{t(
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__BACK_BUTTON_LABEL",
						)}
					</Button>
					<Button type="submit" onClick={() => {}}>
						{t(
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__CREATE_BUTTON_LABEL",
						)}
					</Button>
				</Stack>
				<Stack direction="col" gap={2} className="w-full">
					<FormItem
						name={register("title").name}
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
						name={register("description").name}
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
					initialValue=""
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
				{/* <UploadFileModal ref={uploadRef} /> */}
			</Stack>
		</FormContainer>
	);
};

export default DocumentForm;