import {Config} from "./config";
import {parseDiagram} from "./parsers/DiagramParser";
const testo = {
	title: "123",
	actors: [{name: "n", alias: "n", bgColour: "cyan"}],
};
try {
	const diagram = parseDiagram(JSON.stringify(testo), "json");
	console.log(diagram);
} catch (error) {
	console.log((error as Error).message);
}
