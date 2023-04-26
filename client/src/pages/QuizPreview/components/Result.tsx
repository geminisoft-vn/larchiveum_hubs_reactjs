import { useMemo } from "react";
import _isEqual from "lodash/isEqual";

import { useAppSelector } from "src/app/hooks";
import { getQuestions } from "src/features/quiz/QuizSlice";

const Result = () => {
	const questions = useAppSelector(getQuestions);
	console.log({ questions });
	const correctAnswers = useMemo(() => {
		return questions.reduce((acc, item) => {
			if (item.multiple && item.chosenAnswer && item.answers) {
				if (
					_isEqual(
						[...item.chosenAnswer].sort(),
						item.answers
							.filter((a) => a.isCorrectAnswer)
							.map((b) => b.id)
							.sort(),
					)
				) {
					return acc + 1;
				}
			} else if (!item.multiple && item.chosenAnswer && item.answers) {
				if (
					item.chosenAnswer[0] ===
					item.answers.filter((a) => a.isCorrectAnswer)[0].id
				) {
					return acc + 1;
				}
			}
			return acc;
		}, 0);
	}, [questions]);

	console.log({ correctAnswers });

	return (
		<div
			style={{
				position: "relative",
			}}
		>
			<div style={{ width: "100%" }}>
				<div style={{ fontSize: "1em", fontWeight: "bold" }}>
					You have complete the quiz!
				</div>
			</div>
			<div style={{ width: "100%", margin: "20px 0px" }}>
				<div style={{ fontSize: "1em", fontWeight: "bold" }}>
					{"Correct answers: "} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					{correctAnswers}
					{" / "}
					{questions.length}
				</div>
			</div>
		</div>
	);
};

export default Result;
