const express = require('express');
const cookieParser = require('cookie-parser');
var path = require('path');
var request = require("request");

const app = express();
app.use(cookieParser());
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
  request('https://jsonplaceholder.typicode.com/users', function (error, response, body) {
  	if(!error && response.statusCode === 200) {
				var dataJSON1 = JSON.parse(body);
		  request('https://jsonplaceholder.typicode.com/posts', function (error, response, body) {
		  	if(!error && response.statusCode === 200) {
					var dataJSON2 = JSON.parse(body);
					var s = new String();
					for(var i = 0; i < dataJSON1.length; i++) {
						var count = 0;
						for(var j = 0; j < dataJSON2.length; j++) {
							if(dataJSON2[j].userId === dataJSON1[i].id) {
								count++;
							}
						}
						s = s + "<li>" + dataJSON1[i].name + "has " + count + " posts.</li><br><br>";
					}
					res.render('authors', {s});
		  	}
		  });
  	}
  });
});

app.get('/setcookie/:name/:age', (req, res) => {
	res.cookie('name', req.params.name)
	res.cookie('age', req.params.age).send("Cookie Set: <br><a href='/getcookies'>View cookie</a>");
});

app.get('/getcookies', (req, res) => {
	res.send("Name: " + req.cookies.name + "<br>Age: " + req.cookies.age);
});

app.listen(8080, () => {
  console.log("App is listening to port 8080");
});