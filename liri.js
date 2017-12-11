//  Assign the command name entered from the console for testing
//  If have time, obtain input using Inquirer
var commandName = process.argv[2];
//var secondSearchParam = process.argv[3];

// Create an empty variable for holding the search parameters
var searchParameters = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < process.argv.length; i++) {

  if (i > 3 && i < process.argv.length) {

    searchParameters = searchParameters + "+" + process.argv[i];

  }

  else {

    searchParameters += process.argv[i];

  }
}



//"Import external libraries and files"
// keys file contains all the keys required for this project in an array
var keys = require("./keys.js");
// Twitter keys are stored in the first index of the keys array
var twitterStuff = keys[0];
var spotifyStuff = keys[1]

var request = require("request");
var twitter = require("twitter");
var Spotify = require('node-spotify-api');

if(commandName === 'my-tweets'){  
  //console.log(twitterStuff);
  //var twitterQuery = "https://api.twitter.com/1.1/search/tweets.json?q=";

  var twiterClient = new twitter(twitterStuff);



  var params = {screen_name: 'eeeDemo123'};
  twiterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
      //console.log(tweets[0].text);

      //console.log(tweets[0].created_at);
      console.log("Last tweets from Twitter user " + params.screen_name);
      //  Loop through the returned tweets array
      for(var i=0; i< tweets.length; i++){
        console.log("----------------");
        console.log("Tweet created " + tweets[i].created_at);
        console.log("Tweet text: " + tweets[i].text);
      }

    }
  });

}
else if(commandName === 'spotify-this-song'){
  console.log(spotifyStuff);
  var spotify = new Spotify(spotifyStuff);


  spotify.search({ type: 'track', query: searchParameters }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    // data.tracks.items is an array
    //below returns artists name
    //console.log(data.tracks.items[0].album.artists[0].name); 
    
    // below returns name of song
    //console.log(data.tracks.items[0].name); 

    // below returns link to album
    //console.log(data.tracks.items[0].album.external_urls);
    
    // below returns name of the album
    //console.log(data.tracks.items[0].album.name);
    
    console.log("Spotify Search Parameters are " + searchParameters);
    console.log("----------------");
    console.log("Artist name is: " + data.tracks.items[0].album.artists[0].name); 
    console.log("Name of song is: " + data.tracks.items[0].name);
    console.log("Link to album preview: " + data.tracks.items[0].album.external_urls);
    console.log("Name of the album is: " + data.tracks.items[0].album.name);

  });

}

console.log("Command entered is " + commandName);