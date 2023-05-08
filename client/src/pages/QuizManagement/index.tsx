import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAppSelector } from "src/app/hooks";
import { Button, Loader } from "src/components";
import { getUserInfo } from "src/features/user/selectors";
import { useData } from "src/hooks";

import Quizzes from "./Quizzes";

const QuizManagement = () => {
	const { t } = useTranslation();
	const user = useAppSelector(getUserInfo);

	const { data: quizzes, isLoading } = useData(
		`/quizzes`,
		"GET",
		{
			sort: "-createdAt",
			filter: JSON.stringify([
				{
					operator: "=",
					key: "createdBy",
					value: user.id,
				},
			]),
		},
		() => {},
	);

  console.log({quizzes})

	return (
		<div className="flex flex-col items-center justify-start gap-2">
			<Link to="/home/content/quiz/form">
				<Button className="self-start bg-blue-700 text-white">
					{t("content.QUIZ_TAB__QUIZ_LIST__QUIZ_TAB__ADD_QUIZ_BUTTON_LABEL")}
				</Button>
			</Link>
			{isLoading ? <Loader /> : <Quizzes quizzes={quizzes} />}
		</div>
	);
};

export default QuizManagement;
