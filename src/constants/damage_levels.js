'use strict';

const damage_levels = [
    {
        value: ['scratches'],
        min: 1,
        max: 3,
        sizeFlare: false, // means the value will display in uppercase if its within 70& of its max
        flagFlare: false  // means the value will display flare if its within 90& of its max
    },
    {
        value: ['grazes'],
        min: 4,
        max: 7,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['hits'],
        min: 8,
        max: 11,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['injures'],
        min: 12,
        max: 15,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['wounds'],
        min: 16,
        max: 19,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['mauls'],
        min: 20,
        max: 23,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['decimates'],
        min: 24,
        max: 27,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['devastates'],
        min: 28,
        max: 31,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['maims'],
        min: 32,
        max: 35,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['<span class="green">MUTILATES</span>'],
        min: 36,
        max: 39,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['<span class="brown">DISEMBOWELS</span>'],
        min: 40,
        max: 43,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['<span class="orange">EVISCERATES</span>'],
        min: 44,
        max: 47,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['<span class="dark-green">MASSACRES</span>'],
        min: 48,
        max: 52,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['*** <span class="dark-red">DEMOLISHES</span> ***'],
        min: 53,
        max: 99,
        sizeFlare: false,
        flagFlare: false
    },
    {
        value: ['*** <span class="yellow">ANNIHILATES</span> ***'],
        min: 100,
        max: 1000,
        sizeFlare: false,
        flagFlare: false
    },
];

module.exports = { damage_levels };