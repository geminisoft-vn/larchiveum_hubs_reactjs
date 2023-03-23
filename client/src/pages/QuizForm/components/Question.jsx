/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

import { Button, Select, TextInput } from "src/components";

import AnswerService from "src/utilities/apiServices/AnswerService";
import QuestionService from "src/utilities/apiServices/QuestionService";

import Answer from "./Answer";
import Answers from "./Answers";

function Question(props) {
	const { handleDeleteQuestion, questionIndex } = props;

	const { register } = useFormContext();

	const { t } = useTranslation();

	// function handleSaveQuestion(question) {
	//   QuestionService.update(question.id, {
	//     text: question.text,
	//     multiple: question.multiple,
	//   })
	//     .then((res) => {
	//       if (
	//         !res.data.multiple &&
	//         question.answers.filter((a) => a.isCorrectAnswer).length > 1
	//       ) {
	//         handleChooseAnswer(null);
	//       }
	//     })
	//     .catch((error) => {});
	// }

	// function handleDeleteQuestion(index) {
	//   // QuestionService.delete(question.id)
	//   //   .then((res) => {
	//   //     setIsDeleteQuestionSubmiting(false);
	//   //     if (onDelete) {
	//   //       onDelete(question);
	//   //     }
	//   //   })
	//   //   .catch((error) => {
	//   //     setIsDeleteQuestionSubmiting(false);
	//   //   });
	// }

	// function handleAddAnswer() {
	//   // setIsAddAnswerSubmiting(true);
	//   // AnswerService.create({
	//   //   questionId: question.id,
	//   // })
	//   //   .then((res) => {
	//   //     setQuestion({
	//   //       ...question,
	//   //       answers: [...(question.answers || []), res.data],
	//   //     });
	//   //     setIsAddAnswerSubmiting(false);
	//   //   })
	//   //   .catch((error) => {
	//   //     setIsAddAnswerSubmiting(false);
	//   //   });

	// }

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
					options={[
						{
							value: 0,
							label: t(
								"content.QUIZ_TAB__QUESTION__MULTIPLE_SELECT__OPTION_ONE_LABEL"
							),
						},
						{
							value: 1,
							label: t(
								"content.QUIZ_TAB__QUESTION__MULTIPLE_SELECT__OPTION_MULTIPLE_LABEL"
							),
						},
					]}
				/>
			</div>

			<Answers questionIndex={questionIndex} />
		</div>
	);
}

export default Question;
