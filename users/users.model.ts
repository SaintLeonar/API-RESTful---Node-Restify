import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
	name: string;
	email: string;
	password: string;
}

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

export const User = mongoose.model<User>('User', userSchema);
