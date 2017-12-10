var commandName = process.argv[2];
var twitterStuff = require("./keys.js");
var request = require("request");
var twitter = require("twitter");

if(commandName === 'my-tweets'){

    console.log(twitterStuff);
    var twitterQuery = "https://api.twitter.com/1.1/search/tweets.json?q=";

    var twiterClient = new twitter(twitterStuff);



    var params = {screen_name: 'eeeDemo123'};
    twiterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        
        //This works but need to pull just the text out
        // for(var key in tweets){
        //     console.log(key.text);
        // }


      }
    });



 

}

console.log("Command entered is " + commandName);