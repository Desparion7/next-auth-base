import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string(),
	password: z.string().min(1, 'Field can not be empty.'),
});

export const registrationSchema = z
	.object({
		name: z.string().min(1, 'Pole wymagane'),
		email: z.string().email('Nieprawidłowy format maila'),
		password: z.string().min(8, 'Hasło musi zawierać minimum 8 znaków'),
		repeatPassword: z.string(),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Passwords must match',
		path: ['repeatPassword'],
	});

export type TRegistrationSchema = z.infer<typeof registrationSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
