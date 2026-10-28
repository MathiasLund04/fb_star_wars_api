const express = require('express');
const routes = require('./routes/characterRoutes');
const app = express();
const {
    requestLogger,
    notFoundHandler,
    errorHandler
} = require('./middleware/middleware');

app.use(express.json());

//Logger alle requests
app.use(requestLogger);

app.use('/', routes);

// håndtere ukendte endpoints
app.use(notFoundHandler);
//Håndtere fejl fra routes og middleware
app.use(errorHandler);


module.exports = app;