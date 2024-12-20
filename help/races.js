'use strict';

const races = {
    'title': 'Races',
    'races': [
        {
            'name': 'human',
            'about': 'The most common race in Midgaard. Very versatile in nearly any role.',
        },
        {
            'name': 'dwarf',
            'about':
                'Hearty and wise mountain dwellers. While typically warriors, and sometimes rangers, they are also known to be Clerics. They are generally highly regarded.',
        },
        {
            'name': 'elf',
            'about':
                'Intelligent and quick elves fit into most roles. Being such quick learners allows them to excel when working with magic. Midgaardians are generally suspicious of elves.',
        },
        {
            'name': 'ogre',
            'about':
                'Big and strong. Sometimes Ogres will become shaman-like clerics but they are mainly seen putting their innate strength to work as fighters. Ogres are not well liked by Midgaardians.',
        },
        {
            'name': 'halfling',
            'about':
                'Small, quick, and quiet. Halflings generally obtain seek out roles like fighters, thieves, and rangers but halfling mages are not uncommon.',
        },
        {
            'name': 'gnome',
            'about':
                'small, inventive, and clever. Gnomes are renowned for their skills in magic, particularly illusion and enchantment. They are often seen as tinkerers and scholars, less common in combat roles but invaluable for their ingenuity.',
        },
        {
            'name': 'half-elf',
            'about':
                'a blend of human and elf, half-elves inherit many of the best qualities from both races. They are adaptable, often charismatic, and can excel in various professions from diplomacy to arcane arts. They are sometimes seen as outsiders in both human and elven societies.',
        },
        {
            'name': 'half-orc',
            'about':
                'with the strength of orcs and the versatility of humans, half-orcs are formidable warriors. They often struggle with their identity but find their place as fighters, barbarians, or even paladins. Their presence can be intimidating to others.',
        },
        {
            'name': 'tiefling',
            'about':
                'descendants of humans with the blood of fiends, tieflings are often misunderstood and feared due to their infernal heritage. They can be spellcasters, rogues, or even warlocks, using their unique abilities to their advantage. Their appearance and powers make them stand out in any crowd.',
        },
    ]
};

races.render = () => `<div>Races:<div><div><ol>${races.races.map((r) => `<li>${r.name}</li>`)}</ol></div>`;

module.exports = races;
