/**
 * CrossCode Speedrun Utilities - freeSP.js
 * 
 * Hotkey for giving SP, gives points past the regular cap.
 */

sc.OPTIONS_DEFINITION["keys-free-sp"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.U,
		key2: undefined
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: true,
	header: "cc-speedrun-utilities",
};

let giveSPAmount = 12;

/**
 * @inject
 * Detect when Save and Load Position/Map binds are pressed
 */
sc.Control.inject({
	freeSPPress: function () {
		return ig.input.pressed("free-sp");
	}
});

/**
 * @inject
 * Handle execution of Save and Load Position/Map keybinds
 */
ig.ENTITY.Player.inject({
	gatherInput(...args) {
		if (sc.control.freeSPPress()) {
			this.params.currentSp += giveSPAmount;
		}

		return this.parent(...args);
	}
});