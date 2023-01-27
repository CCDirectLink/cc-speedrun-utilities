/**
 * CrossCode Speedrun Utilities - healthHotkeys.js
 * 
 * Hotkeys for setting player and enemy health to specific amounts
 */

sc.HEALTH_PERCENTAGE_VALUES = {
	HEALTH_0: 0,
	HEALTH_5: 0.05,
	HEALTH_10: 0.1,
	HEALTH_15: 0.15,
	HEALTH_20: 0.2,
	HEALTH_25: 0.25,
	HEALTH_30: 0.3,
	HEALTH_35: 0.35,
	HEALTH_40: 0.4,
	HEALTH_45: 0.45,
	HEALTH_50: 0.5,
	HEALTH_55: 0.55,
	HEALTH_60: 0.6,
	HEALTH_65: 0.65,
	HEALTH_70: 0.7,
	HEALTH_75: 0.75,
	HEALTH_80: 0.8,
	HEALTH_85: 0.85,
	HEALTH_90: 0.9,
	HEALTH_95: 0.95,
	HEALTH_MAX: 1
};

//Targetted Relative Minimum Health
//Empty is 0, Next Gate is next gate health to break
sc.HEALTH_RELATIVE_MIN_OPTIONS = {
	EMPTY: 0,
	NEXTGATE: 1
};

//Targetted Relative Maximum Health
//Empty is 0, Last gate is most recently broken gate
sc.HEALTH_RELATIVE_MAX_OPTIONS = {
	FULL: 0,
	LASTGATE: 1
};

sc.OPTIONS_DEFINITION["keys-health-player"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY._9,
		key2: undefined
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["health-player-value"] = {
	type: "OBJECT_SLIDER",
	data: sc.HEALTH_PERCENTAGE_VALUES,
	init: sc.HEALTH_PERCENTAGE_VALUES.HEALTH_MAX,
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	showPercentage: true,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["keys-health-enemy"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY._0,
		key2: undefined
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["health-enemy-relative-min-value"] = {
	type: "BUTTON_GROUP",
	data: sc.HEALTH_RELATIVE_MIN_OPTIONS,
	init: sc.HEALTH_RELATIVE_MIN_OPTIONS.EMPTY,
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["health-enemy-relative-max-value"] = {
	type: "BUTTON_GROUP",
	data: sc.HEALTH_RELATIVE_MAX_OPTIONS,
	init: sc.HEALTH_RELATIVE_MAX_OPTIONS.FULL,
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["health-enemy-value"] = {
	type: "OBJECT_SLIDER",
	data: sc.HEALTH_PERCENTAGE_VALUES,
	init: sc.HEALTH_PERCENTAGE_VALUES.HEALTH_MAX,
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	showPercentage: true,
	header: "cc-speedrun-utilities",
};

/**
 * @inject
 * Inject hotkeys.
 */
sc.Control.inject({
	healthPlayerPress: function () {
		return ig.input.pressed("health-player");
	},

	healthEnemyPress: function() {
		return ig.input.pressed("health-enemy");
	}
});

function getEnemyCandidate() {

	let enemyCandidate = null;

	let enemies = ig.game.getEntitiesByType(ig.ENTITY.Enemy);

	for(let i = 0; i < enemies.length; i++) {
		if(enemies[i].params.currentHp > 0 && enemies[i].enemyType.boss) {
			enemyCandidate = enemies[i];
			break;
		}
	}

	return enemyCandidate;
}

function setCombatantHp(combatant, healthPercentage) {

	let newHp = 0;

	if(combatant == sc.model.player) {
		newHp = Math.round(combatant.params.getStat("hp") * healthPercentage);
	}
	else {
		let relativeMinHp = 0, relativeMaxHp = combatant.params.getStat("hp");
		let hpBreakReached = combatant.hpBreakReached;

		if(sc.options.get("health-enemy-relative-min-value") > 0 && hpBreakReached < combatant.enemyType.hpBreaks.length) {
			relativeMinHp = combatant.params.getStat("hp") * combatant.enemyType.hpBreaks[hpBreakReached].hp;
		}

		if(sc.options.get("health-enemy-relative-max-value") > 0 && hpBreakReached > 0) {
			relativeMaxHp = combatant.params.getStat("hp") * combatant.enemyType.hpBreaks[hpBreakReached - 1].hp;
		}

		newHp = Math.round(relativeMinHp + (relativeMaxHp - relativeMinHp) * healthPercentage);

	}

	combatant.params.currentHp = newHp;
	sc.Model.notifyObserver(combatant.params, sc.COMBAT_PARAM_MSG.HP_CHANGED)
}

/**
 * @inject
 * Handle execution of hotkeys.
 */
 ig.ENTITY.Player.inject({
	gatherInput(...args) {

		if (sc.options) {
			if (sc.control.healthPlayerPress()) {
				setCombatantHp(sc.model.player, sc.options.get("health-player-value"));
			}
			
			if (sc.control.healthEnemyPress()) {

				let enemyCandidate = getEnemyCandidate();

				if(enemyCandidate) {
					setCombatantHp(enemyCandidate, sc.options.get("health-enemy-value"));
				}
			}
		}

		return this.parent(...args);
	}
});