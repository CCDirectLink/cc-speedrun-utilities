/**
 * CrossCode Speedrun Utilities - mobilityCheats.js
 *
 * Hotkeys for moving around including jetpack powers.
 */

sc.OPTIONS_DEFINITION["keys-jetpack"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.CTRL,
		key2: undefined,
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

/**
 * @inject
 * Inject hotkeys.
 */
sc.Control.inject({
	jetpackHold: function () {
		return ig.input.state("jetpack");
	},
});

/**
 * @inject
 * Handle execution of hotkeys.
 */
ig.ENTITY.Player.inject({
	gatherInput(...args) {
		if (sc.control.jetpackHold()) {
			simplify.jumpHigh();
		}

		return this.parent(...args);
	},
});

