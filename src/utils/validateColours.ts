// validateColour.ts

////////////////////////////////////////////////////////////////////////////////
// Regular Expressions for RGB and RGBA
const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;

////////////////////////////////////////////////////////////////////////////////
// Helper Function to Check RGB Component Range
function isValidRGBComponent(value: number): boolean {
	return value >= 0 && value <= 255;
}

////////////////////////////////////////////////////////////////////////////////
// Validate Colour Function
export function validateColour(colour: string): boolean {
	let match = colour.match(rgbRegex);
	if (match) {
		const [r, g, b] = match.slice(1).map(Number);
		return [r, g, b].every(isValidRGBComponent);
	}

	match = colour.match(rgbaRegex);
	if (match) {
		const [r, g, b, a] = match.slice(1).map(Number);
		return [r, g, b, a].every(isValidRGBComponent);
	}
	throw new Error(`Color "${colour}" is not valid`);
}

////////////////////////////////////////////////////////////////////////////////
// Mapping Function to Convert CSS/HTML Colour Names to RGB
const colorMap: {[key: string]: string} = {
	black: "rgb(0, 0, 0)",
	silver: "rgb(192, 192, 192)",
	gray: "rgb(128, 128, 128)",
	white: "rgb(255, 255, 255)",
	maroon: "rgb(128, 0, 0)",
	red: "rgb(255, 0, 0)",
	purple: "rgb(128, 0, 128)",
	fuchsia: "rgb(255, 0, 255)",
	green: "rgb(0, 128, 0)",
	lime: "rgb(0, 255, 0)",
	olive: "rgb(128, 128, 0)",
	yellow: "rgb(255, 255, 0)",
	navy: "rgb(0, 0, 128)",
	blue: "rgb(0, 0, 255)",
	teal: "rgb(0, 128, 128)",
	aqua: "rgb(0, 255, 255)",
	orange: "rgb(255, 165, 0)",
	aliceblue: "rgb(240, 248, 255)",
	antiquewhite: "rgb(250, 235, 215)",
	aquamarine: "rgb(127, 255, 212)",
	azure: "rgb(240, 255, 255)",
	beige: "rgb(245, 245, 220)",
	bisque: "rgb(255, 228, 196)",
	blanchedalmond: "rgb(255, 235, 205)",
	blueviolet: "rgb(138, 43, 226)",
	brown: "rgb(165, 42, 42)",
	burlywood: "rgb(222, 184, 135)",
	cadetblue: "rgb(95, 158, 160)",
	chartreuse: "rgb(127, 255, 0)",
	chocolate: "rgb(210, 105, 30)",
	coral: "rgb(255, 127, 80)",
	cornflowerblue: "rgb(100, 149, 237)",
	cornsilk: "rgb(255, 248, 220)",
	crimson: "rgb(220, 20, 60)",
	cyan: "rgb(0, 255, 255)",
	darkblue: "rgb(0, 0, 139)",
	darkcyan: "rgb(0, 139, 139)",
	darkgoldenrod: "rgb(184, 134, 11)",
	darkgray: "rgb(169, 169, 169)",
	darkgreen: "rgb(0, 100, 0)",
	darkkhaki: "rgb(189, 183, 107)",
	darkmagenta: "rgb(139, 0, 139)",
	darkolivegreen: "rgb(85, 107, 47)",
	darkorange: "rgb(255, 140, 0)",
	darkorchid: "rgb(153, 50, 204)",
	darkred: "rgb(139, 0, 0)",
	darksalmon: "rgb(233, 150, 122)",
	darkseagreen: "rgb(143, 188, 143)",
	darkslateblue: "rgb(72, 61, 139)",
	darkslategray: "rgb(47, 79, 79)",
	darkturquoise: "rgb(0, 206, 209)",
	darkviolet: "rgb(148, 0, 211)",
	deeppink: "rgb(255, 20, 147)",
	deepskyblue: "rgb(0, 191, 255)",
	dimgray: "rgb(105, 105, 105)",
	dodgerblue: "rgb(30, 144, 255)",
	firebrick: "rgb(178, 34, 34)",
	floralwhite: "rgb(255, 250, 240)",
	forestgreen: "rgb(34, 139, 34)",
	gainsboro: "rgb(220, 220, 220)",
	ghostwhite: "rgb(248, 248, 255)",
	gold: "rgb(255, 215, 0)",
	goldenrod: "rgb(218, 165, 32)",
	graytext: "rgb(128, 128, 128)",
};

////////////////////////////////////////////////////////////////////////////////
export function mapColourToRGB(colour: string): string | null {
	return colorMap[colour.toLowerCase()] || null;
}
