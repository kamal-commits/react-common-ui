import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "React-Common-Ui",
			fileName: "react-common-ui",
		},
		rollupOptions: {
			external: ["react", "react-dom", "@mui/material"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"@mui/material": "MaterialUI",
				},
			},
		},
	},
});
