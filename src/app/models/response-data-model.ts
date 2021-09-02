import { ResultModel } from "./result-model";

export interface ResponseDataModel {
	page: number;
	results?: ResultModel[] | null;
	total_pages: number;
	total_results: number;
}
