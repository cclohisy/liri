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
var params = { screen_name: "cclohi_bc", count: 20 };

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

// * `my-tweets`
if (command == "my-tweets") {
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            var tweetArray = tweets
            console.log("\n----- My Last 20 Tweets -----")
            for (var i = 0; i < tweetArray.length; i++){               
                console.log("Tweet " + (i+1) +": " + tweets[i].text + "\n Created on " + tweets[i].created_at)
            }
        }
    })
}//closes tweet command

// * `spotify-this-song`
if (command == "spotify-this-song") {
    // https://api.spotify.com/v1/search?q=abba&type=track
    spotify.search({
        type: 'track',
        query: input,
        limit: 1
    }, function(err, response){

        if (err) {
            console.log("---------------------")
            console.error('Something went wrong', err.message);
            return;
        }
        else {
            console.log("----- Song Information -----")
            console.log("Song title: " + response.tracks.items[0].name)
            console.log("Album: " + response.tracks.items[0].album.name)
            console.log("Artist: " + response.tracks.items[0].artists[0].name)
            console.log(response.tracks.items[0].id)
            // A preview link of the song from Spotify
        }

})
}





// * `movie-this`
if (command == "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        console.log(JSON.parse(body).Response)
        // If the request was successful
        if (JSON.parse(body).Response == "True") {

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
        else {
            console.log("Mr. Nobody")

        }
    })//closes request    
}//closes movie if statement 

// * `do-what-it-says`
if (command == "do-what-it-says") {
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands.

}
