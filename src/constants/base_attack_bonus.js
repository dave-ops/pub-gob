'use strict';

const base_attack_bonus = {
    class_types: [
        { name: 'barbarian', type: 'good' },
        { name: 'fighter', type: 'good' },
        { name: 'paladin', type: 'good' },
        { name: 'ranger', type: 'good' },
        { name: 'cleric', type: 'average' },
        { name: 'druid', type: 'average' },
        { name: 'monk', type: 'average' },
        { name: 'rogue', type: 'average' },
        { name: 'sorcerer', type: 'poor' },
        { name: 'mage', type: 'poor' },
        { name: 'wizard', type: 'poor' },
    ],
    class_types_by_level: [
        {
            level: 1,
            good: 1,
            average: 0,
            poor: 0,
        },
        {
            level: 2,
            good: 2,
            average: 1,
            poor: 1,
        },
        {
            level: 3,
            good: 3,
            average: 2,
            poor: 1,
        },
        {
            level: 4,
            good: 4,
            average: 3,
            poor: 2,
        },
        {
            level: 5,
            good: 5,
            average: 3,
            poor: 2,
        },
        {
            level: 6,
            good: [6, 1],
            average: 4,
            poor: 3,
        },
        {
            level: 7,
            good: [7, 2],
            average: 5,
            poor: 3,
        },
        {
            level: 8,
            good: [8, 3],
            average: 6,
            poor: 1,
        },
        {
            level: 9,
            good: [9, 4],
            average: [6, 1],
            poor: 4,
        },
        {
            level: 10,
            good: [10, 5],
            average: [7, 2],
            poor: 5,
        },
        {
            level: 11,
            good: [11, 6, 1],
            average: [8, 3],
            poor: 5,
        },
        {
            level: 12,
            good: [12, 7, 2],
            average: [9, 4],
            poor: [6, 1],
        },
        {
            level: 13,
            good: [13, 8, 3],
            average: [9, 4],
            poor: [6, 1],
        },
        {
            level: 14,
            good: [14, 9, 4],
            average: [10, 5],
            poor: [7, 2],
        },
        {
            level: 15,
            good: [15, 10, 5],
            average: [11, 6, 1],
            poor: [7, 2],
        },
        {
            level: 16,
            good: [16, 11, 6, 1],
            average: [12, 7, 2],
            poor: [8, 3],
        },
        {
            level: 17,
            good: [17, 12, 7, 2],
            average: [12, 7, 2],
            poor: [8, 3],
        },
        {
            level: 18,
            good: [18, 13, 8, 3],
            average: [13, 8, 3],
            poor: [9, 4],
        },
        {
            level: 19,
            good: [19, 14, 9, 4],
            average: [14, 9, 4],
            poor: [9, 4],
        },
        {
            level: 20,
            good: [20, 15, 10, 5],
            average: [15, 10, 5],
            poor: [10, 5],
        },
    ],
};

const base_save_attack_bonus = [
    {
        level: 1,
        base_save_bonus: {
            good: 2,
            poor: 0,
        },
        base_attack_bonus: {
            good: 1,
            average: 0,
            poor: 0,
        },
    },
    {
        level: 2,
        base_save_bonus: {
            good: 3,
            poor: 0,
        },
        base_attack_bonus: {
            good: 2,
            average: 1,
            poor: 1,
        },
    },
    {
        level: 3,
        base_save_bonus: {
            good: 3,
            poor: 1,
        },
        base_attack_bonus: {
            good: 3,
            average: 2,
            poor: 1,
        },
    },
    {
        level: 4,
        base_save_bonus: {
            good: 4,
            poor: 1,
        },
        base_attack_bonus: {
            good: 4,
            average: 3,
            poor: 2,
        },
    },
    {
        level: 5,
        base_save_bonus: {
            good: 4,
            poor: 1,
        },
        base_attack_bonus: {
            good: 5,
            average: 3,
            poor: 2,
        },
    },
    {
        level: 6,
        base_save_bonus: {
            good: 5,
            poor: 2,
        },
        base_attack_bonus: {
            good: [6, 1],
            average: 4,
            poor: 3,
        },
    },
    {
        level: 7,
        base_save_bonus: {
            good: 5,
            poor: 2,
        },
        base_attack_bonus: {
            good: [7, 2],
            average: 5,
            poor: 3,
        },
    },
    {
        level: 8,
        base_save_bonus: {
            good: 6,
            poor: 2,
        },
        base_attack_bonus: {
            good: [8, 3],
            average: 6,
            poor: 1,
        },
    },
    {
        level: 9,
        base_save_bonus: {
            good: 6,
            poor: 3,
        },
        base_attack_bonus: {
            good: [9, 4],
            average: [6, 1],
            poor: 4,
        },
    },
    {
        level: 10,
        base_save_bonus: {
            good: 7,
            poor: 3,
        },
        base_attack_bonus: {
            good: [10, 5],
            average: [7, 2],
            poor: 5,
        },
    },
    {
        level: 11,
        base_save_bonus: {
            good: 7,
            poor: 3,
        },
        base_attack_bonus: {
            good: [11, 6, 1],
            average: [8, 3],
            poor: 5,
        },
    },
    {
        level: 12,
        base_save_bonus: {
            good: 8,
            poor: 4,
        },
        base_attack_bonus: {
            good: [12, 7, 2],
            average: [9, 4],
            poor: [6, 1],
        },
    },
    {
        level: 13,
        base_save_bonus: {
            good: 8,
            poor: 4,
        },
        base_attack_bonus: {
            good: [13, 8, 3],
            average: [9, 4],
            poor: [6, 1],
        },
    },
    {
        level: 14,
        base_save_bonus: {
            good: 9,
            poor: 4,
        },
        base_attack_bonus: {
            good: [14, 9, 4],
            average: [10, 5],
            poor: [7, 2],
        },
    },
    {
        level: 15,
        base_save_bonus: {
            good: 9,
            poor: 5,
        },
        base_attack_bonus: {
            good: [15, 10, 5],
            average: [11, 6, 1],
            poor: [7, 2],
        },
    },
    {
        level: 16,
        base_save_bonus: {
            good: 10,
            poor: 5,
        },
        base_attack_bonus: {
            good: [16, 11, 6, 1],
            average: [12, 7, 2],
            poor: [8, 3],
        },
    },
    {
        level: 17,
        base_save_bonus: {
            good: 10,
            poor: 5,
        },
        base_attack_bonus: {
            good: [17, 12, 7, 2],
            average: [12, 7, 2],
            poor: [8, 3],
        },
    },
    {
        level: 18,
        base_save_bonus: {
            good: 11,
            poor: 6,
        },
        base_attack_bonus: {
            good: [18, 13, 8, 3],
            average: [13, 8, 3],
            poor: [9, 4],
        },
    },
    {
        level: 19,
        base_save_bonus: {
            good: 11,
            poor: 6,
        },
        base_attack_bonus: {
            good: [19, 14, 9, 4],
            average: [14, 9, 4],
            poor: [9, 4],
        },
    },
    {
        level: 20,
        base_save_bonus: {
            good: 12,
            poor: 6,
        },
        base_attack_bonus: {
            good: [20, 15, 10, 5],
            average: [15, 10, 5],
            poor: [10, 5],
        },
    },
];

module.exports = { base_attack_bonus };
