import Ajv from "ajv";
import schema from "../models/SequenceDiagram.schema.json";
import {SequenceDiagram} from "../models/SequenceDiagram";
import {validateTextMetadata} from "./validateTextMetadata";

////////////////////////////////////////////////////////////////////////////////
const ajv = new Ajv();
const validate = ajv.compile(schema);
export function validateDiagram(data: unknown): boolean {
	const isValid = validate(data);
	if (!isValid) {
		throw new Error(`JSON schema validation failed:\n${JSON.stringify(validate.errors, null, 3)}`);
	}
	validateSequenceDiagram(data);
	return true;
}

////////////////////////////////////////////////////////////////////////////////
// Helper function to validate the SequenceDiagram
function validateSequenceDiagram(diagram: any): boolean {
	if (!diagram.actors || !Array.isArray(diagram.actors) || diagram.actors.length === 0) {
		throw new Error(`Actors not present or valid`);
	}
	for (const actor of diagram.actors) {
		if (!actor.name || !actor.alias) {
			throw new Error(`Actors must have a name or alias`);
		}
		validateTextMetadata(actor);
	}
	if (diagram.params && diagram.params.comment) {
		validateTextMetadata(diagram.params.comment);
	}
	return true;
}
