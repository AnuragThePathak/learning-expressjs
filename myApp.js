var express = require('express');
var path = require("path")
var bodyParser = require("body-parser")
require("dotenv").config()

var app = express();

app.use("/public", express.static("public"))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

app.get("/now",
    (req, res, next) => {
        req.time = new Date()
        next()
    },
    (req, res) => {
        res.json({ time: req.time })
    })

app.get("/json", (req, res) => {
    let greeting = "Hello json"
    if (process.env.MESSAGE_STYLE == "uppercase") {
        greeting = greeting.toUpperCase()
    }

    res.json({ "message": greeting })  // We can't write .toUpperCase here.
    // If we do so, we will receive empty response. We need make the change
    // outside json object.
})

app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word })
})

app.get("/name", (req, res) => {
    const { first: firstName, last: lastName } = req.query
    res.json({ name: firstName + " " + lastName })
})

app.post("/name", (req, res) => {
    const { first: firstName, last: lastName } = req.body
    res.json({ name: firstName + " " + lastName })
})


































module.exports = app;
