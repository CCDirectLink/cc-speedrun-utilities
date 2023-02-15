import { roundValue } from "../Helpers/utils.js";

/**
 * CrossCode Speedrun Utilities - variableDisplay.js
 * 
 * Displays the real-time values of arbitrary expressions / variables for
 * analyzing how they change.
 */

sc.OPTIONS_DEFINITION["show-variable-display"] = {
	type: "CHECKBOX",
	init: false,
	cat: sc.OPTION_CATEGORY.INTERFACE,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

let variableDisplay;
let prev2DSpeedArray = [0.0, 0.0, 0.0, 0.0, 0.0], curr2DSpeed = 0;

function initializeDisplay() {
	variableDisplay = document.createElement('h1');
	variableDisplay.style.position = 'fixed';
	variableDisplay.style.left = '10px';
	variableDisplay.style.bottom = '200px';
	variableDisplay.style.color = 'white';
	variableDisplay.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
	variableDisplay.style.zIndex = '2147483647';
	variableDisplay.style.pointerEvents = 'none';
	document.body.appendChild(variableDisplay);
}

initializeDisplay();

function updateDisplay() {
	variableDisplay.innerHTML = '';

	if(sc.options && sc.options.get("show-variable-display")) {

		if(ig.game.playerEntity) {
			const playerPos = ig.game.playerEntity.getCenter();
			const playerVel = ig.game.playerEntity.coll.vel;
			const accelDir = ig.game.playerEntity.coll.accelDir;

			if(curr2DSpeed !== Vec2.lengthVec(playerVel)) {
				prev2DSpeedArray.shift();
				prev2DSpeedArray.push(curr2DSpeed);
			}
			curr2DSpeed = Vec2.lengthVec(playerVel);

			variableDisplay.innerHTML += `Tick: ${roundValue(ig.system.tick, 1000000)}<br>`; 
			variableDisplay.innerHTML += `Position: X: ${playerPos.x}, Y: ${playerPos.y} <br>`
			variableDisplay.innerHTML += `Velocity: X: ${roundValue(playerVel.x)}, Y: ${roundValue(playerVel.y)}, Z: ${roundValue(playerVel.z)}<br>`
			variableDisplay.innerHTML += `2D Speed: ${roundValue(curr2DSpeed)}<br>`;

			let prevSpeedStr = `Prev Speeds: [`;
			for(let i = 0; i < prev2DSpeedArray.length; i++) {
				prevSpeedStr += `${roundValue(prev2DSpeedArray[i])}` + ((i < prev2DSpeedArray.length - 1) ? ', ' : ']<br>');
			}
			variableDisplay.innerHTML += prevSpeedStr;
			variableDisplay.innerHTML += `Max Velocity: ${roundValue(ig.game.playerEntity.coll.maxVel)}<br>`;
			variableDisplay.innerHTML += `Relative Velocity: ${roundValue(ig.game.playerEntity.coll.relativeVel)}<br>`;
			variableDisplay.innerHTML += `Accel Direction: X:${roundValue(accelDir.x)}, Y: ${roundValue(accelDir.y)}, Z: ${roundValue(accelDir.z)}<br>`;
			variableDisplay.innerHTML += `Accel Speed: ${roundValue(ig.game.playerEntity.coll.accelSpeed)}<br>`;

			variableDisplay.innerHTML += `Camera Duration: ${roundValue(ig.camera._duration)}<br>`;
			variableDisplay.innerHTML += `Time Until Target Reached: ${roundValue(ig.camera.getTimeUntilTargetReached())}<br>`;
		}
	}
}

ig.game.addons.postUpdate.push({
	onPostUpdate: updateDisplay
});