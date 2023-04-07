import { useTranslation } from "react-i18next";
import {
	DeleteOutlined,
	EyeOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";

import { Button } from "src/components";
import { IQuiz } from "src/interfaces";

type Props = {
	quiz: IQuiz;
	handleGotoViewQuiz: (_id?: number) => void;
	handleGoToQuizForm: (_id?: number) => void;
	handleDeleteQuiz: (_id?: number) => void;
};

const Quiz = (props: Props) => {
	const { quiz, handleGotoViewQuiz, handleGoToQuizForm, handleDeleteQuiz } =
		props;

	const { t } = useTranslation();
	return (
		<div className="flex w-full justify-between rounded-lg border border-gray-200 p-4">
			<div className="flex flex-col gap-2">
				<h3 className="text-2xl font-bold">{quiz.title}</h3>
				<p>{quiz.description}</p>
			</div>

			<div className="flex items-center gap-4">
				<Button
					beforeIcon={<EyeOutlined />}
					onClick={() => handleGotoViewQuiz(quiz.id)}
					className="bg-green-700 text-white"
				>
					{t("content.QUIZ_TAB__QUIZ_LIST__PREVIEW_BUTTON_LABEL")}
				</Button>
				<Button
					beforeIcon={<UnorderedListOutlined />}
					onClick={() => handleGoToQuizForm(quiz.id)}
					className="bg-yellow-700 text-white
          "
				>
					{t("content.QUIZ_TAB__QUIZ_LIST__EDIT_BUTTON_LABEL")}
				</Button>
				<Button
					beforeIcon={<DeleteOutlined />}
					onClick={() => handleDeleteQuiz(quiz.id)}
					danger
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
