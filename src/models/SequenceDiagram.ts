import {Params} from "./Params";
import {Actor} from "./Actor";

export interface SequenceDiagram {
	title?: string | string[]; // Supports both string and array of strings
	version?: string;
	actors: Actor[];
	params?: Params;
}
