const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var twitterAnalysisInstance = require("./twitterAnalysis.js");

const twitter = new twitterAnalysisInstance();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/', function (req, res) {
    const tweet = req.body.tweet;
    console.log(req.body.tweet);
    twitter.getTwitterHashTagData(tweet, function (error, totalScoreArray) {
        if (error) console.log(error);
        totalScoreValue = totalScoreArray.reduce((a,b) => a+b, 0);
        let emotion;
        let color;
        if (totalScoreValue > 0) {
            emotion = 'Positive';
            color = 'blue';
        } else if (totalScoreValue < 0) {
            emotion = 'Negative';
            color = 'red';
        } else {
            emotion = 'Neutral';
            color = 'white';
        }
        console.log(totalScoreValue)

        res.render('response',{emotion: emotion,score: totalScoreValue,tweet: tweet, color: color});
  })})

const port = 5000;

app.listen(port, () => {
     console.log(`Listening to the app on port ${port}`)
 })