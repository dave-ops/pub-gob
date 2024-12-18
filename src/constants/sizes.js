'use strict';
// Tiny: 1d4
// Small: 1d6
// Medium: 1d8 (This is where you might see d8s being considered somewhat standard for player characters of many classes)
// Large: 2d10 (or sometimes 1d12 for certain creatures)
// Huge: 3d12
// Gargantuan: 4d20
// TODO: VERIFY THIS IN THE DUNGEON MASTERS GUIDE

const sizes = [
    {
        id: 1,
        name: 'fine',
        dice: [
            {
                rolls: 1,
                sides: 4,
            },
        ],
        modifier: 8,
        value: 1,
    },
    {
        id: 2,
        name: 'diminutive',
        dice: [
            {
                rolls: 1,
                sides: 4,
            },
        ],
        modifier: 4,
        value: 1,
    },
    {
        id: 3,
        name: 'tiny',
        dice: [
            {
                rolls: 1,
                sides: 6,
            },
        ],
        modifier: 2,
        value: 3,
    },
    {
        id: 4,
        name: 'small',
        dice: [
            {
                rolls: 1,
                sides: 8,
            },
        ],
        modifier: 1,
        value: 4,
    },
    {
        id: 5,
        name: 'medium',
        dice: [
            {
                rolls: 1,
                sides: 8,
            },
        ],
        modifier: 0,
        value: 5,
    },
    {
        id: 6,
        name: 'large',
        dice: [
            {
                rolls: 2,
                sides: 10,
            },
            {
                rolls: 1,
                sides: 12,
            },
        ],
        modifier: -1,
        value: 6,
    },
    {
        id: 7,
        name: 'huge',
        dice: [
            {
                rolls: 3,
                sides: 12,
            },
        ],
        modifier: -2,
        value: 7,
    },
    {
        id: 8,
        name: 'gargantuan',
        dice: [
            {
                rolls: 4,
                sides: 20,
            },
        ],
        modifier: -4,
        value: 8,
    },
    {
        id: 9,
        name: 'colossal',
        dice: [
            {
                rolls: 5,
                sides: 20,
            },
        ],
        modifier: -8,
        value: 9,
    },
];

module.exports = {sizes};
