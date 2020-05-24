const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

/* Setup the database */

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require("./knexfile.js");
const knex = Knex(knexFile.development);

// Give the knex instance to objection.
Model.knex(knex);

const session = require('express-session');

app.use(express.static('public'));

// app.get("/", (req, res) => {
//     return res.sendFile(__dirname + "/public/index.html"); 
// });

//Session

app.use(session({
    secret: `this is a secret and shouldn't be shared in version control etc.`,
    resave: false,
    saveUninitialized: true
}));

// Limit the amount of requests on the auth routes
// const rateLimit = require("express-rate-limit");

// const authLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 4 // limit each IP to 4 requests per windowMs
// });

// app.use("/users/login", authLimiter);
// app.use("/users/register", authLimiter);


/* Set up routes with our server instance */
// const playgroundRoute = require("./routes/playground.js");
const usersRoute = require("./routes/users.js");
const contactRoute = require('./routes/contact');

app.use(contactRoute);
app.use(usersRoute);


/* Start the server */

const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
    if (error) {
        console.log("Error running Express");
    }
    console.log("Server is running on port", server.address().port);    
});
