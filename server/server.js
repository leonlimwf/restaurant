const express = require('express');
const { url } = require('inspector');
const app = express();
const path = require('path');
const PORT = 8080;
const routeUsers = require("./routes/routeUsers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(routeUsers)

app.get('/user:id', function(req, res) {
    res.json(person.filter(person => person.id === parseInt(req.params.id)))
});



app.listen(PORT, () => console.log(`Server started @ localhost:${PORT}`));