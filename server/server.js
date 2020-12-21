const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;
const routeUsers = require("./routes/routeUsers");
const routeRestaurant = require("./routes/routeRestaurant");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(routeUsers)
app.use("/restaurants", routeRestaurant)
app.set('view engine', 'pug')

app.listen(PORT, () => console.log(`Server started @ localhost:${PORT}`));