const express = require("express");
const app = express();
const hb = require("express-handlebars");
app.engine("handlebars", hb()); //handlebars is construction languae
app.set("view engine", "handlebars"); //handlebar is templating language
app.use(express.static("./projects"));
app.use(express.static("./public"));
const examples = require("./data.json");

app.get("/", (req, res) => {
    res.render("home", {
        //will look for a directory called views
        layout: "main",
        examples
        // helpers: {
        //     exclaim(text) {
        //         return (text += "!!!!!!");
        //     }
        // }
    });
});

app.get("/descriptions/:name", (req, res) => {
    const currentProject = examples.find(item => item.name === req.params.name);
    console.log(currentProject);

    res.render("descriptions", {
        layout: "main",
        examples,
        currentProject
    });
});

app.get("/houseofkilling", (req, res) => {
    res.render("houseofkilling", {
        layout: "main",
        examples
    });
});

app.listen(8080, () => console.log("awake"));
