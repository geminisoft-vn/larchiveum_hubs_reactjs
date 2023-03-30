export interface IQuestion {
	id: number;
	quizId: number;
	text: string;
	mediaUrl: string;
	order: number;
	multiple: number;
	activated: number;
	deleted: number;
	createdBy: number;
	updatedBy: number;
	createdAt: Date;
	updatedAt: Date;
}
