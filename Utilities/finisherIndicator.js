/**
 * CrossCode Speedrun Utilities - finisherIndicator.js
 * 
 * HUD Indicator for how early or late the player is on
 * dash cancelling the bonus hit of a Full Combo
 */

//Toggle On/Off seeing the HUD Indicators
sc.OPTIONS_DEFINITION["show-finisher-indicator"] = {
	type: "CHECKBOX",
	init: false,
	cat: sc.OPTION_CATEGORY.INTERFACE,
	hasDivider: true,
	header: "cc-speedrun-utilities",
};

/**
 * Variables for Finisher Status
 */
let inFinisher = false, hitCount = 0, target = null, hitTime = null;

function combatantIsPlayer(combatant) {
	return combatant == sc.model.player.params.combatant;
}

function resetFinisherStatus() {
	hitCount = 0;
	target = null;
	hitTime = null;
}

function getTimingText() {

	if(hitTime) {
		const LATE_TIME = Math.round(((ig.Timer.time - hitTime) + Number.EPSILON) * 1000) / 1000;
		return `Late (${LATE_TIME})`;
	}
	else {
		return `Early`;
	}
}

/**
 * @inject
 * Check for Damage Events
 * If this damage event was inflicted by the player,
 * check for a 2nd hit to the same enemy
 */
ig.ENTITY.Combatant.inject({
	onDamage(a,c,g) {

		if(combatantIsPlayer(a.getCombatant())) {
			if(inFinisher) {
				if(hitCount <= 0) {
					target = this;
				}
				hitCount++;

				if(hitCount >= 2 && target && target == this) {
					//console.log(`Finisher Hit #2 To Same Target`);
					hitTime = ig.Timer.time;
				}
			}
			else {
				resetFinisherStatus();
			}
		}

		return this.parent(a,c,g);
	}
});

/**
 * @inject
 * Check for the Attack Finisher action
 * Check for the Dash action to test timing with
 */
ig.ENTITY.Player.inject({

	startCloseCombatAction(a, b) {

		inFinisher = (a == "ATTACK_FINISHER");

		if(!inFinisher) {
			resetFinisherStatus();
		}

		this.parent(a,b);
	},

	startDash() {
		if(this.state == 3) {
			//console.log(`Attack Dash Cancel`);
			
			if(inFinisher) {
				if(target && sc.options && sc.options.get("show-finisher-indicator")) {
					const TIMING_TEXT = getTimingText();

					let dashTimingGui = new sc.SmallEntityBox(ig.game.playerEntity, TIMING_TEXT, 1);
					dashTimingGui.stopRumble();
					ig.gui.addGuiElement(dashTimingGui);
				}				
			}
			else {
				resetFinisherStatus();
			}

		}

		this.parent();
	}

});