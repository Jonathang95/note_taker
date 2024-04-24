const express = require('express');
const app = express();
const PORT =3001;
const routes = require('./routes');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});