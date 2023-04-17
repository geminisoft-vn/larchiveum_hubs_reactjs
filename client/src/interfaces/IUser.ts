export interface IUser {
	id: number;
	email: string;
	displayName: string;
	avatar: string;
	avatarId: string;
	password: string;
	type: number;
	system: number;
	deleted: number;
	token: string;
	hubsToken: string;
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

export interface IUserAuthenticationForm {
	displayName: string;
	email: string;
	password: string;
	repassword: string;
	type: number;
}
