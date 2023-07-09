require('dotenv').config()
let express = require('express');
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

// app.get("/", (req, res) => {
//     res.send("Hello Express");
// });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});


app.get("/json",  (req, res) => {
    let jsonMessage = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        jsonMessage = jsonMessage.toUpperCase();
    }
    res.json({
        "message": jsonMessage
    });
});

app.get(
    "/now",  
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.json({
            "time": req.time
        })
    }
);


































 module.exports = app;
