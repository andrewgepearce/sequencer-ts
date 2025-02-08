import {TextMetadata} from "../models/TextMetadata";
import {mapColourToRGB, validateColour} from "./validateColours";

export function validateTextMetadata(metadata: TextMetadata): boolean {
	const isPositiveWholeNumber = (value: number) => Number.isInteger(value) && value > 0;
	const isNonNegativeWholeNumber = (value: number) => Number.isInteger(value) && value >= 0;
	const validateColourProperty = (colour?: string) => {
		if (colour) {
			const mappedColour = mapColourToRGB(colour) || colour;
			validateColour(mappedColour);
			return true;
		}
		return true;
	};
	if (metadata.fontSizePx !== undefined && !isPositiveWholeNumber(metadata.fontSizePx)) {
		throw new Error(`fontSizePx - invalid`);
	}
	if (metadata.padding !== undefined && !isNonNegativeWholeNumber(metadata.padding)) {
		throw new Error(`padding - invalid`);
	}
	if (metadata.vpadding !== undefined && !isNonNegativeWholeNumber(metadata.vpadding)) {
		throw new Error(`vpadding - invalid`);
	}
	if (metadata.spacing !== undefined && !isNonNegativeWholeNumber(metadata.spacing)) {
		throw new Error(`spacing - invalid`);
	}
	if (metadata.borderWidth !== undefined && !isNonNegativeWholeNumber(Number(metadata.borderWidth))) {
		throw new Error(`borderWidth - invalid`);
	}
	if (
		metadata.borderDash !== undefined &&
		!(
			Array.isArray(metadata.borderDash) &&
			(metadata.borderDash.length === 0 || (metadata.borderDash.length <= 2 && metadata.borderDash.every(isPositiveWholeNumber)))
		)
	) {
		throw new Error(`borderDash - invalid`);
	}

	try {
		validateColourProperty(metadata.fgColour);
	} catch (error) {
		throw new Error(`fgColour - ${(error as Error).message}`);
	}
	try {
		validateColourProperty(metadata.bgColour);
	} catch (error) {
		throw new Error(`bgColour - ${(error as Error).message}`);
	}
	try {
		validateColourProperty(metadata.borderColour);
	} catch (error) {
		throw new Error(`borderColour - ${(error as Error).message}`);
	}
	return true;
}
