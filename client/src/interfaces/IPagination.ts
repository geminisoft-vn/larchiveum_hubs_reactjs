export interface IPagination {
	current?: number;
	prev?: number;
	hasPrevious?: boolean;
	next?: number;
	hasNext?: boolean;
	total?: number;
}
