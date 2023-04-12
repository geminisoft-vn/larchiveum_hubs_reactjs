export type TModalAction = {
	form?: string;
	text: string;
	className?: string;
	important?: boolean;
	danger?: boolean;
	callback?: () => void;
};
