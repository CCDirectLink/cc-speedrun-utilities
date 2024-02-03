/**
 * CrossCode Speedrun Utilities - gameSpeed.js
 *
 * Hotkey for toggling game speed to a different value.
 */

sc.GAME_SPEED_PERCENTAGE_VALUES = {
	SPEED_10: 0.1,
	SPEED_20: 0.2,
	SPEED_30: 0.3,
	SPEED_40: 0.4,
	SPEED_50: 0.5,
	SPEED_60: 0.6,
	SPEED_70: 0.7,
	SPEED_80: 0.8,
	SPEED_90: 0.9,
	SPEED_100: 1.0,
	SPEED_150: 1.5,
	SPEED_200: 2.0,
	SPEED_250: 2.5,
	SPEED_300: 3.0,
	SPEED_400: 4.0,
	SPEED_500: 5.0,
	SPEED_600: 6.0,
	SPEED_700: 7.0,
	SPEED_800: 8.0,
	SPEED_900: 9.0,
	SPEED_1000: 10.0,
};

sc.OPTIONS_DEFINITION['keys-toggle-game-speed'] = {
	type: 'CONTROLS',
	init: {
		key1: ig.KEY.PERIOD,
		key2: undefined,
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: 'cc-speedrun-utilities',
};

sc.OPTIONS_DEFINITION['game-speed-value'] = {
	type: 'OBJECT_SLIDER',
	data: sc.GAME_SPEED_PERCENTAGE_VALUES,
	init: sc.GAME_SPEED_PERCENTAGE_VALUES.SPEED_100,
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	showPercentage: true,
	header: 'cc-speedrun-utilities',
};

let isToggledSpeed = false;
export function toggleGameSpeed() {
	isToggledSpeed = !isToggledSpeed;

	ig.Timer.timeScale = isToggledSpeed ? sc.options.get('game-speed-value') : 1;
}

/**
 * @inject
 * Detect when Save and Load Position/Map binds are pressed
 */
sc.Control.inject({
	toggleGameSpeedPress: function () {
		return ig.input.pressed('toggle-game-speed');
	},
});

/**
 * @inject
 * Handle execution of Save and Load Position/Map keybinds
 */
ig.ENTITY.Player.inject({
	gatherInput(...args) {
		if (sc.control.toggleGameSpeedPress() && sc.options) {
			toggleGameSpeed();
		}

		return this.parent(...args);
	},
});
