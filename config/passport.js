'use strict'

const	passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		User = require('../models/user-model')

passport.serializeUser((user, done) => {
	done(null, user._id)
})

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => { 
		done(err, user)
	})
})

passport.use(new LocalStrategy(
	{usernameField: 'email'},
	(email, password, done) =>{
		User.findOne({email}, (err, user) => {
			if (!user) {
				return done(null, false, {message: `Este email: ${email} no esta reegistrado`})
			}else{
				user.compararPassword(password, (err, sonIguales) => {
					if(sonIguales){
						return done(null, user)
					}else{
						return done(null, false, {message: 'La contraseña no es valida'})
					}
				})
			}
		})
	}
))

exports.estaAutenticado = (req, res, next) =>{
	if(req.isAuthenticated()){
		return next()
	} 
	// res.status(401).send('Tienes que Loguearte para acceder')
	// res.redirect('/')
	let locals = {
		title: 'Tienes que iniciar sesión o registrarte para acceder',
		btn: 'Registrar', 
		ruta: '/registrar'
	}
	res.render('index', locals)
}