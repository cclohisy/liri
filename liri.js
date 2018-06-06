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

function myTweets() {
    client.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (!error) {
            var tweetArray = tweets
            console.log("")
            console.log("\n----- My Last 20 Tweets -----")
            fs.appendFile("log.txt", "\nMy Last 20 Tweets", function (err) {
                if (err) {
                    console.log(err);
                }
            })
            for (var i = 0; i < tweetArray.length; i++) {
                console.log("\nTweet " + (i + 1) + ": " + tweets[i].text + "\n Created on " + tweets[i].created_at)
                fs.appendFile("log.txt", "\n\nTweet " + (i + 1) + ": " + tweets[i].text + "\n Created on " + tweets[i].created_at,
                    function (err) {
                        if (err) {
                            console.log(err);
                        }
                    })
            }
            console.log("_________________________________________________________\n")
        }
    })
}

function movieSearch() {
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        // If the request was successful
        if (JSON.parse(body).Response == "True") {
            console.log("\n-----Movie Information-----")
            console.log("Movie: " + JSON.parse(body).Title)
            console.log("Rating: " + JSON.parse(body).Rated)
            console.log("Released in " + JSON.parse(body).Year)
            console.log("Language: " + JSON.parse(body).Language)
            console.log("Filmed in " + JSON.parse(body).Country)
            console.log("Plot: " + JSON.parse(body).Plot)
            console.log("Actors: " + JSON.parse(body).Actors)

            var ratings = JSON.parse(body).Ratings
            if (ratings[0] == undefined) {

            }
            else { console.log("IMDB rating " + ratings[0].Value) }
            //debugger;
            if (ratings[1] == undefined) {

            }
            else { console.log(ratings[1].Source + " rating " + ratings[1].Value) }
            fs.appendFile("log.txt",
                "\nMovie: " + JSON.parse(body).Title + ", " + "Rating: " + JSON.parse(body).Rated + ", " + "Released in " + JSON.parse(body).Year + ", "
                + "Language: " + JSON.parse(body).Language + ", " + "Filmed in " + JSON.parse(body).Country + ", " + "Plot: " + JSON.parse(body).Plot + ", " +
                "Actors: " + JSON.parse(body).Actors + ", " + "IMDB rating " + ratings[0].Value + ", " + ratings[1].Source + " rating " + ratings[1].Value,
                function (err) {
                    if (err) {
                        console.log("Data could not be logged" + err);
                    }
                    else {
                        console.log("\nMovie data successfully logged!")
                        console.log("")
                    }
                })

        }//closes results

        //else Mr. Nobody outputs
        else {
            var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
            request(queryUrl, function (error, response, body) {
                console.log("\n-------No information found for that movie-------")
                console.log("\nYou should watch Mr. Nobody!")
                console.log("\nMovie: " + JSON.parse(body).Title)
                console.log("Released in " + JSON.parse(body).Year)
                console.log("Film is rated " + JSON.parse(body).Rated)
                console.log("Film was made in " + JSON.parse(body).Country)
                console.log("Plot: " + JSON.parse(body).Plot)
                console.log("Actors: " + JSON.parse(body).Actors)

                var ratings = JSON.parse(body).Ratings
                console.log("IMDB rating " + ratings[0].Value)
                console.log(ratings[1].Source + " rating " + ratings[1].Value)

            })
        }
    })//closes request    

}
function songSearch() {
    spotify.search({
        type: 'track',
        query: input,
        limit: 1
    }, function (err, response) {

        if (err) {
            console.error('\nSomething went wrong', err.message);
            spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
                .then(function (sign) {
                    //debugger;
                    console.log("\n----- Song was not found -----")
                    console.log("Check out this song from the Swedish pop sensation Ace of Base instead!")
                    console.log("\nSong title: " + sign.name)
                    console.log("Album: " + sign.album.name)
                    console.log("Artist: " + sign.album.artists[0].name)
                    console.log("Preview Song: " + sign.preview_url)
                    console.log("")
                }).catch(function (err) {
                    console.error('Error occurred: ' + err);
                })
            return;
        }
        else {
            console.log("")
            console.log("----- Song Information -----")
            console.log("Song title: " + response.tracks.items[0].name)
            console.log("Album: " + response.tracks.items[0].album.name)
            console.log("Artist: " + response.tracks.items[0].artists[0].name)
            if (response.tracks.items[0].preview_url == null) {
                console.log("Preview Song: Preview not available for this song, sorry!")
            }
            else {
                console.log("Preview Song: " + response.tracks.items[0].preview_url)
            };
            fs.appendFile("log.txt", "\nSong title: " + response.tracks.items[0].name + ", " + "Album: " + response.tracks.items[0].album.name + ", "
                + "Artist: " + response.tracks.items[0].artists[0].name + ", " + "Preview Song: " + response.tracks.items[0].preview_url,
                function (err) {
                    if (err) {
                        console.log("Data could not be logged" + err);
                    }
                    else {
                        console.log("Song data successfully logged!")
                        console.log("")
                    }
                })

        }

    })
}


switch (command) {
    // * `my-tweets`
    case "my-tweets":
        fs.appendFile("log.txt", "\n______________________________________"  + "\nCommand chosen: " + command, function (err) {
            if (err) {
                console.log(err);
            }
        })
        myTweets()
        break

    case "spotify-this-song":
        fs.appendFile("log.txt", "\n______________________________________"  + "\nCommand chosen: " + command + " " + input + "\nResults: ", function (err) {
            if (err) {
                console.log(err);
            }
        })
        songSearch()
        break

    // * `movie-this`
    case "movie-this":
        fs.appendFile("log.txt", "\n______________________________________" + "\nCommand chosen: " + command + " " + input + "\nResults: ", function (err) {
            if (err) {
                console.log(err);
            }
        })
        movieSearch()
        break

    // * `do-what-it-says`
    case "do-what-it-says":
        // Use fs pkg...  take the text inside of random.txt and then use it to call one of LIRI's commands.
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var textArrayRandom = data.split("\n")
                var randomMax = textArrayRandom.length
                var randomIndex = (Math.floor(Math.random() * randomMax) + 1)
                inputArrayRandom = textArrayRandom[randomIndex].split(",")
                command = inputArrayRandom[0]
                input = inputArrayRandom[1]
                switch (inputArrayRandom[0]) {
                    case "spotify-this-song":
                        fs.appendFile("log.txt", "\n______________________________________" + "\nCommand chosen: do-what-it-says \nResults:", function (err) {
                            if (err) {
                                console.log(err);
                            }
                        })
                        songSearch()
                        break
                    case "movie-this":
                        fs.appendFile("log.txt", "\n______________________________________" + "\nCommand chosen: do-what-it-says \nResults:", function (err) {
                            if (err) {
                                console.log(err);
                            }
                        })
                        movieSearch()
                        break
                }
            }
        })
        break

}//close switch
