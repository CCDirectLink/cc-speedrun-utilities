import { giveFreeSp } from './freeSP.js';
import { toggleGameSpeed } from './gameSpeed.js';
import { recentSaveLoad, quickSave, quickLoad } from './saveHotkeys.js';
import { setHealthEnemy, setHealthPlayer } from './healthHotkeys.js';

if (nax.ccuilib.QuickRingMenuWidgets) {
	nax.ccuilib.QuickRingMenuWidgets.addWidget({
		name: 'speedrun_freesp',
		title: 'Give SP',
		description: 'Gives the player SP',
		pressEvent: () => {
			giveFreeSp();
			// ig.game.playerEntity.params.currentSp += sc.options.get('free-sp-value')
		},
		image: () => ({
			gfx: new ig.Image('media/gui/menu.png'),
			srcPos: { x: 593, y: 18 },
			pos: { x: 11, y: 10 },
			size: { x: 12, y: 12 },
		}),
	});
	nax.ccuilib.QuickRingMenuWidgets.addWidget({
		name: 'speedrun_togglegamespeed',
		title: 'Toggle game speed',
		description: 'Changes the game speed to the value specified in the settings.',
		pressEvent: () => toggleGameSpeed(),
		image: () => ({
			gfx: new ig.Image('media/gui/speedrunWidgetIcons.png'),
			srcPos: { x: 0, y: 0 },
			pos: { x: 9, y: 8 },
			size: { x: 14, y: 16 },
		}),
	});
	nax.ccuilib.QuickRingMenuWidgets.addWidget({
		name: 'speedrun_recentSaveLoad',
		title: 'Load recent save',
		description: 'Loads the recent save.',
		pressEvent: () => {
			ig.game.setPaused(false);
			recentSaveLoad();
		},
		image: () => ({
			gfx: new ig.Image('media/gui/speedrunWidgetIcons.png'),
			srcPos: { x: 38, y: 0 },
			pos: { x: 11, y: 8 },
			size: { x: 10, y: 16 },
		}),
	});
	nax.ccuilib.QuickRingMenuWidgets.addWidget({
		name: 'speedrun_quickSave',
		title: 'Quick save',
		description: 'Saves the game',
		pressEvent: () => quickSave(),
		image: () => ({
			gfx: new ig.Image('media/gui/speedrunWidgetIcons.png'),
			srcPos: { x: 15, y: 0 },
			pos: { x: 11, y: 8 },
			size: { x: 10, y: 16 },
		}),
	});
	nax.ccuilib.QuickRingMenuWidgets.addWidget({
		name: 'speedrun_quickLoad',
		title: 'Load the quick save',
		description: 'Loads the quick save.',
		pressEvent: () => {
			ig.game.setPaused(false);
			quickLoad();
		},
		image: () => ({
			gfx: new ig.Image('media/gui/speedrunWidgetIcons.png'),
			srcPos: { x: 27, y: 0 },
			pos: { x: 11, y: 8 },
			size: { x: 10, y: 16 },
		}),
	});
	nax.ccuilib.QuickRingMenuWidgets.addWidget({
		name: 'speedrun_playerhp',
		title: "Set the player's hp",
		description: "Set the player's hp.",
		pressEvent: () => setHealthPlayer(),
		image: () => ({
			gfx: new ig.Image('media/gui/menu.png'),
			srcPos: { x: 579, y: 19 },
			pos: { x: 10, y: 11 },
			size: { x: 10, y: 10 },
		}),
	});
	nax.ccuilib.QuickRingMenuWidgets.addWidget({
		name: 'speedrun_enemyhp',
		title: 'Set the enemiy hp',
		description: 'Set the enemy hp.',
		pressEvent: () => setHealthEnemy(),
		image: () => ({
			gfx: new ig.Image('media/gui/menu.png'),
			srcPos: { x: 627, y: 34 },
			pos: { x: 11, y: 11 },
			size: { x: 10, y: 10 },
		}),
	});
}
