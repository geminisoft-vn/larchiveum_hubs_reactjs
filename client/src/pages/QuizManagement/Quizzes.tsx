import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";

import QuizService from "src/api/QuizService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Button } from "src/components";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserInfo } from "src/features/user/selectors";
import { IQuiz } from "src/interfaces";
import { CONTENT_ROOT } from "src/utilities/constants";

import Quiz from "./Quiz";

const Quizzes = (props) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const user = useAppSelector(getUserInfo);

	const [listQuiz, setListQuiz] = useState<IQuiz[]>([]);

	function load() {
		QuizService.getAll({
			sort: "-createdAt",
			filter: JSON.stringify([
				{
					operator: "=",
					key: "createdBy",
					value: user.id,
				},
			]),
		}).then((res) => {
			const quizs = res.data.items;
			setListQuiz(quizs);
		});
	}

	const handleGoToQuizForm = (quizId?) => {
		if (quizId) {
			navigate(`/home/content/quiz/form/${quizId}`);
			return;
		}
		navigate("/home/content/quiz/form");
	};

	const handleDeleteQuiz = (quizId) => {
		QuizService.delete(quizId)
			.then(() => {
				dispatch(
					showToast({
						type: "success",
						message: t(`__TOAST__.SUCCESS`),
					}),
				);
			})
			.catch(() => {
				dispatch(
					showToast({
						type: "error",
						message: t(`__TOAST__.ERROR`),
					}),
				);
			});
	};

	const handleGotoViewQuiz = (quizId) => {
		window.open(`${CONTENT_ROOT}/quiz?id=${quizId}`);
	};

	useEffect(() => {
		load();
	}, []);

	return (
		<div className="flex flex-col items-center justify-start gap-2">
			<Button
				onClick={handleGoToQuizForm}
				className="self-start bg-blue-700 text-white"
			>
				{t("content.QUIZ_TAB__QUIZ_LIST__QUIZ_TAB__ADD_QUIZ_BUTTON_LABEL")}
			</Button>
			{listQuiz.length === 0 ? (
				<Empty
					className="self-center"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					style={{ marginTop: "100px" }}
				/>
			) : (
				<>
					{listQuiz.map((quiz) => (
						<Quiz
							key={quiz.id}
							quiz={quiz}
							handleGotoViewQuiz={handleGotoViewQuiz}
							handleGoToQuizForm={handleGoToQuizForm}
							handleDeleteQuiz={handleDeleteQuiz}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default Quizzes;
