/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// @ts-nocheck
/* eslint-disable */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "src/components";

import QuizResultService from "src/api/QuizResultService";

export default function (props) {
	const { onStartQuiz } = props;
	const { t } = useTranslation();
	const [isStarting, setIsStarting] = useState(false);
	const [quiz, setQuiz] = useState(props.quiz);
	const [quizResult, setQuizResult] = useState(null);

	useEffect(() => {
		setQuiz(props.quiz);
	}, [props.quiz]);

	function handleStartQuiz() {
		setIsStarting(true);
		QuizResultService.create({
			quizId: quiz.id,
		})
			.then((res) => {
				setQuizResult(res.data);
				setIsStarting(false);
				if (props.onStartQuiz) {
					props.onStartQuiz(res.data);
				}
			})
			.catch((error) => {
				setIsStarting(false);
			});
	}

	return (
		<div style={{ width: "50%" }}>
			<div style={{ width: "100%" }}>
				<div
					span={24}
					style={{ fontSize: "2em", fontWeight: "bold", textAlign: "center" }}
				>
					{quiz?.title}
				</div>
			</div>
			<div style={{ width: "100%", marginTop: "10vh" }}>
				<div
					span={24}
					style={{ fontSize: "1em", textAlign: "center", lineHeight: "2em" }}
				>
					{quiz?.introduction}
				</div>
			</div>
			<div style={{ width: "100%", marginTop: "15vh" }}>
				<div span={24} style={{ display: "flex", justifyContent: "center" }}>
					<Button onClick={onStartQuiz}>Start quiz</Button>
				</div>
			</div>
		</div>
	);
}
