manege.js
=========

Simple jQuery plugin and PHP backend to display the last tweets of a given account.

How to use
----------
* Copy all files to a PHP webserver
* Update `credentials.php` with your Twitter REST API access tokens. See [the documentation on Twitter's own website](https://dev.twitter.com/docs/auth/tokens-devtwittercom)
* Create a dedicated `<div>` in your page and include `manege.js`
* On page load, call the `Manege` plugin function on the dedicated `<div>` specifying the parameters values:
    * `twitterAccount`: the Twitter account from which you want to display the last tweets
    * `numTweetsShown`: the number of tweets shown at the same time (default is 3)
    * `numTweetsTotal`: the number of tweets kept in the local cache (default is 10)
    * `refreshTime`: the delay between two rotations of the *manège* (default is 3)
* Enjoy!

Example
-------

    $("#tweets").Manege({
      twitterAccount: 'yblondeau',
      numTweetsShown: 5
    });