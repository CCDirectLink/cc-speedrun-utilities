/**
 * CrossCode Speedrun Utilities - freeSP.js
 *
 * Hotkey for giving SP, gives points past the regular cap.
 */

sc.FREE_SP_VALUES = {
	SP_1: 1,
	SP_2: 2,
	SP_3: 3,
	SP_4: 4,
	SP_5: 5,
	SP_6: 6,
	SP_7: 7,
	SP_8: 8,
	SP_9: 9,
	SP_10: 10,
	SP_11: 11,
	SP_12: 12,
	SP_13: 13,
	SP_14: 14,
	SP_15: 15,
	SP_16: 16,
	SP_17: 16,
	SP_18: 18,
	SP_19: 19,
	SP_20: 20,
};

sc.OPTIONS_DEFINITION["keys-free-sp"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.U,
		key2: undefined,
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: true,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["free-sp-value"] = {
	type: "OBJECT_SLIDER",
	data: sc.FREE_SP_VALUES,
	init: sc.FREE_SP_VALUES.SP_12,
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	showPercentage: false,
	header: "cc-speedrun-utilities",
};

/**
 * @inject
 * Detect when keybinds are pressed
 */
sc.Control.inject({
	freeSPPress: function () {
		return ig.input.pressed("free-sp");
	},
});

export function giveFreeSp() {
	ig.game.playerEntity.params.currentSp += sc.options.get("free-sp-value");
}
/**
 * @inject
 * Handle execution of keybinds
 */
ig.ENTITY.Player.inject({
	gatherInput(...args) {
		if (sc.options && sc.control.freeSPPress()) {
			giveFreeSp();
		}

		return this.parent(...args);
	},
});
