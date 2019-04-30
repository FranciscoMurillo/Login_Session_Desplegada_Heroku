'use stric'

var app = require('./app'),
	mongoose = require('mongoose'),
	MONGODB_URI = process.env.MONGODB || 'mongodb://heroku_zntlfscl:t9uk27t5upg1g2j5sp0la1d4r@ds161764.mlab.com:61764/heroku_zntlfscl'


mongoose.Promise = global.Promise
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })
mongoose.connection.once('open', function () {
	console.log('Conexion establecida...')
	server = app.listen(app.get('port'), () => {
		console.log(`Iniciando Express en el puerto ${app.get('port')}`)
	})

}).on('error', function (error) {
	console.log('Error al conectar a la base de datos: ', error);
});