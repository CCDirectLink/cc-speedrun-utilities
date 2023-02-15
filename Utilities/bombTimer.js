import { roundValue } from "../Helpers/utils.js";

sc.OPTIONS_DEFINITION["show-bomb-timer"] = {
	type: "CHECKBOX",
	init: false,
	cat: sc.OPTION_CATEGORY.INTERFACE,
	hasDivider: false,
	header: "cc-speedrun-utilities",
};

sc.BombEntity.inject({
	bombTimingGui: null,

	start(...args) {
		this.parent(...args);

		if(sc.options && sc.options.get("show-bomb-timer")) {
			const timingText = (this.timer) ? `Time: ${roundValue(this.timer)}` : `Unknown`;

			this.bombTimingGui = new sc.SmallEntityBox(this, timingText, this.timer + 3);
			this.bombTimingGui.stopRumble();
			ig.gui.addGuiElement(this.bombTimingGui);
		}
	},

	enterHeatMode(...args) {
		this.parent(...args);

		if(sc.options && sc.options.get("show-bomb-timer")) {
			const timingText = (this.timer) ? `Time: ${roundValue(this.timer)}` : `Unknown`;

			this.bombTimingGui = new sc.SmallEntityBox(this, timingText, this.timer + 3);
			this.bombTimingGui.stopRumble();
			ig.gui.addGuiElement(this.bombTimingGui);
		}
	},

	update() {
		this.parent();

		if(this.bombTimingGui) {
			const timingText = (this.timer) ? `Time: ${roundValue(this.timer)}` : `Unknown`;

			this.bombTimingGui.textGui.setText(timingText);
		}
	}
});