'use strict'

const	mongoose = require('mongoose'),
		bcrytp = require('bcrypt-nodejs'),
		Schema = mongoose.Schema,
		userSchema = new Schema({
			email: { type: String, unique: true, lowercase: true, required:true },
			password: { type: String, required: true },
			nombre: { type: String, required: true },
			sexo: { type: String, required: true },
			avatar: { type: String, required: true }
		},{
			timestamps : true
		})

userSchema.pre('save', function (next) {
	const user = this;
	if(!user.isModified('password')){
		return next()
	}
	
	bcrytp.genSalt(10, (err, salt) => {
		if(err){
			next(err)
		}
		bcrytp.hash(user.password, salt, null, (err, hash) => {
			if(err){
				next()
			}
			user.password = hash
			next()
		})
	})
})

userSchema.methods.compararPassword = function (password, cb) {
	bcrytp.compare(password, this.password, (err, sonIguales) =>{
		if (err) {
			return cb(err)
		}
		cb(null, sonIguales)
	})
}

module.exports = mongoose.model('User', userSchema)