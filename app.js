/**
 * Module dependencies.
 */
const
  express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  chalk = require('chalk'),
  errorHandler = require('errorhandler'),
  expressValidator = require('express-validator'),
  Promise = require('bluebird'),
  router = require('./routes/router.js'),
  db = require("./config/dbs"),
  app = express();





class Server {

  constructor() {
    this.initExpress();
    //  this.initDatabaseCon();
    this.initErrorHandler();
    this.initRoutes();
    //  this.initStart();
    // this.socketInit();
  }


  initExpress() {

    console.log("-----------------------------------------------------")
    app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
    app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000);
    app.use(session({
      secret: 'work hard',
      resave: true,
      saveUninitialized: false
    }));

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());

    /**
     * promise config
     */

    Promise.config({
      warnings: true,
      longStackTraces: true,
      cancellation: true,
      monitoring: true
    })

    app.use(function (req, res, next) {

      console.log("setting cors")

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    });

  }

  initDatabaseCon() {
    let that = this;
    db.connect('mongodb://localhost:27017', function (err) {
      if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
      } else {
        console.log("connected");
        that.initRoutes();
        router.load(app, './controllers');
      }
    });
  }

  socketInit(server) {

    var io = require('socket.io').listen(server);


    io.on('connection', (socket) => {
      console.log('user connected');

      socket.on('new-message', (message) => {
        console.log(message);
        // socket.emit(message);
        io.emit("new-message", message);


      });
    });


  }

  initStart() {
    var server = app.listen(app.get('port'), () => {
      console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
      console.log('  Press CTRL-C to stop\n');
    });

    // app.listen(3000);

    this.socketInit(server);




  }
  initRoutes() {
    // router.load(app, './controllers');
    this.socketInit();
    this.initStart()
  }

  initErrorHandler() {
    if (process.env.NODE_ENV === 'development') {
      app.use(errorHandler());
    }
  }
}

let server = new Server();
