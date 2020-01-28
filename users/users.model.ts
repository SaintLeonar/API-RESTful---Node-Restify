import * as mongoose from 'mongoose';

/*
	DEFINIÇÃO DAS PROPRIEDADES DO RECURSO /USER
*/
const userSchema = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true // Indica que todo email deve ser único
	},
	password: {
		type: String,
		select: false
	}
});

export const User = mongoose.model('User', userSchema);
