import { IRoom } from "./IRoom";

export interface IExhibition {
	id: number;
	roomId: string;
	sceneId: string;
	room: IRoom;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	reservationCount: number;
	maxSize: number;
	public: number;
	deleted: number;
	closed: number;
	enableFly: number;
	enablePinObjects: number;
	enableSpawnAndMoveMedia: number;
	enableSpawnCamera: number;
	enableSpawnDrawing: number;
	enableSpawnEmoji: number;
	createdBy: number;
	updatedBy: number;
	createdAt: Date;
	updatedAt: Date;
}
