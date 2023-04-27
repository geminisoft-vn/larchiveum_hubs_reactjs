import { Checkbox, Col, Radio, Row, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { RadioChangeEvent } from "antd/es/radio";

import { useAppDispatch } from "src/app/hooks";
import { Button } from "src/components";
import { updateQuestion } from "src/features/quiz/QuizSlice";
import { IQuestion } from "src/interfaces";

type Props = {
	index: number;
	question: IQuestion;
	onSubmitAnswer: () => void;
};

const Question = (props: Props) => {
	const { index, question, onSubmitAnswer } = props;

	const dispatch = useAppDispatch();

	const handleChangeRadio = (e: RadioChangeEvent) => {
		const { value } = e.target;
		dispatch(
			updateQuestion({
				id: question.id,
				dataToUpdate: {
					chosenAnswer: [value],
				},
			}),
		);
	};

	const handleChangeSelect = (e: CheckboxChangeEvent) => {
		const { name, checked } = e.target;
		if (!name) return;
		const clone = [...(question.chosenAnswer || [])];
		if (checked) {
			clone.push(parseInt(name, 10));
		} else {
			const idx = clone.findIndex((obj) => obj === parseInt(name, 10));
			if (idx > -1) {
				clone.splice(idx, 1);
			}
		}
		dispatch(
			updateQuestion({
				id: question.id,
				dataToUpdate: {
					chosenAnswer: clone,
				},
			}),
		);
	};

	const handleSubmitAnswer = () => {
		onSubmitAnswer();
	};

	return (
		<div>
			<>
				<div style={{ width: "100%", marginBottom: "50px" }}>
					<div style={{ fontSize: "2em", fontWeight: "bold" }}>
						{index + 1} {". "} {question?.text}
					</div>
				</div>
				{question?.multiple ? (
					<Space direction="vertical">
						{question?.answers?.map((answer) => (
							<Row
								key={answer.id}
								style={{
									width: "100%",
									marginTop: "20px",
									fontWeight: "normal",
								}}
							>
								<Col span={24}>
									<Checkbox
										name={answer.id.toString()}
										onChange={handleChangeSelect}
										style={{ fontWeight: "normal" }}
									>
										{answer?.text}
									</Checkbox>
								</Col>
							</Row>
						))}
					</Space>
				) : (
					<Radio.Group
						onChange={(e) => {
							handleChangeRadio(e);
						}}
					>
						<Space direction="vertical">
							{question?.answers?.map((answer) => (
								<Radio
									key={answer.id}
									value={answer.id}
									style={{ marginTop: "20px", fontWeight: "normal" }}
								>
									{answer.text}
								</Radio>
							))}
						</Space>
					</Radio.Group>
				)}
				<div style={{ width: "100%", marginTop: "10vh" }}>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Button onClick={handleSubmitAnswer}>Submit answer</Button>
					</div>
				</div>
			</>
		</div>
	);
};

export default Question;
