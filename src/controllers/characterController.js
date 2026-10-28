
const characterService = require("../service/characterService");

// Returnerer alle karakterer:
const getAllCharacters = (req, res) => {
    res.json(
        characterService.getAllCharacters()
    );
};

// Returnerer en karakter ud fra et id:
const getCharacterById = (req, res) => {
        const id = parseInt(req.params.id);

        // Henter en karakter fra servicen:
        const character =
            characterService.getCharacterById(id);

        // Returnere en fejlkode(404) hvis karakteren ikke kan findes:
        if (!character) {
            return res.status(404).json({
                error: "Karakter ikke fundet"
            });
        }

        // Returnere den fundne karakter:
        res.json(character);

};

// Opretter en ny karakter:
const createCharacter = (req, res) => {
    const { name, rank, homeworld } = req.body || {};

    // Validerer brugerens input data:
    if (
        typeof name !== "string" ||
        typeof rank !== "string" ||
        typeof homeworld !== "string" ||
        name.trim().length < 3 ||
        rank.trim().length < 3 ||
        homeworld.trim().length < 3
    ) {

        // Returnere en fejl hvis input ikke opfylder kravene:
        return res.status(400).json({
            error: "Navn, rang og hjemmeverden skal indeholde mindst 3 tegn"
        });
    }

    // Opretter den nye karakter:
    const newCharacter =
        characterService.createCharacter(
            name.trim(),
            rank.trim(),
            homeworld.trim()
        );

    // Returnerer den oprettede karakter med status 201 (Created):
    res.status(201).json(newCharacter);
};

// Ændring af karakter:
const updateCharacter = (req, res) => {

    // Henter id'et fra URL'en:
    const id = parseInt(req.params.id);

    // Henter de nye værdier fra request body:
    const { name, rank, homeworld } = req.body || {};

        // Validerer brugerens input data:
        if (
            typeof name !== "string" ||
            typeof rank !== "string" ||
            typeof homeworld !== "string" ||
            name.trim().length < 3 ||
            rank.trim().length < 3 ||
            homeworld.trim().length < 3
        ) {

            // Returnere en fejl hvis input ikke opfylder kravene:
            return res.status(400).json({
                error: "Navn, rang og hjemmeverden skal indeholde mindst 3 tegn"
            });
        }

    // Opdaterer karakteren via servicen
    const character =
        characterService.updateCharacter(
            id,
            name.trim(),
            rank.trim(),
            homeworld.trim()
        );

    // Returnere en fejlkode(404) hvis karakteren ikke kan findes:
    if (!character) {
        return res.status(404).json({
            error: "Karakter ikke fundet"
        });
    }

    // Returnerer den opdaterede karakter:
    res.json(character);
};


// Sletter en karakter:
const deleteCharacter = (req, res) => {

    // Henter id'et fra URL'en:
    const id = parseInt(req.params.id);

    // Forsøger at slette karakteren via servicen:
    const deleted =
        characterService.deleteCharacter(id);

    // Returnere en fejlkode(404) hvis karakteren ikke kan findes:
    if (!deleted) {
        return res.status(404).json({
            error: "Karakter ikke fundet"
        });
    }

    // Returnerer status 204 hvis karakteren blev slettet:
    res.status(204).send();
};


// Eksporter funktionerne, så de kan bruges i andre filer:
module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter
};