import * as yaml from "js-yaml";
import {Config} from "../config";
import {SequenceDiagram} from "../models/SequenceDiagram";
import {validateDiagram} from "../utils/validateDiagram";

////////////////////////////////////////////////////////////////////////////////
// Constants

////////////////////////////////////////////////////////////////////////////////
export function parseDiagram(input: string, format: "json" | "yaml"): SequenceDiagram {
	//////////////////////////////////////////////////////////////////////////////
	// Read the data
	const data = format === "json" ? JSON.parse(input) : yaml.load(input);
	const diagram = data as SequenceDiagram;

	//////////////////////////////////////////////////////////////////////////////
	if (!validateDiagram(data)) {
		throw new Error("Invalid JSON structure for SequenceDiagram.");
	}

	//////////////////////////////////////////////////////////////////////////////
	// Manage title
	// We use the nullish coalescing operator (??) to set the default only if title is undefined or null.
	diagram.title = diagram.title ?? Config.defaultTitle;

	return diagram;
}
