import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
	email: {
		type: String,
		unique: [true, 'Email already exists!'],
		required: [true, 'Email is required!'],
	},
	username: {
		type: String,
		unique: [true, 'Username already taken!'],
	},
	password: {
		type: String,
		require: true,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
	image: {
		type: String,
	},
});
// Hash the password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next;
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		throw error;
	}
});
// Compare password method
userSchema.methods.comparePassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw error;
	}
};

const User = models.User || model('User', userSchema);

export default User;
