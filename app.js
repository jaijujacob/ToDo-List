const express = require('express');
const bodyParser = require('body-parser');
const date = require("./date.js");
console.log(date);


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

var today = new Date();
var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};
var listItems = ["one", "twfgfdo", "Threes"]
var workItems = ["Wake up early morning", "Learn JavaScript", "Take Rest"]


app.get("/", function (req, res) {
    res.render('list', { listTitle: date.getDay(), dispList: listItems })
})


app.post("/", function (req, res) {
    // console.log(req.body);
    if (req.body.list === "Work List") {
        workItems.push(req.body.newItem);
        res.redirect("/work");

    } else {
        listItems.push(req.body.newItem);
        res.redirect("/");
    }

});

app.get("/work", function (req, res) {
    res.render('list', { listTitle: "Work List", dispList: workItems })
})
app.post("/work", function (req, res) {
    workItems.push(req.body.newItem);
    res.redirect("/work");

})

app.get("/about", function (req, res) {
    res.render('about');
})


app.listen(process.env.PORT || 3000, function () {
    console.log("App listening on port " + process.env.PORT || 3000);
})