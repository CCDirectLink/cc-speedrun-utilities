/**
 * CrossCode Speedrun Utilities - saveHotkeys.js
 * 
 * Hotkeys for loading your latest autosave and making quicksaves
 * for quickly practicing segments repeatedly
 */

 sc.OPTIONS_DEFINITION["keys-autosave-load"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.I,
		key2: undefined
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["keys-quick-save"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.O,
		key2: undefined
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["keys-quick-load"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.P,
		key2: undefined
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

let currQuickSave = null;

/**
 * @inject
 * Inject hotkeys.
 */
sc.Control.inject({
	autosaveLoadPress: function () {
		return ig.input.pressed("autosave-load");
	},

	quickSavePress: function() {
		return ig.input.pressed("quick-save");
	},

	quickLoadPress: function() {
		return ig.input.pressed("quick-load");
	}
});

/**
 * @inject
 * Handle execution of hotkeys.
 */
ig.ENTITY.Player.inject({
	gatherInput(...args) {
		if (ig.game.isControlBlocked()) {
			return this.parent(...args);
		}

		if (!ig.interact.isBlocked()) {
			if (sc.control.autosaveLoadPress()) {
				ig.storage.loadSlot(-1);
			}

			if (sc.control.quickSavePress()) {
				currQuickSave = {};
				ig.storage._saveState(currQuickSave);
				currQuickSave = new ig.SaveSlot(currQuickSave);
			}

			if (sc.control.quickLoadPress()) {
				if(currQuickSave) {
					ig.storage.loadSlot(currQuickSave);
				}
			}
		}

		return this.parent(...args);
	}
});