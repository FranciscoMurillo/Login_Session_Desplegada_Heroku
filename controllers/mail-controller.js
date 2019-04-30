'use strict'
const 	MailModel = require('../models/mail-model'),
		MailController = () => { }

// Login
MailController.contacto = (req, res, next) => res.render('contacto', { title: 'Contacto', btn: 'Registrar', ruta: '/registrar' })


MailController.enviar = (req, res, next) => {
	let email = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		company: req.body.company,
		message: req.body.message
	}

	console.log(email)

	MailModel.enviar(email),
	res.render('contacto', { title: 'Se ha enviado el Mail correctamente!', btn: 'Registrar', ruta: '/registrar' })
}

module.exports = MailController