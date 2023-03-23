import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";

import {
	Button,
	FormContainer,
	FormItem,
	Stack,
	TextInput,
} from "src/components";
import { EDITOR_TOOLS } from "src/components/Editor/Tools";

const DocumentForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const editorRef = useRef<EditorJS | null>(null);

	const { handleSubmit, register } = useForm();

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleSaveDocument = () => {
		if (editorRef.current) {
			editorRef.current.save().then((out) => console.log({ out }));
		}
	};

	useEffect(() => {
		const editor = new EditorJS({
			/**
			 * Id of Element that should contain Editor instance
			 */
			holder: "LARCHIVEUM__EDITOR",

			tools: EDITOR_TOOLS,
		});

		if (!editorRef.current) {
			editorRef.current = editor;
		}

		editor.isReady
			.then(() => console.log("EditorJS is ready!"))
			.catch(() => console.error("EditorJS started failed!"));
	}, []);

	return (
		<FormContainer onSubmit={handleSubmit(handleSaveDocument)}>
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
					<Button type="submit" onClick={handleSaveDocument}>
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
				<div id="LARCHIVEUM__EDITOR" className="border-2 rounded w-full" />
			</Stack>
		</FormContainer>
	);
};

export default DocumentForm;
