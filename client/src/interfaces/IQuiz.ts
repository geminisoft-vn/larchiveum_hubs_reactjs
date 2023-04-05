import { IQuestion } from "./IQuestion";

export interface IQuiz {
	id: number;
	title: string;
	description: string;
	introduction: string;
	mediaUrl: string;
	activated: number;
	deleted: number;
	createdBy: number;
	updatedBy: number;
	createdAt: Date;
	updatedAt: Date;
	questions?: IQuestion[];
}
