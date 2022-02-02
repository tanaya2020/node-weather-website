const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require('postman-request')

const app = express();

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

// Define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set up handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "tanaya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT",
    name: "tanaya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    helpText: "This is some helpful text.",
    name: "tanaya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide address to know about weather.',
    });
  }

  geocode(req.query.address,(error,{lattitude, longitude, location}={})=>{
    if(error){
       return res.send({
         error: error
       })
    }
    forecast(lattitude,longitude, (error,forecastData)=>{
        if(error){
            return res.send({
              error:error
            })
        }

        res.send({
          forecastData: forecastData,
          location,
          address:req.query.address,          
        })
    })
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please provide search query.",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "HELP 404",
    errorMsg: "Help article not found",
    name: "tanaya",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "My 404 page!",
    name: "tanaya",
  });
});

app.listen(3000, () => {
  console.log("Server is up with port 3000.");
});
