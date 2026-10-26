// Holder styr på det næste ledige id:
let nextId = 5;

// Startdata med 4 karakterer:
let characters = [
    { id: 1, name: "Luke Skywalker", rank: "Jedi", homeworld: "Tatooine" },
    { id: 2, name: "Leia Organa", rank: "Officer", homeworld: "Alderaan" },
    { id: 3, name: "Han Solo", rank: "Smuggler", homeworld: "Corellia" },
    { id: 4, name: "Chewbacca", rank: "Wookiee", homeworld: "Kashyyyk" }
];

// Henter alle karakterer:
const getAllCharacters = () => {
    return characters;
};

// Henter en karakter baseret på deres id:
const getCharacterById = (id) => {
    return characters.find(c => c.id === id);
};

// Tilføjer den nyoprettede karakter:
const createCharacter = (name, rank, homeworld) => {
    const newCharacter = {
        id: nextId++,
        name,
        rank,
        homeworld
    };

    // Tilføjer karakteren til array'et:
    characters.push(newCharacter);

    // Returner den oprettede karakter:
    return newCharacter;
};

// Opdaterer en eksisterende karakter:
const updateCharacter = (id, name, rank, homeworld) => {

    // Finder karakteren ud fra id:
    const character = characters.find(
        character => character.id === id
    );

    // Returnerer null hvis karakteren ikke findes:
    if (!character) {
        return null;
    }

    // Opdaterer karakterens oplysninger:
    character.name = name;
    character.rank = rank;
    character.homeworld = homeworld;

    // Returnerer den opdaterede karakter:
    return character;
};

// Sletter en karakter:
const deleteCharacter = (id) => {

    // Finder karakterens placering i array'et:
    const index = characters.findIndex(
        character => character.id === id
    );

    // Returnerer false hvis karakteren ikke findes:
    if (index === -1) {
        return false;
    }

    // Fjerner karakteren fra array'et:
    characters.splice(index, 1);

    // Returnerer true hvis karakteren blev slettet:
    return true;
};

// Eksporter funktionerne, så de kan bruges i andre filer:
module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};