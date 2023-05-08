import { useTranslation } from "react-i18next";
import { Empty } from "antd";

import QuizService from "src/api/QuizService";
import { useAppDispatch } from "src/app/hooks";
import { closePopup, openPopup } from "src/features/popup/PopupSlide";
import { showToast } from "src/features/toast/ToastSlice";

import Quiz from "./Quiz";

const Quizzes = (props) => {
	const { quizzes } = props;
	const { t } = useTranslation();

	const dispatch = useAppDispatch();

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

	return quizzes.length === 0 ? (
		<Empty
			className="self-center"
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			style={{ marginTop: "100px" }}
		/>
	) : (
		<>
			{quizzes.map((quiz) => (
				<Quiz
					key={quiz.id}
					quiz={quiz}
					openDeleteQuizPopup={openDeleteQuizPopup}
				/>
			))}
		</>
	);
};

export default Quizzes;
