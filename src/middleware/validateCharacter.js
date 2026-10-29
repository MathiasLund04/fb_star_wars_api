const ROLES = ["Jedi", "Sith", "Rebel", "Smuggler"];

function validateCharacter(body){
    const errors = [];

    if (body === null ||typeof body !== "object" || Array.isArray(body)) {
        return {errors: ["Request body skal være et JSON-objekt"], value: null};
    }

    const { name, role, homeworld} = body;

    if (typeof name !== "string" || name.trim().length <2) {
        errors.push("name skal indholde mindst 2 tegn, og må ikke indholde tal")
    }
    if (!ROLES.includes(role)) {
        errors.push("role skal være Jedi, Sith, Rebel eller Smuggler")
    }
    if (typeof homeworld !== "string" || homeworld.trim().length === 0) {
        errors.push("homeworld må ikke være tomt")
    }
    if (errors.length > 0){
        return { errors, value: null}
    }

    return {
        errors,
        value: { name: name.trim(), role, homeworld:homeworld.trim()}
    };
}

const validateCharacterMiddleware = (req,res,next) =>{
  const {errors, value} = validateCharacter(req.body);
  if (errors.length > 0) {
      return res.status(400).json({ errors: "Validering fejlede", details: errors});
  }
  req.validated = value;
  req.body = value;
  next();
};


module.exports = {
    validateCharacter,
    ROLES,
    validateCharacterMiddleware
};