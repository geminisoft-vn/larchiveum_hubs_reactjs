export interface IAnswer {
	id: number;
	questionId: number;
	text: string;
	mediaUrl: string;
	order: number;
	isCorrectAnswer: number;
	activated: number;
	deleted: number;
	createdBy: number;
	updatedBy: number;
	createdAt: Date;
	updatedAt: Date;
}
