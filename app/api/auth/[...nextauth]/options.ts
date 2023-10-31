import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '@/utils/database';
import bcrypt from 'bcrypt';
import User from '@/models/user';

export const options: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Your Email',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				if (!credentials || !email || !password) return null;

				try {
					await connectToDB();
					const user = await User.findOne({ email });
					if (!user) {
						return null;
					}
					const passwordMatch = await bcrypt.compare(
						password,
						user.password
					);
					if (!passwordMatch) {
						return null;
					}
					return user;
				} catch (error) {
					console.log(error);
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
};
