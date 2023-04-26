import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
	DeleteOutlined,
	EyeOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";

import { Button } from "src/components";
import { IQuiz } from "src/interfaces";

type Props = {
	quiz: IQuiz;
	openDeleteQuizPopup: (_id?: number) => void;
};

const Quiz = (props: Props) => {
	const { quiz, openDeleteQuizPopup } = props;

	const { t } = useTranslation();
	return (
		<div className="flex w-full justify-between rounded-lg border border-gray-200 p-4">
			<div className="flex flex-col gap-2">
				<h3 className="text-xl font-bold">{quiz.title}</h3>
				<p>{quiz.description}</p>
			</div>

			<div className="flex items-center gap-4">
				<Link to={`/preview/quiz/${quiz.id}`} target="_blank">
					<Button beforeIcon={<EyeOutlined />}>
						{t("content.QUIZ_TAB__QUIZ_LIST__PREVIEW_BUTTON_LABEL")}
					</Button>
				</Link>
				<Link to={`/home/content/quiz/form/${quiz.id}`}>
					<Button
						beforeIcon={<UnorderedListOutlined />}
						className="bg-yellow-700 text-white
          "
					>
						{t("content.QUIZ_TAB__QUIZ_LIST__EDIT_BUTTON_LABEL")}
					</Button>
				</Link>
				<Button
					beforeIcon={<DeleteOutlined />}
					onClick={() => openDeleteQuizPopup(quiz.id)}
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
