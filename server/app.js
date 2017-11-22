// identifing my const for later use

const express = require('express');
const morgan = require("morgan");
const axios = require("axios");
const app = express();

//if the id they're requesting is in cache.id, show them cache.data,
//otherwise pull from api, and save it into cache.
//the cache values as an object
const cache = {};
//useing morgean to log as (dev) logs
app.use(morgan("dev"));
//calling to the direct line

app.get("/", function (req, res) {
// new things that are  decalared
//movie is going to figure if the paramiter is the i= id of movie or t= tittle of movie
    var movie =  req.query;
//key will then give the id of the movie
    var key = Object.keys(movie);
//value will then give the tittle
    var value = Object.values(movie);
//if statment is to get value from cashe or pull from web
     if(cache.hasOwnProperty(value)){
       res.json(cache[value]); 
       
   }else{

   
console.log(cache)

// axios is  implamenting an api key as a paramiter when calling to the omdb server
    axios
        .get('http://www.omdbapi.com/?apikey=8730e0e&' + key + "=" + encodeURI(value))
        .then((response) => {
            // cache will store the value that was  sent form server to user
            cache[value] = response.data;
            //this will send the requested movie directly from the server to the user
            res.send(response.data);

        })
        .catch(err => res.json(err.message))
    }
    });


// // When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;