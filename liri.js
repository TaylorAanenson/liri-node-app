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

// Main application function
app(command, staticInput, fluidInput);
function app(command, staticInput, fluidInput){

    switch(command){

        case 'my-tweets':
        twitterDisplay();
        break;

        case 'spotify-this-song':
        var song = fluidInput;
        if(staticInput == null){
            songSet();
        }else{
            songSearch(song);
        }
        break;

        case 'movie-this':
        var movie = fluidInput;
        if(staticInput == null){
            movieSet();
        }else{
            movieSearch(movie);
        }
        break;

        case 'do-what-it-says':
        randomTxt();
        break;
        
    }
}

// Tweet displayer
function twitterDisplay(){
    var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets) {
        if (!error) {
            for (var i=0;i<20;i++){
                console.log('--------------------------------------------------------------------------------');
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                console.log('--------------------------------------------------------------------------------');
            }
        }
    });
}

// Spotify search
function songSet(){
    spotify
    .search({ type: 'track'||'artist', query: 'the sign'&&'ace of base' })
    .then(function(response){
        console.log('--------------------------------------------------------------------------------');
        console.log("Artist: "+response.tracks.items[0].artists[0].name);
        console.log("Song name: "+response.tracks.items[0].name);
        console.log("Link to album: "+response.tracks.items[0].album.external_urls.spotify);
        console.log("Album's name: "+response.tracks.items[0].album.name);
        console.log('--------------------------------------------------------------------------------');
    })
    .catch(function(err) {
      console.log(err);
    });
}
function songSearch(song){
    spotify
    .search({ type: 'track'||'artist', query: JSON.stringify(song) })
    .then(function(response){
        console.log('--------------------------------------------------------------------------------');
        console.log("Artist: "+response.tracks.items[0].artists[0].name);
        console.log("Song name: "+response.tracks.items[0].name);
        console.log("Link to album: "+response.tracks.items[0].album.external_urls.spotify);
        console.log("Album's name: "+response.tracks.items[0].album.name);
        console.log('--------------------------------------------------------------------------------');
    })
    .catch(function(err) {
        console.log(err);
    });
}

// OMDB Search
function movieSet(){
    ombd("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200){
            console.log('--------------------------------------------------------------------------------');
            console.log("Title: "+JSON.parse(body).Title);
            console.log("Year Released: "+JSON.parse(body).Year);
            console.log("IMDB Rating: "+JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value);
            console.log("Countrie's where movie was produced: "+JSON.parse(body).Country);
            console.log("Languages: "+JSON.parse(body).Language);
            console.log("Plot: "+JSON.parse(body).Plot);
            console.log("Actors: "+JSON.parse(body).Actors);
            console.log('--------------------------------------------------------------------------------');
        }
    });
}
function movieSearch(movie){
    ombd("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200){
            console.log('--------------------------------------------------------------------------------');
            console.log("Title: "+JSON.parse(body).Title);
            console.log("Year Released: "+JSON.parse(body).Year);
            console.log("IMDB Rating: "+JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value);
            console.log("Countrie's where movie was produced: "+JSON.parse(body).Country);
            console.log("Languages: "+JSON.parse(body).Language);
            console.log("Plot: "+JSON.parse(body).Plot);
            console.log("Actors: "+JSON.parse(body).Actors);
            console.log('--------------------------------------------------------------------------------');
        }
    });
}

// Random.txt Search
function randomTxt(){
    fs.readFile("random.txt","utf8", function(error,data){
        if (!error){
            var arr = data.split(',');
            command = arr[0];
            fluidInput = arr[1];
            console.log(command,fluidInput);
            app(command, '' , fluidInput);
        }
    });
}