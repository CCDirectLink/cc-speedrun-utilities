/**
 * Rounds a value to a specified number of decimal places.
 * A placeValue of 1000 corresponds to rounding to 3 decimal places, 100 means 2, and so on.
 *
 * @param {*} value Value to be rounded
 * @param {*} placeValue Number by which to scale rounding by
 * @returns Rounded result
 */
export function roundValue(value, placeValue = 1000) {
	if (placeValue === 0.0) return value;

	return Math.floor(value * placeValue) / placeValue;
}

/**
 * Variable for tracking a frame counter
 */
let frameNumber = 0;
let hasHooked = false;

/**
 * Returns a frame counter starting from the first call of this function (once ig.game exists).
 *
 * Useful when you need to measure the number of frames passed, not very helpful if you want the
 * exact number of total game frames.
 */
export function getFrameNumber() {
	if (!hasHooked && ig.game) {
		ig.game.addons.preUpdate.push({
			onPreUpdate: () => {
				frameNumber += 1;
			},
		});

		hasHooked = true;
	}

	return frameNumber;
}
