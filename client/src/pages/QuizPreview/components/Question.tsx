import { useState } from "react";
import { Checkbox, Col, Radio, Row, Space, Spin } from "antd";

import { Button, Stack } from "src/components";
import { IQuestion } from "src/interfaces";
import { useAppDispatch } from "src/app/hooks";
import { updateQuestion } from "src/features/quiz/QuizSlice";

type Props = {
	index: number;
	question: IQuestion;
	onSubmitAnswer: () => void;
};

const Question = (props: Props) => {
	const { index, question, onSubmitAnswer } = props;

	const dispatch = useAppDispatch();

	const handleChangeRadio = (e: React.ChangeEvent) => {
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

	const handleChangeSelect = (e) => {
		const { name, checked } = e.target;
		let clone = [...(question.chosenAnswer || [])];
		if (checked) {
			clone.push(name);
		} else {
			const idx = clone.findIndex((obj) => obj === name);
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
					<div span={24} style={{ fontSize: "2em", fontWeight: "bold" }}>
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
										name={answer.id}
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
