// src/config.js
module.exports = {
	server: {
    	port: 3001,
    	game: {
			name: "node-mud",
			version: "1.0.0",
			website: "",
			description: "MUD Configuration",
			// central time, in milliseconds, of a game minute
			// which is the basis of the main game loop defiend in ticks.js
			mudMinute: 280,
			// Name of world currency -- referenced in game
			coinage: "gold",
			// Area the player starts in -- can be an array.
			// if its an array the selection is randomized.
			startingArea: {
				area: "guild",
				roomid: "6",
			},
			// Persistence drivers for data. World and Player data can use differing drivers.
			persistenceDriverDir: "../databases/",
			persistence: false,
			persistence: {
				data: false, // {driver: 'flat'}
				player: false, // {driver: 'couchdb'}
			},
			// will prevent ticks (time based functions) from running
			preventTicks: false,
			// all characters can use admin commands
			allAdmin: true,
			// show opponent hp in status
			viewHp: true,
			// whitelist areas -- aids in testing -- only these areas will be loaded
			allowedAreas: [],
			hpTo1: false, // sets all mobs starting hp to 1 on boot
    	},
	},
};
