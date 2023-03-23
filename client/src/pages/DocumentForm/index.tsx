import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
	Button,
	Editor,
	FormContainer,
	FormItem,
	Stack,
	TextInput,
} from "src/components";

const DocumentForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { handleSubmit, register } = useForm();

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleSaveDocument = () => {};

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
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__BACK_BUTTON_LABEL"
						)}
					</Button>
					<Button type="submit" onClick={handleSaveDocument}>
						{t(
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__CREATE_BUTTON_LABEL"
						)}
					</Button>
				</Stack>
				<Stack direction="col" gap={2} className="w-full">
					<FormItem
						label={t(
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__TITLE_INPUT_LABEL"
						)}
						renderInput={() => (
							<TextInput
								{...register("title")}
								placeholder={t(
									"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__TITLE_INPUT_PLACEHOLDER"
								)}
							/>
						)}
					/>
					<FormItem
						label={t(
							"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__DESCRIPTION_INPUT_LABEL"
						)}
						renderInput={() => (
							<TextInput
								{...register("description")}
								placeholder={t(
									"content.DOCUMENT_TAB__DOCUMENT_CREATE_DETAIL__DESCRIPTION_INPUT_PLACEHOLDER"
								)}
							/>
						)}
					/>
				</Stack>
				<Editor />
			</Stack>
		</FormContainer>
	);
};

export default DocumentForm;
