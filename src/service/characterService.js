const crypto = require('crypto');
const fs = require('fs-extra');
const path = require('path');
const characterService = require("./characterService");
const characterPath = path.join(__dirname,`../data/characters.json`);

// Henter alle karakterer:
async function getAllCharacters(){
    return await fs.readJson(characterPath);
}

// Henter en karakter baseret på deres id:
async function getCharacterById(id){
    try {
        const characters = await getAllCharacters();
        const foundCharacter = characters.find(c => c.id === id);
        return await foundCharacter;
    }catch(err){
        throw err;
    }
}

// Tilføjer den nyoprettede karakter:
async function createCharacter(character){
    const newCharacter = {
        id: crypto.randomUUID(),
        name: character.name.trim(),
        role: character.role.trim(),
        homeworld: character.homeworld.trim(),
    };
    try{
        const characters = await getAllCharacters();
        characters.push(newCharacter);
        return await fs.writeJson(characterPath, characters, {spaces: 2});
    } catch(err){
       throw err;
    }
}

// Opdaterer en eksisterende karakter:
    async function updateCharacter (id, newCharacter){
       try {
           const characters = await getAllCharacters();
           // Finder karakteren ud fra id:
           let character = characters.find(c => c.id === id);
           // Returnerer null hvis karakteren ikke findes:
           if (!character) {
               return null;
           }
           // Opdaterer karakterens oplysninger:
           character = {
               id: id,
               name: newCharacter.name.trim(),
               role: newCharacter.role.trim(),
               homeworld: newCharacter.homeworld.trim(),
           };
           const updatedCharacters = characters.filter(c => c.id !== id);
           updatedCharacters.push(character);

           await fs.writeJson(characterPath, updatedCharacters, {spaces: 2});

           // Returnerer den opdaterede karakter:
           return character;
       } catch(err){
           throw err;
       }
};

// Sletter en karakter:
async function deleteCharacter (id) {
    try {
        const characters = await getAllCharacters();
        const updatedCharList = characters.filter(c => c.id !== id);

        if (updatedCharList.length === characters.length) {
            new Error(`No characters found.`);
        }

        await fs.writeJson(characterPath, updatedCharList, {spaces: 2});
    }catch(err){
        throw err;
    }
}

// Eksporter funktionerne, så de kan bruges i andre filer:
module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};