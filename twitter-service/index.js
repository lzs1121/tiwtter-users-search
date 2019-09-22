const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const Twit = require('twit');
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
var T = new Twit({
    consumer_key:         'YzLRKvOQvqfezsmmdkgTn3mcU',
    consumer_secret:      'QreBs9VNz6a9QZBHXiZbvBqd8nMRkj1tAzoGiomgH7pxWRfBzK',
    access_token:         '1147635994029522944-824jCkkZbSSMU4OHQRKI6lpQu41qEr',
    access_token_secret:  'qBjarABYAjSlD0dLPxqLNvsWOteWWAdeM6OjT3BhMdvI2',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    // strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.get('/tweets/:search', function(req,res){
    T.get(
        'search/tweets', 
        { 
            q: req.params.search, 
            count: 5, 
        }, 
        function(err, data, response) {
            // console.log(data)
            res.json(data);
        }
    );
    // console.log(req.params.search);
    // res.json({
    //     'status':'Success'
    // });
});
app.get('/users/:search', function(req,res){
    T.get(
        'users/search', 
        { 
            q: req.params.search, 
            count: 5, 
        }, 
        function(err, data, response) {
            console.log(data)
            res.json(data);
        }
    );
});
app.post('/comment/', function(req,res){
    T.post(
        'statuses/update', 
        { 
            status: req.body.comment
        }, 
        function(err, data, response) {
            res.json(data);
        }
    );
});
 
app.listen(8000);
console.log("**RESTART**");