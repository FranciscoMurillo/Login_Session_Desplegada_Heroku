'user strict'

const 	passport = require('passport'),
		User = require('../models/user-model'),
		UserCtrl = () => { }

// Login
UserCtrl.login = (req, res, next) => res.render('index', { title: 'Iniciar Sesión', btn: 'Registrar', ruta: '/registrar' })

UserCtrl.register = (req, res, next) => res.render('register', { title: 'Registrate', btn: 'Iniciar Sesión', ruta:'/' })

UserCtrl.perfil = (req, res, next) => {
	res.render('perfil', { 
		title: 'Bienvenid@',
		name: req.user.nombre,
		email: req.user.email,
		sexo: req.user.sexo,
		img: req.user.avatar	
	})
}

UserCtrl.postSignup = (req, res, next) => {
	const newUser = new User({
		email: req.body.email,
		password: req.body.password,
		nombre: req.body.nombre,
		sexo: req.body.sexo,
		avatar: req.body.sexo + ".jpg"
	})

	User.findOne({ email: req.body.email }, (err, userExits) => {
		if (userExits) {
			return res.status(400).render('register', { title: 'Ya ese email esta registrado', btn: 'Iniciar Sesión', ruta: '/'})
		}
		newUser.save((err) => {
			if (err) {
				next(err)
			}
			req.logIn(newUser, (err) => {
				if (err) {
					next(err)
				}
				res.redirect('/perfil')
			})
		})
	})
}


UserCtrl.postLogin = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			next(err)
		}
		if (!user) {
			return res.status(400).render('index', { title: 'Email o contraseña no válidos', btn: 'Registrar', ruta: '/registrar' })
			
		}
		req.logIn(user, () => {
			if (err) {
				next(err)
			}
			console.log('Login Exitoso')
			res.redirect('/perfil')
		})
	})(req, res, next)
}

UserCtrl.logout = (req, res) => {
	req.logout()

	let locals = {
		title: 'Gracias por Visitarnos',
		btn: 'Registrar', 
		ruta: '/registrar'
	}

	res.render('index', locals)
}

UserCtrl.error404 = (req, res, next) => {
	let error = new Error(),
		locals = {
			title: 'Error 404',
			description: 'Recurso No Encontrado',
			error: error
		}

	error.status = 404
	res.render('error', locals)

	next()
}

module.exports = UserCtrl