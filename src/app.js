const express = require('express');
const routes = require('./routes/characterRoutes');
const path = require('path');
const app = express();
const {
    requestLogger,
    notFoundHandler,
    errorHandler
} = require('./middleware/middleware');


//Logger alle requests
app.use(requestLogger);

app.use(express.json());
app.get('/create', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'create.html'), (error) => {
        if (error) {
            next(error);
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



// håndtere ukendte endpoints
app.use(notFoundHandler);
//Håndtere fejl fra routes og middleware
app.use(errorHandler);

module.exports = app;