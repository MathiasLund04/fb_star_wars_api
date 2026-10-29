const app = require('./src/app');

app.listen(3000, () => {
    console.log(`Serveren kører på http://localhost:${3000}`);
});