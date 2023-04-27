import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import QuizService from "src/api/QuizService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getQuestions, setQuestions } from "src/features/quiz/QuizSlice";
import { IQuiz } from "src/interfaces";

import GettingStarted from "./components/GettingStarted";
import Question from "./components/Question";
import Result from "./components/Result";

const QUIZ_STEPS = {
	GETTING_STARTED: 1,
	QUESTIONS: 2,
	RESULT: 3,
};

const QuizPreview = () => {
	const { id } = useParams();

	const dispatch = useAppDispatch();

	const questions = useAppSelector(getQuestions);

	const [questionIndex, setQuestionIndex] = useState(0);
	const [quizStep, setQuizStep] = useState(QUIZ_STEPS.GETTING_STARTED);

	const [quiz, setQuiz] = useState<IQuiz>();

	const loadQuiz = () => {
		QuizService.getOne(id).then((res) => {
			if (res.result === "ok") {
				setQuiz(res.data);
				dispatch(setQuestions(res.data.questions));
			}
		});
	};

	const handleNextStep = () => {
		setQuizStep(quizStep + 1);
	};

	const handleStartQuiz = () => {
		handleNextStep();
	};

	const handleNextQuestion = () => {
		if (!questions.length) return;
		const nextQuestionIndex = questionIndex + 1;
		if (nextQuestionIndex < questions.length) {
			setQuestionIndex(nextQuestionIndex);
		} else {
			handleNextStep();
		}
	};

	useEffect(() => {
		loadQuiz();
	}, []);

	return (
		<div
			style={{
				position: "relative",
				height: "100vh",
				width: "100%",
				backgroundColor: "white",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{quizStep === QUIZ_STEPS.GETTING_STARTED && (
				<GettingStarted quiz={quiz} onStartQuiz={handleStartQuiz} />
			)}
			{quizStep === QUIZ_STEPS.QUESTIONS && (
				<div
					style={{
						height: "100vh",
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{questions && (
						<Question
							index={questionIndex}
							question={questions[questionIndex]}
							onSubmitAnswer={handleNextQuestion}
						/>
					)}
				</div>
			)}
			{quizStep === QUIZ_STEPS.RESULT && questions && <Result />}
		</div>
	);
};

export default QuizPreview;
