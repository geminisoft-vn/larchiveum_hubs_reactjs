import { IAnswer } from "./IAnswer";

export interface IQuestion {
	id: number;
	quizId: number;
	text: string;
	mediaUrl: string;
	order: number;
	multiple: number | string;
	activated: number;
	deleted: number;
	answers: IAnswer[];
	createdBy: number;
	updatedBy: number;
	createdAt: number;
	updatedAt: number;
}
