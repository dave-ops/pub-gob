'use strict'

const average_dexterity = [
    { "creature": ["shrieker", "fungus"], "dex": 1, "modifier": -5 },
    { "creature": null, "dex": 2, "modifier": -4 },
    { "creature": null, "dex": 3, "modifier": -4 },
    { "creature": "gelatinous cube", "dex": 4, "modifier": -3 },
    { "creature": "Colossal animated object", "dex": 5, "modifier": -3 },
    { "creature": "Purple worm, ogre zombie", "dex": 6, "modifier": -2 },
    { "creature": "Ogre, basilisk, fire giant, tendriculos", "dex": 8, "modifier": -1 },
    { "creature": "Human, triton, boar, giant fire beetle", "dex": 10, "modifier": 0 },
    { "creature": "Bugbear, lammasu, hobgoblin", "dex": 12, "modifier": 1 },
    { "creature": "Displacer beast, hieracosphinx", "dex": 14, "modifier": 2 },
    { "creature": "Blink dog, wraith, lion, octopus", "dex": 16, "modifier": 3 },
    { "creature": "Astral deva (angel), ethereal filcher", "dex": 18, "modifier": 4 },
    { "creature": "Arrowhawk, bone devil", "dex": 20, "modifier": 5 },
    { "creature": "Elder air elemental", "dex": 32, "modifier": 11 }
];

const dexterity_modifier = [
    { "dex": 1, "modifier": -5 },
    { "dex": 2, "modifier": -4 },
    { "dex": 3, "modifier": -4 },
    { "dex": 4, "modifier": -3 },
    { "dex": 5, "modifier": -3 },
    { "dex": 6, "modifier": -2 },
    { "dex": 7, "modifier": -2 },
    { "dex": 8, "modifier": -1 },
    { "dex": 9, "modifier": -1 },
    { "dex": 10, "modifier": 0 },
    { "dex": 11, "modifier": 0 },
    { "dex": 12, "modifier": 1 },
    { "dex": 13, "modifier": 1 },
    { "dex": 14, "modifier": 2 },
    { "dex": 15, "modifier": 2 },
    { "dex": 16, "modifier": 3 },
    { "dex": 17, "modifier": 3 },
    { "dex": 18, "modifier": 4 },
    { "dex": 19, "modifier": 4 },
    { "dex": 20, "modifier": 5 },
    { "dex": 21, "modifier": 5 },
    { "dex": 22, "modifier": 6 },
    { "dex": 23, "modifier": 6 },
    { "dex": 24, "modifier": 7 },
    { "dex": 25, "modifier": 7 },
    { "dex": 26, "modifier": 8 },
    { "dex": 27, "modifier": 8 },
    { "dex": 28, "modifier": 9 },
    { "dex": 29, "modifier": 9 },
    { "dex": 30, "modifier": 10 },
    { "dex": 31, "modifier": 10 },
    { "dex": 32, "modifier": 11 }
];

module.exports = { dexterity_modifier }