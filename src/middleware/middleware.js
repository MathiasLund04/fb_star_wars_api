


//Logger aller requests med HTTP-Metode og url
const requestLogger = (req,res,next) => {
    console.log(
        `${req.method} ${req.originalUrl}`
    );
    next();
};
//Håndtere ukendte endpoints (Retunere 404)
const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: `Endpoint ikke fundet: ${req.method} ${req.originalUrl}`
    });
};

//Centrale fejlhåndtering for fejl, sender et passende svar tilbage til klienten.
const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err.message);

    const statusCode = err.status || err.statusCode || 500;

    res.status(statusCode).json({
        error: statusCode >= 500
        ? `Der opstod en intern serverfejl`
        : err.message
    });
};


module.exports = {
    requestLogger,
    notFoundHandler,
    errorHandler
};