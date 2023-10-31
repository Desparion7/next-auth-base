import { signIn } from 'next-auth/react';

export const signin = async (email: string, password: string) => {
	const res = await signIn('credentials', {
		email,
		password,
		redirect: false,
	});
	return res;
};
