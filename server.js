const person = require("./person.js")

const express = require('express');
const app = express();
const path = require('path');
const { filter } = require("./person.js");
const PORT = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))


app.get('/hello', function(req, res) {
    res.send(person);
});

app.get('/user:id', function(req, res) {
    res.json(person.filter(person => person.id === parseInt(req.params.id)))
});

app.post('/hello', function(req, res) {
    res.send("You just called the post method at '/hello'!\n");
});


app.listen(PORT, () => console.log(`Server started @ localhost:${PORT}`));