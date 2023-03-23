import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";

import { Button, Switch, TextInput } from "src/components";

import AnswerService from "src/utilities/apiServices/AnswerService";

function Answer(props) {
	const {
		questionIndex,
		answerIndex,
		handleDeleteAnswer,
		handleChangeCorrectAnswer,
	} = props;

	const { register, control, watch, getValues } = useFormContext();

	const { t } = useTranslation();
	const [isLoading, setIsLoading] = useState(false);
	const [isSaveAnswerSubmiting, setIsSaveAnswerSubmiting] = useState(false);
	const [isDeleteAnswerSubmiting, setIsDeleteAnswerSubmiting] = useState(false);
	const [answer, setAnswer] = useState(props.answer || {});

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (
				type === "change" &&
				getValues(`questions.${questionIndex}.multiple`) === "0"
			) {
				handleChangeCorrectAnswer(name);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	useLayoutEffect(() => {
		setAnswer(props.answer);
	}, [props.answer]);

	function handleSaveAnswer(answer) {
		setIsSaveAnswerSubmiting(true);
		AnswerService.update(answer.id, answer)
			.then((res) => {
				setAnswer({
					...res.data,
				});
				setIsSaveAnswerSubmiting(false);
			})
			.catch((error) => {
				setIsSaveAnswerSubmiting(false);
			});
	}

	// function handleDeleteAnswer() {
	//   setIsDeleteAnswerSubmiting(true);
	//   AnswerService.delete(answer.id)
	//     .then((res) => {
	//       setIsDeleteAnswerSubmiting(false);
	//       if (onDelete) {
	//         onDelete(answer);
	//       }
	//     })
	//     .catch((error) => {
	//       setIsDeleteAnswerSubmiting(false);
	//     });
	// }

	return (
		<div className="grid w-full grid-cols-12 items-center gap-2">
			<TextInput
				{...register(`questions.${questionIndex}.answers.${answerIndex}.text`)}
				className="col-span-8"
				placeholder={t("content.QUIZ_TAB__ANSWER__TEXT_INPUT_PLACEHOLDER")}
			/>
			<div className="flex justify-center">
				<Controller
					control={control}
					name={`questions.${questionIndex}.answers.${answerIndex}.isCorrectAnswer`}
					render={({ field }) => <Switch {...field} />}
				/>
			</div>
			<div className="col-span-2 flex justify-end">
				<Button
					className="bg-red-500 text-white"
					beforeIcon={<DeleteOutlined />}
					onClick={handleDeleteAnswer}
				>
					{t("content.QUIZ_TAB__ANSWER__DELETE_INPUT_LABEL")}
				</Button>
			</div>
		</div>
	);
}

export default Answer;
