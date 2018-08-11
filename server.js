const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(__dirname + '/public'));


// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

app.use((req , res , next) => {
  res.setHeader(`Access-Control-Allow-Origin` , `*`);
  res.setHeader(`Access-Control-Allow-Credentials` , `true`);
  res.setHeader(`Access-Control-Allow-Methods` , `GET, HEAD , OPTIONS, POST , DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers`);

 next();  
});


// Run the app by serving the static files
// in the dist directory

app.use(express.static(__dirname + '/'));


app.get('/*', function (req, res) {
  // body...
  console.log(__filename);
  res.sendFile(`${__dirname}/public/index.html`);
})


// Start the app by listening on the default
// Heroku port

app.listen(process.env.PORT || 8080);
console.log('listening on port 8080')