/// <reference types="vite/client" />
import "i18next";

declare module "i18next" {
	export interface CustomTypeOptions {
		returnNull: false;
	}
}
