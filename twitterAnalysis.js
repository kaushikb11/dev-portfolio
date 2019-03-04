const twitterAnalysis = function() {
    const async = require('async');
    const twitter = require('twitter');
    const dotenv = require('dotenv');
    const Sentiment = require('sentiment');
    const sentiment = new Sentiment();
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

    this.getTrendingHashtags = function(callback) {
        twitterApi.get("trends/place", {id: 23424848}, function(error, trends, response) {
            if (error) callback(error);
            const trendsTopics = []
            async.each(trends[0].trends, function(item, callEach) { 
                trendsTopics.push(item.name)
                callEach();
            }, function() {
                callback(null, trendsTopics)
        })
    })}

    this.getTwitterHashTagData = function (query, callback) {

        twitterApi.get("search/tweets", {q: "#" + query, lang: "en"}, function (error, tweets, response) {
            const twitterData = [];
            const totalScore = [];
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