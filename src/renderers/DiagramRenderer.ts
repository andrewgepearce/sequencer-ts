import {Config} from "../config";

////////////////////////////////////////////////////////////////////////////////
export function renderTitle(title?: string | string[]): string {
	if (Array.isArray(title)) {
		return title.join(" - ");
	}
	return title || Config.defaultTitle;
}
