import { IPagination } from "./IPagination";

export interface IAxiosResponse<T = any> {
	data: T;
	items: { begin: number; end: number; total: number };
	pages: IPagination;
	message: string;
	result: "ok" | "fail";
}
