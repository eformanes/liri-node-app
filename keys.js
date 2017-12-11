console.log('this is loaded');

var twitterKeys = {
  consumer_key: 'rWtQhhcVEpiVaczrC9YUYU5HN',
  consumer_secret: 'xoRZVuVomLvDpiy8k1t1LvPv9neaKHXAkE2LevaaiNMZo0PmeL',
  access_token_key: '939804103240073216-gcgSXnmrPiJYVgXecEw2ietUueiOoJX',
  access_token_secret: 'FyiNJCvu5AT1YrQLzzWfV0xdjBVYZiMcDQWShbevEJiMR',
}

var spotifyKeys = {
  id: 'ee50fb27f48348539981a13bc7e77536',
  secret:'80c085ae450047a4a5f0b4d65b5a9b02'
}


// Exports an array of keys  
//  Twitter keys are index 0
//  Spotify keys are index 1
module.exports = [twitterKeys, spotifyKeys];
