import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";

import { Button } from "src/components";
import QuizService from "src/utilities/apiServices/QuizService";
import { CONTENT_ROOT } from "src/utilities/constants";
import Store from "src/utilities/store";

import PopupCreateQuiz from "./PopupCreateQuiz";
import Quiz from "./Quiz";

const Quizzes = (props) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [isOpenPopupCreate, setIsOpenPopupCreate] = useState(false);
	const [deletingQuizId, setDeletingQuizId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [listQuiz, setListQuiz] = useState([]);
	const [params, setParams] = useState({
		sort: "-createdAt",
		filter: JSON.stringify([
			{
				operator: "=",
				key: "createdBy",
				value: Store.getUser()?.id,
			},
		]),
	});

	useEffect(() => {
		load();
	}, []);

	const handleGoToQuizForm = (quizId) => {
		if (quizId) {
			navigate(`/home/content/quiz-form/${quizId}`);
			return;
		}
		navigate("/home/content/quiz-form");
	};

	function load() {
		setIsLoading(true);
		QuizService.getAll(params)
			.then((res) => {
				const quizs = res.data.items;
				setListQuiz(quizs);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
			});
	}

	function handleOpenPopupCreate() {
		console.log(isOpenPopupCreate);
		setIsOpenPopupCreate(true);
	}

	function handleDeleteQuiz(quizId) {
		setDeletingQuizId(quizId);
		QuizService.delete(quizId)
			.then((quiz) => {
				setListQuiz(listQuiz.filter((q) => q.id != quizId));
				setDeletingQuizId(null);
			})
			.catch((error) => {
				setDeletingQuizId(null);
			});
	}

	function handleGotoViewQuiz(quizId) {
		window.open(`${CONTENT_ROOT}/quiz?id=${quizId}`);
	}

	return (
		<div className="flex flex-col justify-start items-start gap-2">
			<Button onClick={() => handleGoToQuizForm()}>
				{t("content.QUIZ_TAB__QUIZ_LIST__QUIZ_TAB__ADD_QUIZ_BUTTON_LABEL")}
			</Button>
			{listQuiz.length === 0 ? (
				<Empty
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
