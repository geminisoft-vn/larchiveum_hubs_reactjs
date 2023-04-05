import React, { useEffect, useLayoutEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";

import AnswerService from "src/api/AnswerService";
import { Button, Switch, TextInput } from "src/components";

const Answer = (props) => {
	const {
		questionIndex,
		answerIndex,
		handleDeleteAnswer,
		handleChangeCorrectAnswer,
	} = props;

	const { register, control, watch, getValues } = useFormContext();

	const { t } = useTranslation();

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (
				type === "change" &&
				name.includes("isCorrectAnswer") &&
				getValues(`questions.${questionIndex}.multiple`) === "0"
			) {
				handleChangeCorrectAnswer(name);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

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
};

export default Answer;
