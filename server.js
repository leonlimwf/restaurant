const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/user:id', function(req, res) {
    res.json(person.filter(person => person.id === parseInt(req.params.id)))
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/public', 'login.html'));
});


app.listen(PORT, () => console.log(`Server started @ localhost:${PORT}`));