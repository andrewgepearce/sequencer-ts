import {TextMetadata} from "./TextMetadata";

export interface Params {
	comment?: Comment;
	globalSpacing?: number;
	tags?: Array<string>;
}

interface Comment extends TextMetadata {
	bgColour?: string;
	spacing: number;
}
