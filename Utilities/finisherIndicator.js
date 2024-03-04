/**
 * CrossCode Speedrun Utilities - finisherIndicator.js
 *
 * HUD Indicator for how early or late the player is on
 * dash cancelling the bonus hit of a Full Combo
 */
import { getFrameNumber, roundValue } from "../Helpers/utils.js";

//Toggle On/Off seeing the HUD Indicators
sc.OPTIONS_DEFINITION["show-finisher-indicator"] = {
	type: "CHECKBOX",
	init: false,
	cat: sc.OPTION_CATEGORY.INTERFACE,
	hasDivider: true,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["show-finisher-time"] = {
	type: "CHECKBOX",
	init: false,
	cat: sc.OPTION_CATEGORY.INTERFACE,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

const finisherDisplayTime = 1;

/**
 * Finisher Status State
 */
let isInFinisher = false; //Player's Current Action Key, a finisher is "ATTACK_FINISHER"
let hitCount = 0; //Number of Finisher Hits
let hitTarget = null; //The target we first hit with a finisher
let hitTargetPart = null; //If applicable, what part of the target we hit
let hitTime = null; //The hit time of the 2nd finisher hit

let hitFrame = -1;

function resetFinisherStatus() {
	isInFinisher = false;
	hitCount = 0;
	hitTarget = null;
	hitTargetPart = null;
	hitTime = null;
	hitFrame = -1;
}

/**
 * @inject
 * Check for Damage Events
 * If this damage event was inflicted by the player,
 * check for a 2nd hit to the same enemy
 */
ig.ENTITY.Combatant.inject({
	onDamage(damagingEntity, attackInfo, partEntity) {
		if (damagingEntity.getCombatant() === sc.model.player.params.combatant) {
			if (isInFinisher) {
				if (hitCount === 0) {
					hitTarget = this;

					if (partEntity) {
						hitTargetPart = partEntity;
					} else {
						hitTargetPart = null;
					}

					hitCount += 1;
				} else if (hitCount === 1) {
					//Have we hit the same target for this hit?
					if (hitTarget && hitTarget === this) {
						//If this target consists of several parts, have we hit the same part?
						if (!hitTargetPart || hitTargetPart === partEntity) {
							hitTime = ig.Timer.time;
							hitFrame = getFrameNumber();
							hitCount += 1;
						}
					}
				}
			}
		}

		return this.parent(damagingEntity, attackInfo, partEntity);
	},
});

/**
 * @inject
 * Check for the Attack Finisher action
 * Check for the Dash action to test timing with
 */
ig.ENTITY.Player.inject({
	startCloseCombatAction(actionKey, input) {
		if (actionKey == "ATTACK_FINISHER") {
			isInFinisher = true;
		} else {
			resetFinisherStatus();
		}

		this.parent(actionKey, input);
	},

	startDash() {
		if (this.state == 3 && isInFinisher) {
			if (hitTarget && sc.options && sc.options.get("show-finisher-indicator")) {
				let timingText;
				const frameDelta = getFrameNumber() - hitFrame;

				//No hit occurred before this dash, early
				if (hitFrame < 0) {
					timingText = `Early`;
				}
				//We dashed on the immediate frame after the hit, perfect
				else if (getFrameNumber() - hitFrame <= 1) {
					timingText = `Perfect`;
				}
				//We were late and want to show time passed
				else if (sc.options.get("show-finisher-time")) {
					timingText = `Late (${roundValue(ig.Timer.time - hitTime)})`;
				}
				//We were late and want to show the number of frames late
				else {
					timingText = `Late (${frameDelta - 1} frame${frameDelta - 1 === 1 ? "" : "s"})`;
				}

				let dashTimingGui = new sc.SmallEntityBox(ig.game.playerEntity, timingText, finisherDisplayTime);
				dashTimingGui.stopRumble();
				ig.gui.addGuiElement(dashTimingGui);
			}
		}

		this.parent();
	},
});

