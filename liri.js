require("dotenv").config();
var command = process.argv[2];
var staticInput = process.argv[3];
var fluidInput = process.argv.slice(3);
var keys = require('./keys');
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var ombd = require('request');
var movie = fluidInput.join('+');
var fs = require('fs');

// If command == my-tweets
if (command == 'my-tweets' && staticInput == null){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);
        }
      });
}

// If command == spotify-this-song
if (command == 'spotify-this-song' && staticInput == null){
    spotify
    .search({ type: 'track'||'artist', query: 'the sign'&&'ace of base' })
    .then(function(response) {
        console.log("Artist: "+response.tracks.items[0].artists[0].name);
        console.log("Song name: "+response.tracks.items[0].name);
        console.log("Link to album: "+response.tracks.items[0].album.external_urls.spotify);
        console.log("Album's name: "+response.tracks.items[0].album.name);
    })
    .catch(function(err) {
      console.log(err);
    });
}else if (command == 'spotify-this-song' && staticInput != null){
    spotify
    .search({ type: 'track'||'artist', query: JSON.stringify(fluidInput) })
    .then(function(response) {
      console.log("Artist: "+response.tracks.items[0].artists[0].name);
      console.log("Song name: "+response.tracks.items[0].name);
      console.log("Link to album: "+response.tracks.items[0].album.external_urls.spotify);
      console.log("Album's name: "+response.tracks.items[0].album.name);
    })
    .catch(function(err) {
      console.log(err);
    });
}

// If command == movie-this
if (command == 'movie-this' && staticInput == null){
    ombd("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: "+JSON.parse(body).Title);
            console.log("Year Released: "+JSON.parse(body).Year);
            console.log("IMDB Rating: "+JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value);
            console.log("Countrie's where movie was produced: "+JSON.parse(body).Country);
            console.log("Languages: "+JSON.parse(body).Language);
            console.log("Plot: "+JSON.parse(body).Plot);
            console.log("Actors: "+JSON.parse(body).Actors);
        }
    });
}else if (command == 'movie-this' && staticInput != null){
    ombd("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: "+JSON.parse(body).Title);
            console.log("Year Released: "+JSON.parse(body).Year);
            console.log("IMDB Rating: "+JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value);
            console.log("Countrie's where movie was produced: "+JSON.parse(body).Country);
            console.log("Languages: "+JSON.parse(body).Language);
            console.log("Plot: "+JSON.parse(body).Plot);
            console.log("Actors: "+JSON.parse(body).Actors);
        }
    });
}

// If command == do-what-it-says
var exec = require('child-process');
var a = exec.fork()
if (command == 'do-what-it-says' && staticInput == null){
    fs.readFile("random.txt","utf8", function(error,data){
        if(!error){
            child = exec('node liri.js'+data);
        }
    });
}