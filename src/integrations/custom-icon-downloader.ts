import type { AstroIntegration } from "astro";
import type { FileObject } from "@/lib/interfaces";
import { getDatabase, downloadFile } from "../lib/notion/client";

export default (): AstroIntegration => ({
	name: "custom-icon-downloader",
	hooks: {
		"astro:build:start": async () => {
			const database = await getDatabase();
			const icon = database.Icon as FileObject;
			
			// Check if we have a database icon that is a file (including custom emojis)
			if (!database.Icon || (database.Icon.Type !== "file" && database.Icon.Type !== "external")) {
				console.log("No database icon found or icon is not a file/external type:", database.Icon?.Type);
				return Promise.resolve();
			}

			let url!: URL;
			try {
				url = new URL(icon.Url);
			} catch (err) {
				console.log("Invalid Icon image URL");
				return Promise.resolve();
			}

			return downloadFile(url, false, true);
		},
	},
});
