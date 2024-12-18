'use strict';

const carrying_capacity = [
    {
        "stat": { "key": "STR", "value": 1 },
        "load": {
            "light": [0, 3],
            "medium": [4, 6],
            "heavy": [7, 9]
        }
    },
    {
        "stat": { "key": "STR", "value": 2 },
        "load": {
            "light": [0, 5],
            "medium": [6, 10],
            "heavy": [11, 15]
        }
    },
    {
        "stat": { "key": "STR", "value": 3 },
        "load": {
            "light": [0, 10],
            "medium": [11, 20],
            "heavy": [21, 30]
        }
    },
    {
        "stat": { "key": "STR", "value": 4 },
        "load": {
            "light": [0, 15],
            "medium": [16, 30],
            "heavy": [31, 45]
        }
    },
    {
        "stat": { "key": "STR", "value": 5 },
        "load": {
            "light": [0, 20],
            "medium": [21, 40],
            "heavy": [41, 60]
        }
    },
    {
        "stat": { "key": "STR", "value": 6 },
        "load": {
            "light": [0, 25],
            "medium": [26, 50],
            "heavy": [51, 75]
        }
    },
    {
        "stat": { "key": "STR", "value": 7 },
        "load": {
            "light": [0, 30],
            "medium": [31, 60],
            "heavy": [61, 90]
        }
    },
    {
        "stat": { "key": "STR", "value": 8 },
        "load": {
            "light": [0, 35],
            "medium": [36, 70],
            "heavy": [71, 105]
        }
    },
    {
        "stat": { "key": "STR", "value": 9 },
        "load": {
            "light": [0, 40],
            "medium": [41, 80],
            "heavy": [81, 120]
        }
    },
    {
        "stat": { "key": "STR", "value": 10 },
        "load": {
            "light": [0, 45],
            "medium": [46, 90],
            "heavy": [91, 135]
        }
    },
    {
        "stat": { "key": "STR", "value": 11 },
        "load": {
            "light": [0, 50],
            "medium": [51, 100],
            "heavy": [101, 150]
        }
    },
    {
        "stat": { "key": "STR", "value": 12 },
        "load": {
            "light": [0, 55],
            "medium": [56, 110],
            "heavy": [111, 165]
        }
    },
    {
        "stat": { "key": "STR", "value": 13 },
        "load": {
            "light": [0, 60],
            "medium": [61, 120],
            "heavy": [121, 180]
        }
    },
    {
        "stat": { "key": "STR", "value": 14 },
        "load": {
            "light": [0, 70],
            "medium": [71, 140],
            "heavy": [141, 210]
        }
    },
    {
        "stat": { "key": "STR", "value": 15 },
        "load": {
            "light": [0, 80],
            "medium": [81, 160],
            "heavy": [161, 240]
        }
    },
    {
        "stat": { "key": "STR", "value": 16 },
        "load": {
            "light": [0, 90],
            "medium": [91, 180],
            "heavy": [181, 270]
        }
    },
    {
        "stat": { "key": "STR", "value": 17 },
        "load": {
            "light": [0, 100],
            "medium": [101, 200],
            "heavy": [201, 300]
        }
    },
    {
        "stat": { "key": "STR", "value": 18 },
        "load": {
            "light": [0, 115],
            "medium": [116, 230],
            "heavy": [231, 345]
        }
    },
    {
        "stat": { "key": "STR", "value": 19 },
        "load": {
            "light": [0, 130],
            "medium": [131, 260],
            "heavy": [261, 390]
        }
    },
    {
        "stat": { "key": "STR", "value": 20 },
        "load": {
            "light": [0, 145],
            "medium": [146, 290],
            "heavy": [291, 435]
        }
    },
    {
        "stat": { "key": "STR", "value": 21 },
        "load": {
            "light": [0, 160],
            "medium": [161, 320],
            "heavy": [321, 480]
        }
    },
    {
        "stat": { "key": "STR", "value": 22 },
        "load": {
            "light": [0, 180],
            "medium": [181, 360],
            "heavy": [361, 540]
        }
    },
    {
        "stat": { "key": "STR", "value": 23 },
        "load": {
            "light": [0, 200],
            "medium": [201, 400],
            "heavy": [401, 600]
        }
    },
    {
        "stat": { "key": "STR", "value": 24 },
        "load": {
            "light": [0, 235],
            "medium": [236, 470],
            "heavy": [471, 705]
        }
    },
    {
        "stat": { "key": "STR", "value": 25 },
        "load": {
            "light": [0, 280],
            "medium": [281, 560],
            "heavy": [561, 840]
        }
    },
    {
        "stat": { "key": "STR", "value": 26 },
        "load": {
            "light": [0, 325],
            "medium": [326, 650],
            "heavy": [651, 975]
        }
    },
    {
        "stat": { "key": "STR", "value": 27 },
        "load": {
            "light": [0, 370],
            "medium": [371, 740],
            "heavy": [741, 1110]
        }
    },
    {
        "stat": { "key": "STR", "value": 28 },
        "load": {
            "light": [0, 415],
            "medium": [416, 830],
            "heavy": [831, 1245]
        }
    },
    {
        "stat": { "key": "STR", "value": 29 },
        "load": {
            "light": [0, 460],
            "medium": [461, 920],
            "heavy": [921, 1380]
        }
    },
    {
        "stat": { "key": "STR", "value": 30 },
        "load": {
            "light": [0, 505],
            "medium": [506, 1010],
            "heavy": [1011, 1515]
        }
    },
    /*
    {
        "stat": { "key": "STR", "value": 99 },
        "load": {
            "light": ["x4", "x4"],
            "medium": ["x4", "x4"],
            "heavy": ["x4", "x4"]
        }
    }
        */
];

module.exports = { carrying_capacity };