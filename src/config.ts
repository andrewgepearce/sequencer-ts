import {TextMetadata} from "./models/TextMetadata";

export interface ProjectConfig {
	globalSpacing: number;
	defaultBgColor: string;
	tags: string[];
	enableDebugLogging: boolean;
	defaultTitle: string;
	textMetadata: TextMetadata;
}

// 2️⃣ Create a Constant with Default Values
export const Config: Readonly<ProjectConfig> = {
	globalSpacing: 30,
	defaultBgColor: "rgb(255,255,255)",
	tags: [],
	enableDebugLogging: true,
	defaultTitle: "<No Title Set>",
	textMetadata: {
		fontFamily: "serif",
		fontSizePx: 10,
	},
};
