require("dotenv").config();
var fs = require("fs")
var request = require("request")
var keys = require("./keys.js")

//spotify stuff
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//twiter stuff... 
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var params = {screen_name: "cclohi_bc", count:20 };//not sure if count aspect is working

//other vars
var command = process.argv[2]
var input = ""
var inputArray = process.argv

for (var i = 3; i < inputArray.length; i++) {
    if (i > 3 && i < inputArray.length) {
      input = input + "+" + inputArray[i];
    }  
    else { 
      input += inputArray[i]; 
    }
  }
console.log(input)

// spotfy client ID 791025b30b2240b0bffe39604df17de8  Client Secret 3b8f20678ba949b49e05095416054ba0

// * `my-tweets`
if(command == "my-tweets"){
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            var tweetArray = tweets
            for(var i=0; i<tweetArray.length; i++)
            console.log("Tweet: " + tweets[i].text + " Created on "+ tweets[i].created_at)
    //   https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2

        }
      })
}//closes tweet command


// * `spotify-this-song`
if(command == "spotify-this-song"){
	// https://api.spotify.com/v1/search?q=abba&type=track
spotify.search({ type: 'track', query: "masseduction"})
.then(function(response){

console.log(response) 
})
}
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from


// If no song is provided then your program will default to "The Sign" by Ace of Base.

    


// * `movie-this`
if(command == "movie-this"){
var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body){
    console.log(JSON.parse(body).Response)
    // If the request was successful
    if (JSON.parse(body).Response == "True"){

        console.log(JSON.parse(body).Title)
        console.log("Release in " + JSON.parse(body).Year)
        console.log("Film was rated " + JSON.parse(body).Rated)
        console.log("Film was made in " + JSON.parse(body).Country)
        console.log("Plot: " + JSON.parse(body).Plot)
        console.log("Actors: " + JSON.parse(body).Actors)

        var ratings = JSON.parse(body).Ratings
        console.log("IMDB rating " + ratings[0].Value)
        console.log(ratings[1].Source + " rating " + ratings[1].Value)
        
    }
    //else Mr. Nobody outputs
    else{
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/")
        console.log("It's on Netflix!")
    }
})//closes request    
}//closes movie if statement 

// * `do-what-it-says`
if(command == "do-what-it-says"){
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
    
}
