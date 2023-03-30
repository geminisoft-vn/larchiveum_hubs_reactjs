export interface IUser {
	id: number;
	email: string;
	displayName: string;
	avatarId: string;
	password: string;
	type: number;
	system: number;
	deleted: number;
	emailVerifyToken: string;
	googleEmail: string;
	facebookId: string;
	naverId: string;
	kakaoId: string;
	resetPasswordToken: string;
	createdBy: number;
	updatedBy: number;
	createdAt: Date;
	updatedAt: Date;
}
