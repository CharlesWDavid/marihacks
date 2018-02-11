var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;
var webpack = require('webpack');
var config = require('./webpack.config');

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Controllers
var contactController = require('./controllers/contact');

// React and Server-Side Rendering
var routes = require('./app/routes');
var configureStore = require('./app/store/configureStore').default;

var app = express();

const dummydata = require('./public/db/DummyData.json');
var profile = require('./public/db/Profile.json');

var compiler = webpack(config);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

//React server posting

app.get('/dummydata', function(req, res){
  res.send(dummydata)
});

//location, programs,

app.get('/filter', function(req, res){
  var json = [];
  console.log(req.query)
  if (req.query != null){
    var filter = req.query;
    if (filter.location != null||filter.location != "none"||filter.location != undefined){
      json = dummydata.colleges.filter(college => college.Location.City == filter.location);
    };
    if (filter.program != null||filter.program != "none"||filter.program != undefined){
      if (json != []){
        var newProgram = filter.program.replace("%20", " ");
        json = json.filter(college => {return college.Programs.some(
          program => {return program.name == newProgram}
          )});
      } else {
      var newProgram = filter.program.replace("%20", " ");
      console.log(newProgram);
      json = dummydata.colleges.filter(college => {return college.Programs.some(
          program => {return program.name == newProgram}
        )});
      }
    }
  }
  res.send(json)
})


// app.post('/contact', contactController.contactPost);

// React server rendering
app.use(function(req, res) {
  var initialState = {
    messages: {}
  };

  var store = configureStore(initialState);

  Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        React.createElement(Router.RouterContext, renderProps)
      ));
      res.render('layout', {
        html: html,
        initialState: store.getState()
      });
    } else {
      res.sendStatus(404);
    }
  });
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
