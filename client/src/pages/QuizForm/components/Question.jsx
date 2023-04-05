import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";

import { Button, Select, TextInput } from "src/components";

import Answers from "./Answers";

const Question = (props) => {
	const { handleDeleteQuestion, questionIndex } = props;

	const { register, getValues } = useFormContext();

	const { t } = useTranslation();

	return (
		<div className="flex w-full flex-col flex-col items-center justify-between gap-4 rounded-lg border p-4">
			<div className="flex w-full items-center justify-between">
				<p>
					{`${t("content.QUIZ_TAB__QUESTION__NAME_LABEL")} #${
						questionIndex + 1
					}`}
				</p>
				<Button
					className="bg-red-500 text-white"
					beforeIcon={<DeleteOutlined className="icon" />}
					onClick={handleDeleteQuestion}
				>
					{t("content.QUIZ_TAB__QUESTION__DELETE_BUTTON_LABEL")}
				</Button>
			</div>

			<div className="grid grid-cols-3 gap-2">
				<TextInput
					{...register(`questions.${questionIndex}.text`)}
					className="col-span-2"
					placeholder={t("content.QUIZ_TAB__QUESTION__TEXT_INPUT_PLACEHOLDER")}
				/>

				<Select
					{...register(`questions.${questionIndex}.multiple`)}
					defaultValue={getValues(`questions.${questionIndex}.multiple`)}
					options={[
						{
							value: 0,
							label: t(
								"content.QUIZ_TAB__QUESTION__MULTIPLE_SELECT__OPTION_ONE_LABEL",
							),
						},
						{
							value: 1,
							label: t(
								"content.QUIZ_TAB__QUESTION__MULTIPLE_SELECT__OPTION_MULTIPLE_LABEL",
							),
						},
					]}
				/>
			</div>

			<Answers questionIndex={questionIndex} />
		</div>
	);
};

export default Question;
