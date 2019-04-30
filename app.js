'use strict'

const express = require('express'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	favicon = require('serve-favicon'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	restFul = require('express-method-override')('_method'),
	jade = require('jade'),
	routes = require('./routes/user-router'),
	passport = require('passport'),
	MONGODB_URI = process.env.MONGODB || 'mongodb://heroku_zntlfscl:t9uk27t5upg1g2j5sp0la1d4r@ds161764.mlab.com:61764/heroku_zntlfscl',
	faviconURL = `${__dirname}/public/img/fj-favicon.png`,
	publicDir = express.static(`${__dirname}/public`),
	viewDir = `${__dirname}/views`,
	port = (process.env.PORT || 3000),
	app = express()


app
	//configurando app
	.set('views', viewDir)
	.set('view engine', 'jade')
	.set('port', port)
	//ejecutando middlewares
	.use(favicon(faviconURL))
	.use(session({
		secret: 'ESTO ES SECRETO',
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({
			url: MONGODB_URI,
			autoReconnect: false
		})
	}))
	.use(passport.initialize())
	.use(passport.session())
	// parse application/json
	.use(bodyParser.json())
	// parse application/x-wwww-form-urlencoded
	.use(bodyParser.urlencoded({ extended: true }))
	.use(restFul)
	.use(morgan('dev'))
	.use(publicDir)
	//ejecuto el middleware Enrutador
	.use(routes)

module.exports = app