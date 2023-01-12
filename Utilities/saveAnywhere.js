/**
 * CrossCode Speedrun Utilities - saveAnywhere.js
 * 
 * Toggle for allowing the Save button to always work regardless of if it would normally be disabled.
 */

sc.OPTIONS_DEFINITION["allow-save-anywhere"] = {
	type: "CHECKBOX",
	init: false,
	cat: sc.OPTION_CATEGORY.GENERAL,
	hasDivider: true,
	header: "cc-speedrun-utilities",
};

/**
 * @inject
 * Inject save anywhere override of updateButtons
 */
sc.PauseScreenGui.inject({
	updateButtons(...args) {
		this.parent(...args);

		if(sc.options && sc.options.get("allow-save-anywhere"))
		{
			this.saveGameButton.setActive(true);
		}
	}
});