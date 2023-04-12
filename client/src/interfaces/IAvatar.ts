export interface IAvatar {
	allow_remixing: boolean;
	attributions: any;
	description: string;
	gltfs: {
		avatar: string;
		base: string;
	};
	id: string;
	images: {
		preview: {
			height: number;
			url: string;
			width: number;
		};
	};
	name: string;
	type: string;
	url: string;
}
