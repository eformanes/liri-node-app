//  Assign the command name entered from the console for testing
//  If have time, obtain input using Inquirer
var commandName = process.argv[2];

var twitterStuff = require("./keys.js");
var request = require("request");
var twitter = require("twitter");

if(commandName === 'my-tweets'){  
  //console.log(twitterStuff);
  var twitterQuery = "https://api.twitter.com/1.1/search/tweets.json?q=";

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

console.log("Command entered is " + commandName);