const express = require('express');
var path = require('path');
var request = require("request");

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
   res.send("Hello World - Saurabh");
});

app.get('/html', (rq, res) => {
res.render('home');
});

app.get('/image', (req, res) => {
	res.sendFile(__dirname + '/public/images/pic1.jpg');
});

app.get('/authors', (req, res) => {
  var dataJSON1, dataJSON2;
  request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
  	if(!error && response.statusCode === 200) {
  		  dataJSON1 = JSON.parse(body);
		  request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
		  	if(!error && response.statusCode === 200) {
		  		dataJSON2 = JSON.parse(body);
                res.render('authors', { data1: dataJSON1, data2: dataJSON2 });
		  	}
		  });
  	}
  });
});

app.listen(8080, () => {
  console.log("App is listening to port 8080");
});