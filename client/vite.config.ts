import react from "@vitejs/plugin-react";
import path from "path";
import url from "url";
import { defineConfig } from "vite";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "./www",
	},
	resolve: {
		alias: [
			{
				find: "src",
				replacement: path.resolve(__dirname, "src"),
			},
		],
	},
	server: {
		port: 8080,
	},
});
