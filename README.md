# LIRI Bot

## About 
LIRI (Language Interpretation and Recognition Interface) is a command line node app that takes in parameters and gives you back data. This version allows the user to search tweets, songs, and movies. As the user enters different commands, the command and resulting data are logged in a log.txt file. 

## Installation
1. Clone repo.
1. Install Node dependencies
    1. Run following command in Terminal/Bash: 
`\n npm install`

## How Does it Work? 
### Twiter
To display recent tweets run the following into Terminal/Bash:
`node liri.js my-tweets`
* This command will show the last 20 tweets associated with my twitter account and the date they were tweeted.

### Spotify
To search for specific song information type the following into Terminal/Bash: 
`node liri.js spotify-this-song <song name here>`
* This command will display the following: 
    * Song Title
    * Album
    * Artist
    * A preview link of the song from Spotify

### OMDB Movie Search
To search for specific movie information type the following into Terminal/Bash: 
`node liri.js movie-this <movie name here>`
* This command will display the following:
    * Movie Title
    * Rating
    * Release Date
    * Language
    * Plot
    * Cast
    * IMDB/Rotten Tomatoes Rating
    
    ### Do What It Says
    This command searches the the random.txt file to find and run one of the commands within the file. The random.txt contains search commands and topcis using the above commands. 
    Run the following in your Terminal/Bash:   
    `node liri.js do-what-it-says`

## Built With
* Node.js
* Twitter API 
* Spotify API 
* OMDB API 
* JSON


## Author 
Cecilia Clohisy
