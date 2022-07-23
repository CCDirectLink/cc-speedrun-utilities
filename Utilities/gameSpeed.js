/**
 * CrossCode Speedrun Utilities - gameSpeed.js
 * 
 * Hotkey for toggling game speed to a different value.
 */

 sc.GAME_SPEED_PERCENTAGE_VALUES = {
	SPEED_10: 0.10,
	SPEED_20: 0.20,
	SPEED_30: 0.30,
	SPEED_40: 0.40,
	SPEED_50: 0.50,
	SPEED_60: 0.60,
	SPEED_70: 0.70,
	SPEED_80: 0.80,
	SPEED_90: 0.90,
	SPEED_100: 1.00,
	SPEED_150: 1.50,
	SPEED_200: 2.00,
	SPEED_250: 2.50,
	SPEED_300: 3.00,
	SPEED_400: 4.00,
	SPEED_500: 5.00,
	SPEED_600: 6.00,
	SPEED_700: 7.00,
	SPEED_800: 8.00,
	SPEED_900: 9.00,
	SPEED_1000: 10.00
};

sc.OPTIONS_DEFINITION["keys-toggle-game-speed"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.PERIOD,
		key2: undefined
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["game-speed-value"] = {
	type: "OBJECT_SLIDER",
	data: sc.GAME_SPEED_PERCENTAGE_VALUES,
	init: sc.GAME_SPEED_PERCENTAGE_VALUES.SPEED_100,
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	showPercentage: true,
	header: "cc-speedrun-utilities",
};

let isToggledSpeed = false;

/**
 * @inject
 * Detect when Save and Load Position/Map binds are pressed
 */
sc.Control.inject({
	toggleGameSpeedPress: function () {
		return ig.input.pressed("toggle-game-speed");
	}
});

/**
 * @inject
 * Handle execution of Save and Load Position/Map keybinds
 */
ig.ENTITY.Player.inject({
	gatherInput(...args) {
		if (sc.control.toggleGameSpeedPress() && sc.options) {
			isToggledSpeed = !isToggledSpeed;

			ig.Timer.timeScale = isToggledSpeed ? sc.options.get("game-speed-value") : 1;
		}

		return this.parent(...args);
	}
});