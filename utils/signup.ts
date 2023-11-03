export const signUp = async (email: string, password: string, name: string) => {
	const res = await fetch('/api/register', {
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
			name,
		}),
	});
	return res;
};
