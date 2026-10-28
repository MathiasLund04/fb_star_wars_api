const express = require('express');
const router = express.Router();

const characterController = require(
    "../controllers/characterController"
);

// Ruten til at se array'et over alle karakterer:
router.get(
    "/characters",
    characterController.getAllCharacters
);

// Ruten til at se en specifik karakter ud fra dens id:
router.get(
    "/characters/:id",
    characterController.getCharacterById
);

// Ruten når en ny karakter er oprettet:
router.post(
    "/characters",
    characterController.createCharacter
);

// Ruten når en karakter bliver ændret:
router.put(
    "/characters/:id",
    characterController.updateCharacter
);

// Ruten når en karakter bliver slettet:
router.delete(
    "/characters/:id",
    characterController.deleteCharacter
);

//Route til at downloade rebel-alliance.txt
router.get(
    "/download",
    characterController.downloadFile
);

//Redirecting route
router.get(
    "/go-to-luke",
    characterController.goToLuke
);




module.exports = router;