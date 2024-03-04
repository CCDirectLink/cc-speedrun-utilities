/**
 * CrossCode Speedrun Utilities - saveHotkeys.js
 *
 * Hotkeys for loading your latest autosave and making quicksaves
 * for quickly practicing segments repeatedly
 */

sc.OPTIONS_DEFINITION["keys-recentsave-load"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.J,
		key2: undefined,
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["keys-quick-save"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.K,
		key2: undefined,
	},
	cat: sc.OPTION_CATEGORY.CONTROLS,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.OPTIONS_DEFINITION["keys-quick-load"] = {
	type: "CONTROLS",
	init: {
		key1: ig.KEY.L,
		key2: undefined,
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
	recentsaveLoadPress: function () {
		return ig.input.pressed("recentsave-load");
	},

	quickSavePress: function () {
		return ig.input.pressed("quick-save");
	},

	quickLoadPress: function () {
		return ig.input.pressed("quick-load");
	},
});

function resetForReload() {
	//Fix health variation between saves
	sc.model.player.reset();

	//Fix PVP arenas carrying through loads
	if (sc.pvp && sc.pvp.isActive()) {
		sc.pvp.onReset();
	}
}

export function recentSaveLoad() {
	ig.storage.loadSlot(ig.storage.lastUsedSlot);

	resetForReload();
}
export function quickSave() {
	currQuickSave = {};
	ig.storage._saveState(currQuickSave);
	currQuickSave = new ig.SaveSlot(currQuickSave);
}
export function quickLoad() {
	if (currQuickSave) {
		ig.storage.loadSlot(currQuickSave);

		resetForReload();
	}
}

/**
 * @inject
 * Handle execution of hotkeys.
 */
ig.ENTITY.Player.inject({
	gatherInput(...args) {
		if (sc.control.recentsaveLoadPress()) {
			quickLoad();
		}

		if (sc.control.quickSavePress()) {
			quickSave();
		}

		if (sc.control.quickLoadPress()) {
			quickLoad();
		}

		return this.parent(...args);
	},
});
