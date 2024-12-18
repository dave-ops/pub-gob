// ./character.js

'use strict';

class Character {
    constructor(world, data = {}) {
        this.world = world; // Reference to the game world

        // Basic character attributes
        this.id = data.id || world.createRefId({ itemType: 'character' });
        this.name = data.name || 'unnamed';
        this.displayName = data.displayName || this.name;
        this.level = data.level || 1;
        this.xp = data.xp || 0;
        this.race = data.race || 'human';
        this.charClass = data.charClass || 'warrior';

        // Stats
        this.str = data.str || 10;
        this.int = data.int || 10;
        this.wis = data.wis || 10;
        this.dex = data.dex || 10;
        this.con = data.con || 10;

        // Health, Mana, and Movement Points
        this.hp = this.getMaxHP();
        this.chp = this.hp; // Current HP
        this.mana = this.getMaxMana();
        this.cmana = this.mana; // Current Mana
        this.mv = this.getMaxMV();
        this.cmv = this.mv; // Current Movement

        // Equipment and inventory
        this.equipment = data.equipment || {};
        this.inventory = data.inventory || [];

        // Location
        this.area = data.area || null;
        this.roomid = data.roomid || null;

        // Affects (like buffs/debuffs)
        this.affects = data.affects || [];

        // Other properties
        this.isPlayer = data.isPlayer || false; // True if this character is controlled by a player
    }

    getMaxHP() {
        // Simplified HP calculation based on level and constitution
        return this.level * (this.con + 10);
    }

    getMaxMana() {
        // Simplified Mana calculation based on level and intelligence
        return this.level * (this.int + 5);
    }

    getMaxMV() {
        // Simplified Movement Points calculation based on level and dexterity
        return this.level * (this.dex + 10);
    }

    // Method to apply modifiers from affects
    applyMods(modifiers) {
        for (let key in modifiers) {
            if (this.hasOwnProperty(key)) {
                this[key] += modifiers[key];
            }
        }
    }

    // Method to remove modifiers from affects
    removeMods(modifiers) {
        for (let key in modifiers) {
            if (this.hasOwnProperty(key)) {
                this[key] -= modifiers[key];
            }
        }
    }

    // Method to check if character can see (example, for night vision or darkness)
    canSee(room) {
        // Simplified logic, would need more conditions in a real game
        return !this.isAffectedBy('blindness') && room.lightLevel > 0;
    }

    // Helper method to check if character is under a specific affect
    isAffectedBy(affectId) {
        return this.affects.some(affect => affect.id === affectId);
    }

    // Add an affect to the character
    addAffect(affect) {
        this.affects.push(affect);
        this.applyMods(affect.modifiers);
    }

    // Remove an affect from the character
    removeAffect(affectId) {
        const index = this.affects.findIndex(affect => affect.id === affectId);
        if (index !== -1) {
            const affect = this.affects.splice(index, 1)[0];
            this.removeMods(affect.modifiers);
            return true;
        }
        return false;
    }

    // Simple damage application
    takeDamage(damage) {
        this.chp -= damage;
        if (this.chp <= 0) {
            // Handle death mechanics here
            this.chp = 0;
            console.log(`${this.displayName} has died!`);
        }
    }

    // Heal character
    heal(amount) {
        this.chp = Math.min(this.chp + amount, this.getMaxHP());
    }

    // Move character to a new location (simplified)
    moveTo(newAreaId, newRoomId) {
        this.area = newAreaId;
        this.roomid = newRoomId;
    }

    // Placeholder for character actions like attack, use item, etc.
    performAction(action, params) {
        // Implement specific actions here
        console.log(`Character ${this.name} performs ${action}`);
    }
}

module.exports = Character;