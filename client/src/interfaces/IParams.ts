type TFilter = {
	key: "";
	operator: "";
	value: "";
};

export interface IParams {
	page: number;
	pageSize: number;
	sort: string;
	query: string;
	filter: TFilter[];
}
