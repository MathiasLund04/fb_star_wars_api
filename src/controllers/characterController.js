const path = require("node:path");
const filePath = path.join(
    __dirname,
    "../../files/rebel-alliance.txt"
);

const characterService = require("../service/characterService");

// Returnerer alle karakterer:
const getAllCharacters = async (req, res, next) => {
    try {
        const characters = await characterService.getAllCharacters();
        res.json(
            characters
        );
    }catch(err) {
        next(err);
    }
};

// Returnerer en karakter ud fra et id:
const getCharacterById = async (req, res, next) => {
        const id = req.params.id;
        try {
            // Henter en karakter fra servicen:
            const character = await
                characterService.getCharacterById(id);

            // Returnere en fejlkode(404) hvis karakteren ikke kan findes:
            if (!character) {
                return res.status(404).json({
                    error: "Karakter ikke fundet"
                });
            }

            // Returnere den fundne karakter:
            res.json(character);

        }catch(err) {
            next(err);
        }
};

// Opretter en ny karakter:
const createCharacter = (req, res,next) => {
   try {
       const character = {
           name,
           role,
           homeworld
       } = req.body || {};

       // Opretter den nye karakter:
       const newCharacter =
           characterService.createCharacter(character)
               .then(newCharacter => res.status(201).json(newCharacter))
               .catch(next);
   }catch(err) {
       next(err)
   }
   };

// Ændring af karakter:
const updateCharacter = async (req, res, next) => {
try {
    // Henter id'et fra URL'en:
    const id = req.params.id;

    // Henter de nye værdier fra request body:
    const newCharacter = {
        name,
        role,
        homeworld
    } = req.body || {};

    // Opdaterer karakteren via servicen
    const character =
        await characterService.updateCharacter(
            id,
            newCharacter
        );

    // Returnere en fejlkode(404) hvis karakteren ikke kan findes:
    if (!character) {
        return res.status(404).json({
            error: "Karakter ikke fundet"
        });
    }

    // Returnerer den opdaterede karakter:
    res.json(character);
}catch(err) {
    next(err);
}

};


// Sletter en karakter:
const deleteCharacter = async (req, res, next) => {
    try {
        // Henter id'et fra URL'en:
        const id = req.params.id;

        // Forsøger at slette karakteren via servicen:
            await characterService.deleteCharacter(id);

        // Returnerer status 204 hvis karakteren blev slettet:
        res.status(204).send();
    }catch(err) {
        if (err.code === "CHARACTER_NOT_FOUND") {
            err.status = 404;
            err.message = "karakter ikke fundet"
        }
        next(err)
    }
};

//downloader txt filen
const downloadFile = (req, res, next) => {
    res.download(filePath, "rebel-alliance.txt", (err) => {
        //Hvis der sker fejl undervejs vises dette i konsollen
        if (err) {
            next(err);
        }
    });
}

//redirecter til characters/1 (eller Lukes id i dette tilfælde)
const goToLuke = (req, res) => {
    res.redirect("/characters/8ab3847c-9aa0-46d4-a9b2-4bde5a137455");
}


// Eksporter funktionerne, så de kan bruges i andre filer:
module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    downloadFile,
    goToLuke
};