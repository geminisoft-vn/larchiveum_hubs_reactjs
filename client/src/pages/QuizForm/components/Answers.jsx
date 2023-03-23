import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "src/components";

import Answer from "./Answer";

function Answers(props) {
	const { questionIndex } = props;
	const { t } = useTranslation();

	const { control, watch, getValues, setValue } = useFormContext();

	const { fields, append, remove, update } = useFieldArray({
		control,
		name: `questions.${questionIndex}.answers`,
		rules: {
			maxLength: 10,
		},
	});

	const handleChangeCorrectAnswer = (name) => {
		if (getValues(name)) {
			const answers = getValues(`questions.${questionIndex}.answers`);
			answers.forEach((_, index) => {
				console.log(
					name,
					`questions.${questionIndex}.answers.${index}.isCorrectAnswer`
				);
				if (
					name === `questions.${questionIndex}.answers.${index}.isCorrectAnswer`
				)
					return;
				update(index, { isCorrectAnswer: "0" });
			});
		}
	};

	return (
		<>
			<div className="grid w-full grid-cols-12 items-center gap-2">
				<p className="col-span-8">
					{t("content.QUIZ_TAB__QUESTION__ANSWERS_LABEL")}{" "}
				</p>
				<p className="col-span-2">
					{" "}
					{t("content.QUIZ_TAB__QUESTION__IS_CORRECT_LABEL")}{" "}
				</p>
			</div>

			{fields.map((field, index) => (
				<Answer
					key={field.id}
					answerIndex={index}
					questionIndex={questionIndex}
					answer={field}
					handleDeleteAnswer={() => remove(index)}
					handleChangeCorrectAnswer={handleChangeCorrectAnswer}
				/>
			))}

			<Button onClick={() => append({ text: "" })}>
				{`+ ${t("content.QUIZ_TAB__QUESTION__ADD_ANSWER_BUTTON_LABEL")}`}
			</Button>
		</>
	);
}

export default Answers;
