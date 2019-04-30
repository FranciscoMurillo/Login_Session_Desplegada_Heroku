'use strict'

var express = require('express'),
	router = express.Router(),
	passportConfig = require('../config/passport'),
	userControl = require('../controllers/user-controller'),
	mailControl = require('../controllers/mail-controller')


router
	.get('/', userControl.login)
	.get('/registrar', userControl.register)
	.put('/postSignup', userControl.postSignup)	
	.put('/login', userControl.postLogin)
	.get('/logout', passportConfig.estaAutenticado, userControl.logout)	
	.get('/perfil', passportConfig.estaAutenticado, userControl.perfil)
	.get('/contacto', mailControl.contacto)
	.put('/enviar', mailControl.enviar)
	.use(userControl.error404)

module.exports = router
