export type TModalAction = {
	form?: string;
	text: string;
	className: string;
	important?: boolean;
	callback?: () => void;
};
