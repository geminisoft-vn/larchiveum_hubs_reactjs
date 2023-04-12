import { IScene } from "./IScene";

export interface IRoom {
	description: string;
	id: string;
	lobbyCount: number;
	name: string;
	roomSize: number;
	scene: IScene;
	thumbnailUrl: string;
}
