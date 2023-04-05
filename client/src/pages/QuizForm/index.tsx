import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import _pick from "lodash/pick";
import _transform from "lodash/transform";

import AnswerService from "src/api/AnswerService";
import QuestionService from "src/api/QuestionService";
import QuizService from "src/api/QuizService";
import {
	Button,
	FormContainer,
	FormItem,
	Stack,
	TextInput,
	Typography,
} from "src/components";
import { IQuiz } from "src/interfaces";

import Questions from "./components/Questions";

const QuizForm = (props) => {
	const { t } = useTranslation();

	const { quizId } = useParams();
	const navigate = useNavigate();

	const methods = useForm<Partial<IQuiz>>({
		defaultValues: async () => {
			if (quizId) {
				const res = await QuizService.getOne(quizId);

				if (res.result === "ok") {
					if (res.data.questions) {
						await Promise.all(
							res.data.questions.map((question) =>
								QuestionService.getOne(question.id),
							),
						).then((questions) => {
							res.data.questions = questions.map((question) => ({
								...question.data,
								multiple: question.data.multiple ? "1" : "0",
							}));
						});
						return res.data;
					}
				}
			}
			return {
				title: "",
				introduction: "",
				description: "",
				questions: [],
			};
		},
	});

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleSaveQuiz = (data) => {
		const dataToSend = _transform(
			data,
			(result, value, key) => {
				if (key === "questions") {
					result[key] = value.map((item) => ({
						...item,
						multiple: item.multiple === "1",
					}));
				}
			},
			data,
		);

		if (quizId) {
			// const { dirtyFields } = methods.formState;
			// ["title", "introduction", "description"].forEach((item) => {
			// 	if (dirtyFields[item]) {
			// 		Object.assign(dataToSend, {
			// 			...data,
			// 			[item]: data[item],
			// 		});
			// 	}
			// });
			// QuizService.create(dataToSend)
			// 	.then(() => {})
			// 	.catch((err) => console.error(err));
		} else {
			QuizService.create(
				_pick(dataToSend, ["title", "introduction", "description"]),
			)
				.then((res) => {
					const { id } = res.data;
					Promise.all(
						dataToSend.questions.map((question) => {
							return QuestionService.create({
								quizId: id,
								text: question.text,
								multiple: question.multiple,
							});
						}),
					).then((questions) => {
						const ids = questions.map((obj) => obj.data.id);
						Promise.all(
							ids.map((questionId, index) => {
								return data.questions[index].answers.map((answer) => {
									return AnswerService.create({
										questionId,
										text: answer.text,
										isCorrectAnswer: answer.isCorrectAnswer,
									});
								});
							}),
						);
					});
				})
				.catch((err) => console.error(err));
		}
	};

	return (
		<FormProvider {...methods}>
			<Stack direction="col" gap={2}>
				<Typography className="text-center text-lg font-bold">
					{quizId ? "Edit Quiz" : "Create Quiz"}
				</Typography>
				<FormContainer onSubmit={methods.handleSubmit(handleSaveQuiz)}>
					<div className="flex flex-col gap-2 pb-4">
						<div className="flex justify-between">
							<Button beforeIcon={<LeftOutlined />} onClick={handleGoBack}>
								{t("__BUTTON__.BACK")}
							</Button>

							<Button
								className="bg-blue-500 text-white hover:text-white"
								type="submit"
							>
								{t("__BUTTON__.SAVE")}
							</Button>
						</div>
						<div className="flex flex-col gap-2">
							<FormItem
								label={t(
									"content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DETAIL__QUIZ_TITLE_INPUT_LABEL",
								)}
								renderInput={() => (
									<TextInput
										{...methods.register("title")}
										placeholder={t(
											"content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_TITLE_INPUT_PLACEHOLDER",
										)}
									/>
								)}
							/>

							<FormItem
								label={t(
									"content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_INTRODUCTION_INPUT_LABEL",
								)}
								renderInput={() => (
									<TextInput
										{...methods.register("introduction")}
										placeholder={t(
											"content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_INTRODUCTION_INPUT_PLACEHOLDER",
										)}
									/>
								)}
							/>

							<FormItem
								label={t(
									"content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_LABEL",
								)}
								renderInput={() => (
									<TextInput
										{...methods.register("description")}
										placeholder={t(
											"content.QUIZ_TAB__QUIZ_DETAIL__QUIZ_DESCRIPTION_INPUT_PLACEHOLDER",
										)}
									/>
								)}
							/>
						</div>

						<Questions quizId={quizId} />
					</div>
				</FormContainer>
			</Stack>
		</FormProvider>
	);
};

export default QuizForm;
