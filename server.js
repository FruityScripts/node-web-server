const port = process.env.PORT || 3000;

const express = require("express");
const fs = require("fs");
const hbs = require("hbs");
      hbs.registerPartials(__dirname + "/views/partials");
      hbs.registerHelper("getCurrentYear", () => {
        return new Date().getFullYear();
      });

      hbs.registerHelper("screamIt", (text) => {
        return text.toUpperCase();
      });

var app = express();
    app.set("view engine", "hbs");

    app.use((req, res, next) => {
      var now = new Date().toString();
      var log = `The date is: ${ now }`;

      console.log(now);
      fs.appendFile("server.log", log + "\n", (error) => {
        if (error) {
          console.log("Unable to save log to server.log");
        }
      });

      next();
    });

    // app.use((req, res, next) => {
    //   res.render("maintainance.hbs");
    // });

    app.use(express.static(__dirname + "/public/"));

    app.get("/", (req, res) => {
      res.render("home.hbs", {
        title : "Home Page",
        welcomeMessage : "Welcome to me site",
      });
    });

    app.get("/about", (req, res) => {
      res.render("about.hbs", {
        title : "About Page",
      });
    });

    app.get("/bad", (req, res) => {
      res.send({
        error : "Bad"
      });
    });

    app.listen(port, () => {
      console.log(`Starting server on port ${ port }`);
    });
