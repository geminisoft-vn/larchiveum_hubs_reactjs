export interface IDocument {
	id: number;
	title: string;
	description: string;
	content: string;
	activated: number;
	deleted: number;
	createdBy: number;
	updatedBy: number;
	createdAt: Date;
	updatedAt: Date;
}
