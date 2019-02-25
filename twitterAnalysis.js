var twitterAnalysis = function() {
    const async = require('async');
    const twitter = require('twitter');
    const dotenv = require('dotenv');
    const Sentiment = require('sentiment');
    var sentiment = new Sentiment();
    dotenv.config();

    const twitterApi = new twitter({
        consumer_key: "YtCwPnwYEEwswx4UTRv5sRHBN",
        consumer_secret: "eoQ3rw9jJLHQ69jKvbLMuc3eSMCiYTZZrXzXMV2EvMQV48KrYZ",
        access_token_key: "983774988007297024-xo2ZkoDSq6Kl4iaeQg6MmJk43JRF2yB",
        access_token_secret: "ff73Zswa8l4N5CyRo7YXov61VIG04DoiB6f1gwQkI8ga9"
    });

    const totalScore = [];
    this.getTwitterData = function(query) {
        twitterApi.get("search/tweets", {q: "#" + query, lang: "en"}, function(error, tweets, res) {
            for (const tweet of tweets.statuses) {
                score = sentiment.analyze(tweet.text);
                totalScore.push(score.score);
            }
            // console.log(totalScore);
            this.totalscore = totalScore;
        } )
    }
    this.getTwitterHashTagData = function (query, callback) {
        var dataScore = {"Very Negative": 0, "Negative": 0, "Neutral": 0, "Positive": 0, "Very Positive": 0};
        var sum = 0;

        twitterApi.get("search/tweets", {q: "#" + query, lang: "en"}, function (error, tweets, response) {
            var twitterData = [];
            var sortedTwitterData = [];
            var totalScore = [];
            if (error) callback(error);

            async.each(tweets.statuses, function (item, callEach) {
                twitterData.push(item.text);
                // console.log(item.text)
                score = sentiment.analyze(item.text);
                // console.log(score.score)
                totalScore.push(score.score);
                callEach(); 
            }, function () {
                callback(null, totalScore);

            });

        });
    };
}


module.exports = twitterAnalysis;