(function ( $ ) {

  $.fn.Manege = function( options ) {

    var settings = $.extend({
      // default parameters
      twitterAccount: 'yblondeau',
      numTweetsShown: 3,
      numTweetsTotal: 10,
      refreshTime: 3
    }, options );

    function TweetSlider() {
      // move first tweet to last position
      $('.tweet:last').after($('.tweet:first'));
      // hide last tweets and show first ones once done
      $('.tweet:gt(' + (settings.numTweetsShown - 1) + ')').hide();
      $('.tweet').slice(0, settings.numTweetsShown).fadeIn();
    };

    return this.each(function() {
      var elem = $(this);
      $.getJSON('//' + document.domain + '/tweets/get-tweets.php?user=' + settings.twitterAccount + '&num=' + settings.numTweetsTotal + '&rnd=' + Math.random(),
        function(data) {
          var count = 0;
          var hiddenSnippet = ' style="display:none"';
          $.each(data, function(i,item) {
            var ct = item.text;
            var mytime = item.created_at;
            var strtime = mytime.replace(/(\+\S+) (.*)/, '$2 $1')
            var twDate = new Date(Date.parse(strtime)).toLocaleDateString();
            var twTime = new Date(Date.parse(strtime)).toLocaleTimeString();
            ct = ct.replace(/http:\/\/\S+/g,  '<a href="$&" target="_blank">$&</a>');
            ct = ct.replace(/\s(@)(\w+)/g,    ' @<a onclick="javascript:pageTracker._trackPageview(\'/outgoing/twitter.com/\');" href="//twitter.com/$2" target="_blank">$2</a>');
            ct = ct.replace(/\s(#)(\w+)/g,    ' #<a onclick="javascript:pageTracker._trackPageview(\'/outgoing/twitter.com/search?q=%23\');" href="//twitter.com/search?q=%23$2" target="_blank">$2</a>');
            elem.append(function() {
              return '<div class="tweet"' + ((count > (settings.numTweetsShown - 1)) ? hiddenSnippet : '') + '>'+ ct + '<br/><span class="tweet-date">' + twDate + ' - ' + twTime + '</span></div>';
            });
            count++;
          });

          if ($('.tweet').length > settings.numTweetsShown) {
            setInterval(TweetSlider, settings.refreshTime * 1000);
          }
      });
    });
  };
}( jQuery ));