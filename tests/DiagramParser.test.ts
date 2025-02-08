import {Config} from "../src/config";
import {parseDiagram} from "../src/parsers/DiagramParser";
import {validateDiagram} from "../src/utils/validateDiagram";
import {SequenceDiagram} from "../src/models/SequenceDiagram";

////////////////////////////////////////////////////////////////////////////////
// Jest Test Suite
describe("SequenceDiagram Validation", () => {
	////////////////////////////////////////////////////////////////////////////////
	it("should support an object without a title (should be set to a default value)", () => {
		const testo = {
			actors: [{name: "n", alias: "n"}],
		};
		const diagram = parseDiagram(JSON.stringify(testo), "json");
		expect(diagram.title).toBe(Config.defaultTitle);
	});

	////////////////////////////////////////////////////////////////////////////////
	it("should support an array of titles", () => {
		const testo = {
			title: ["Part 1", "Part 2"],
			actors: [{name: "n", alias: "n"}],
		};
		const diagram = parseDiagram(JSON.stringify(testo), "json");
		expect(diagram.title).toEqual(["Part 1", "Part 2"]);
	});

	////////////////////////////////////////////////////////////////////////////////
	it("should keep provided title", () => {
		const testo = {
			title: "Custom Title",
			actors: [{name: "n", alias: "n"}],
		};
		const diagram = parseDiagram(JSON.stringify(testo), "json");
		expect(diagram.title).toBe("Custom Title");
	});

	////////////////////////////////////////////////////////////////////////////////
	it("should pass with a string title", () => {
		const validDiagram = {
			title: "Test Diagram",
			actors: [{name: "User", alias: "U"}],
		};

		expect(validateDiagram(validDiagram)).toBe(true);
	});

	////////////////////////////////////////////////////////////////////////////////
	it("should fail with a numeric title", () => {
		const invalidDiagram = {
			title: 123, // Invalid title
			actors: [{alias: "U"}], // Missing 'name'
		};
		expect(validateDiagram(invalidDiagram)).toBe(false);
	});

	//////////////////////////////////////////////////////////////////////////////
	it("should validate a correct SequenceDiagram", () => {
		const validDiagram: SequenceDiagram = {
			title: "Sample Diagram",
			version: "1.0",
			actors: [
				{name: "Alice", alias: "A", fontSizePx: 14, fgColour: "rgb(255, 0, 0)"},
				{name: "Bob", alias: "B", padding: 5, bgColour: "blue"},
			],
			params: {
				globalSpacing: 10,
				comment: {spacing: 5, bgColour: "yellow"},
				tags: ["example", "test"],
			},
		};

		expect(validateDiagram(validDiagram)).toBe(true);
	});

	////////////////////////////////////////////////////////////////////////////////
	it("should fail when actors are missing", () => {
		const invalidDiagram: SequenceDiagram = {
			title: "Invalid Diagram",
			version: "1.0",
			actors: [],
		};

		expect(validateDiagram(invalidDiagram)).toBe(false);
	});

	//////////////////////////////////////////////////////////////////////////////
	it("should fail when actor name or alias is missing", () => {
		const invalidDiagram: SequenceDiagram = {
			title: "Invalid Diagram",
			version: "1.0",
			actors: [{name: "Charlie", alias: ""}], // Missing alias
		};

		expect(validateDiagram(invalidDiagram)).toBe(false);
	});

	//////////////////////////////////////////////////////////////////////////////
	it("should fail when invalid colours are provided", () => {
		const invalidDiagram: SequenceDiagram = {
			title: "Invalid Colours",
			version: "1.0",
			actors: [{name: "Dave", alias: "D", fgColour: "invalidColor"}], // Invalid colour
		};

		expect(validateDiagram(invalidDiagram)).toBe(false);
	});

	//////////////////////////////////////////////////////////////////////////////
	it("should fail when fontSizePx is not a positive integer", () => {
		const invalidDiagram: SequenceDiagram = {
			title: "Invalid Font Size",
			version: "1.0",
			actors: [{name: "Eve", alias: "E", fontSizePx: -12}], // Invalid font size
		};

		expect(validateDiagram(invalidDiagram)).toBe(false);
	});

	//////////////////////////////////////////////////////////////////////////////
	it("should fail when borderDash exceeds two elements", () => {
		const invalidDiagram: SequenceDiagram = {
			title: "Invalid BorderDash",
			version: "1.0",
			actors: [{name: "Frank", alias: "F", borderDash: [5, 10, 15]}], // More than two elements
		};

		expect(validateDiagram(invalidDiagram)).toBe(false);
	});

	//////////////////////////////////////////////////////////////////////////////
	it("should pass when borderDash is empty or has at most two positive integers", () => {
		const validDiagram: SequenceDiagram = {
			title: "Valid BorderDash",
			version: "1.0",
			actors: [
				{name: "Grace", alias: "G", borderDash: []},
				{name: "Henry", alias: "H", borderDash: [5, 10]},
			],
		};

		expect(validateDiagram(validDiagram)).toBe(true);
	});
});
