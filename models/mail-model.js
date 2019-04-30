'use strict'

var 	nodemailer = require('nodemailer'),
		MailModel = () => { }

MailModel.enviar = (data, res) => {
	const output = `
    <p>Mail de Prueba enviado con Node.js / MVC / NodeMailer / Express / Jade</p>
    <h3>Detalles del contato</h3>
    <ul>  
      <li>Nombre: ${data.name}</li>
      <li>Compañia: ${data.company}</li>
      <li>Email: ${data.email}</li>
      <li>Telefono: ${data.phone}</li>
    </ul>
    <h3>Mensaje</h3>
    <p>${data.message}</p>
  `;

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'p3plcpnl0503.prod.phx3.secureserver.net',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: 'francisco@wearenomad.cl', // generated ethereal user
			pass: '#Developer2019..'  // generated ethereal password
		},
		tls: {
			rejectUnauthorized: false
		}
	})

	// setup email data with unicode symbols
	let mailOptions = {
		from: '"Francisco Murillo" <caracas.classic@gmail.com>', // sender address
		to: data.email, // list of receivers
		bcc: 'franciscomurillo21@yahoo.es',
		subject: 'Test Mail Node.js', // Subject line
		text: 'Generando envios de mail con Node.js', // plain text body
		html: output // html body
	}

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error)
		}
		else {
		console.log('Message sent: %s', info.messageId)
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
		}
	})
}

module.exports = MailModel