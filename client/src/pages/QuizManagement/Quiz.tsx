import { useTranslation } from "react-i18next";
import {
	DeleteOutlined,
	EyeOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

import { Button } from "src/components";

const Quiz = (props) => {
	const { quiz, handleGotoViewQuiz, handleGoToQuizForm, handleDeleteQuiz } =
		props;

	const { t } = useTranslation();
	return (
		<div className="w-full flex justify-between rounded-lg border border-gray-200 p-4">
			<div className="flex flex-col gap-2">
				<h3>{quiz.title}</h3>
				<p>{quiz.description}</p>
			</div>

			<div className="flex items-center gap-4">
				<Button
					beforeIcon={<EyeOutlined />}
					onClick={() => handleGotoViewQuiz(quiz.id)}
				>
					{t("content.QUIZ_TAB__QUIZ_LIST__PREVIEW_BUTTON_LABEL")}
				</Button>
				<Button
					beforeIcon={<UnorderedListOutlined />}
					onClick={() => handleGoToQuizForm(quiz.id)}
				>
					{t("content.QUIZ_TAB__QUIZ_LIST__EDIT_BUTTON_LABEL")}
				</Button>
				<Button
					beforeIcon={<DeleteOutlined />}
					onClick={() => handleDeleteQuiz(quiz.id)}
				>
					{" "}
					{t("content.QUIZ_TAB__QUIZ_LIST__DELETE_BUTTON_LABEL")}
				</Button>
			</div>
		</div>
	);
};

Quiz.propTypes = {};

export default Quiz;
