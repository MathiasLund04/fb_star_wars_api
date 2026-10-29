const path = require("node:path");
const filePath = path.join(
    __dirname,
    "../../files/rebel-alliance.txt"
);

const characterService = require("../service/characterService");

// Returnerer alle karakterer:
const getAllCharacters = async (req, res) => {
    try {
        const characters = await characterService.getAllCharacters();
        res.json(
            characters
        );
    }catch(err) {
        res.status(500).send({
            error: err,
        })
    }
};

// Returnerer en karakter ud fra et id:
const getCharacterById = async (req, res) => {
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
            res.status(500).send({
                error: err,
            })
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

       // Validerer brugerens input data:
       if (
           typeof name !== "string" ||
           typeof role !== "string" ||
           typeof homeworld !== "string" ||
           name.trim().length < 3 ||
           role.trim().length < 3 ||
           homeworld.trim().length < 3
       ) {

           // Returnere en fejl hvis input ikke opfylder kravene:
           return res.status(400).json({
               error: "Navn, rang og hjemmeverden skal indeholde mindst 3 tegn"
           });
       }

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

    // Validerer brugerens input data:
    if (
        typeof name !== "string" ||
        typeof role !== "string" ||
        typeof homeworld !== "string" ||
        name.trim().length < 3 ||
        role.trim().length < 3 ||
        homeworld.trim().length < 3
    ) {

        // Returnere en fejl hvis input ikke opfylder kravene:
        return res.status(400).json({
            error: "Navn, rolle og hjemmeverden skal indeholde mindst 3 tegn"
        });
    }

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
const deleteCharacter = async (req, res) => {
    try {
        // Henter id'et fra URL'en:
        const id = req.params.id;

        // Forsøger at slette karakteren via servicen:
            await characterService.deleteCharacter(id);

        // Returnerer status 204 hvis karakteren blev slettet:
        res.status(204).send();
    }catch(err) {
        if (err.code === "CHARACTER_NOT_FOUND") {
            return res.status(404).json({ error: "Karakter ikke fundet" });
        }
        res.status(500).send({ error: err.message });
    }
};

//downloader txt filen
const downloadFile = (req, res) => {
    res.download(filePath, "rebel-alliance.txt", (error) => {
        //Hvis der sker fejl undervejs vises dette i konsollen
        if (error) {
            console.log(error);

            //For at vise fejl til bruger hvis der ikke sker noget
            if (!res.headersSent) {
                res.status(500).send("Kunne ikke hente filen");
            }
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