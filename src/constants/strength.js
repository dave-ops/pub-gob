'use strict';

const average_monster_strength = [
    { creature: 'allip', strength: 1 },
    { creature: 'shadow', strength: 1 },
    { creature: "will-o'-wisp", strength: 1 },
    { creature: 'lantern archon', strength: 1 },
    { creature: 'bat', strength: 1 },
    { creature: 'toad', strength: 1 },
    { creature: 'Rat swarm', strength: 2 },
    { creature: 'stirge', strength: 3 },
    { creature: 'monkey', strength: 3 },
    { creature: 'tiny monstrous spider', strength: 3 },
    { creature: 'grig', strength: 4 },
    { creature: 'small monstrous centipede', strength: 4 },
    { creature: 'hawk', strength: 6 },
    { creature: 'cockatrice', strength: 6 },
    { creature: 'pixie', strength: 6 },
    { creature: 'quasit', strength: 8 },
    { creature: 'badger', strength: 8 },
    { creature: 'human', strength: 10 },
    { creature: 'beholder', strength: 10 },
    { creature: 'dire rat', strength: 10 },
    { creature: 'mind flayer', strength: 12 },
    { creature: 'dog', strength: 12 },
    { creature: 'pony', strength: 12 },
    { creature: 'ghoul', strength: 12 },
    { creature: 'gnoll', strength: 14 },
    { creature: 'dire badger', strength: 14 },
    { creature: 'baboon', strength: 14 },
    { creature: 'manta ray', strength: 14 },
    { creature: 'black pudding', strength: 16 },
    { creature: 'choker', strength: 16 },
    { creature: 'large shark', strength: 16 },
    { creature: 'centaur', strength: 18 },
    { creature: 'displacer beast', strength: 18 },
    { creature: 'minotaur', strength: 18 },
    { creature: 'ape', strength: 20 },
    { creature: 'ogre', strength: 20 },
    { creature: 'flesh golem', strength: 20 },
    { creature: 'gorgon', strength: 20 },
    { creature: 'fire giant', strength: 30 },
    { creature: 'triceratops', strength: 30 },
    { creature: 'elephant', strength: 30 },
    { creature: 'Great wyrm gold dragon', strength: 46 },
];

const strength_modifier = [
    { str: 1, modifier: -5 },
    { str: 2, modifier: -4 },
    { str: 3, modifier: -4 },
    { str: 4, modifier: -3 },
    { str: 5, modifier: -3 },
    { str: 6, modifier: -2 },
    { str: 7, modifier: -2 },
    { str: 8, modifier: -1 },
    { str: 9, modifier: -1 },
    { str: 10, modifier: 0 },
    { str: 11, modifier: 0 },
    { str: 12, modifier: 1 },
    { str: 13, modifier: 1 },
    { str: 14, modifier: 2 },
    { str: 15, modifier: 2 },
    { str: 16, modifier: 3 },
    { str: 17, modifier: 3 },
    { str: 18, modifier: 4 },
    { str: 19, modifier: 4 },
    { str: 20, modifier: 5 },
    { str: 21, modifier: 5 },
    { str: 22, modifier: 6 },
    { str: 23, modifier: 6 },
    { str: 24, modifier: 7 },
    { str: 25, modifier: 7 },
    { str: 26, modifier: 8 },
    { str: 27, modifier: 8 },
    { str: 28, modifier: 9 },
    { str: 29, modifier: 9 },
    { str: 30, modifier: 10 },
    { str: 31, modifier: 10 },
    { str: 32, modifier: 11 },
    { str: 33, modifier: 11 },
    { str: 34, modifier: 12 },
    { str: 35, modifier: 12 },
    { str: 36, modifier: 13 },
    { str: 37, modifier: 13 },
    { str: 38, modifier: 14 },
    { str: 39, modifier: 14 },
    { str: 40, modifier: 15 },
    { str: 41, modifier: 15 },
    { str: 42, modifier: 16 },
    { str: 43, modifier: 16 },
    { str: 44, modifier: 17 },
    { str: 45, modifier: 17 },
    { str: 46, modifier: 18 },
    { str: 47, modifier: 18 },
];

module.exports = { average_monster_strength, strength_modifier };
