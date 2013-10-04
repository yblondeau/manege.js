<?php
session_start();
require_once('twitteroauth/twitteroauth.php'); //Path to twitteroauth library
require_once('credentials.php');

$cacheDuration = 30; // minutes

// default values
$twitterUser = "yblondeau";
$numTweets = 10;

if (isset($_GET["user"])) {
  $twitterUser = $_GET["user"];
}

if (isset($_GET["num"])) {
  $tmp = intval($_GET["num"]);
  if ($tmp != 0)
	$numTweets = $tmp;
}

function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}

$file = $twitterUser."-".$numTweets."-tweets.txt";
if ( (!file_exists($file)) ||
     ((time() - filemtime($file)) > ($cacheDuration * 60)) )
{
	$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
	$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitterUser."&count=".$numTweets);

	$fh = fopen($file, 'w') or die("can't open file");
	fwrite($fh, json_encode($tweets));
	fclose($fh);
}

$json = file_get_contents($file);

if ($json !== false)
{
	header('Content-type: application/json');
	echo $json;
}
?>