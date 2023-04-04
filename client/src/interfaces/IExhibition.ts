import { IRoom } from "./IRoom";

export interface IExhibition {
	id: number;
	roomId: string;
	sceneId: string;
	room: IRoom;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	reservationCount: number;
	maxSize: number;
	public: boolean | string | undefined;
	deleted: boolean;
	closed: boolean;
	enableFly: boolean;
	enablePinObjects: boolean;
	enableSpawnAndMoveMedia: boolean;
	enableSpawnCamera: boolean;
	enableSpawnDrawing: boolean;
	enableSpawnEmoji: boolean;
	createdBy: number;
	updatedBy: number;
	createdAt: string;
	updatedAt: string;
}
