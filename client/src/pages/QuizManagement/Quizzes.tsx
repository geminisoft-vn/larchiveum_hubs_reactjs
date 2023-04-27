import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Empty } from "antd";

import QuizService from "src/api/QuizService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Button } from "src/components";
import { closePopup, openPopup } from "src/features/popup/PopupSlide";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserInfo } from "src/features/user/selectors";
import { IQuiz } from "src/interfaces";

import Quiz from "./Quiz";

const Quizzes = () => {
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

	const handleClosePopup = () => {
		dispatch(closePopup());
	};

	const handleDeleteQuiz = (quizId?: number) => {
		if (!quizId) return;
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
			})
			.finally(() => {
				handleClosePopup();
				load();
			});
	};

	const openDeleteQuizPopup = (quizId?: number) => {
		dispatch(
			openPopup({
				isActive: true,
				title: "Delete Quiz",
				content: "Do you want to delete this quiz?",
				actions: [
					{
						text: "Delete",
						className: "bg-red-500 text-white",
						callback: () => handleDeleteQuiz(quizId),
					},
					{
						text: "Close",
						callback: handleClosePopup,
					},
				],
			}),
		);
	};

	useEffect(() => {
		load();
	}, []);

	return (
		<div className="flex flex-col items-center justify-start gap-2">
			<Link to="/home/content/quiz/form">
				<Button className="self-start bg-blue-700 text-white">
					{t("content.QUIZ_TAB__QUIZ_LIST__QUIZ_TAB__ADD_QUIZ_BUTTON_LABEL")}
				</Button>
			</Link>
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
							openDeleteQuizPopup={openDeleteQuizPopup}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default Quizzes;
