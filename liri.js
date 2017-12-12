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
// Spotify keys are at [1]
var twitterStuff = keys[0];
var spotifyStuff = keys[1]

//  Require packages
var request = require("request");
var twitter = require("twitter");
var Spotify = require('node-spotify-api');
var fs = require("fs");



function myTwitter() {
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

function mySpotify(){
  //console.log(spotifyStuff);
  var spotify = new Spotify(spotifyStuff);

  // Default to "The Sign" if there are no search terms present
  if(searchParameters === ''){
    searchParameters = 'The+Sign';
  }

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
    //console.log("Link to album preview: " + data.tracks.items[0].album.external_urls);
    console.log("Link to album preview: " + data.tracks.items[0].preview_url);
    console.log("Name of the album is: " + data.tracks.items[0].album.name);

  });

}

function myMovie(){
  //Default to Mr. Nobody search if search term is blank
  if(searchParameters === ''){
    searchParameters = 'Mr.+Nobody';
  }
  
  // Then run a request to the OMDB API with the movie specified
  //request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {
    request("http://www.omdbapi.com/?t=" + searchParameters + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
  
      // Parse the body of the site and recover just the imdbRating
      console.log("The Title of the move is: " + JSON.parse(body).Title);
      console.log("The movie's release date is: " + JSON.parse(body).Released);
      console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
      //  For each loop to find the Rotten Tomatoes Rating within the Ratings object
      for (var key in JSON.parse(body).Ratings)
      {
        if((JSON.parse(body).Ratings[key].Source) === 'Rotten Tomatoes'){
          console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[key].Value);
        }
      }
      console.log("Production Country is: " + JSON.parse(body).Country);
      console.log("Movie Laungage is: " + JSON.parse(body).Language);
      console.log("The movie's plot is: " + JSON.parse(body).Plot);
      console.log("The movie's Actors are: " + JSON.parse(body).Actors);
    }
  });
}


//  Actual Execution
if(commandName === 'my-tweets'){  
  myTwitter();
}
else if(commandName === 'spotify-this-song'){
  mySpotify();

}
else if(commandName === 'movie-this'){
  myMovie();
}
else if(commandName === 'do-what-it-says'){
  console.log("DO IT!!!!");
  fs.readFile("random.txt", "utf8", function(err, data){
      if(err){
        return console.log(err);
      }

      data = data.split(",");
      console.log(data);

      var textCommandName = data[0];
      searchParameters = data[1];

      console.log("Data 0 is " + data[0]);

      switch(textCommandName){
        case "my-tweets":
          myTwitter();
          break;

        case "spotify-this-song":
          mySpotify();
          break;

        case "movie-this":
          myMovie();
          break;
      }


  })
}

console.log("Command entered is " + commandName);