import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().min(1, 'Pole wymagane.'),
	password: z.string().min(1, 'Pole wymagane.'),
});

export const registrationSchema = z
	.object({
		name: z.string().min(1, 'Pole wymagane.'),
		email: z.string().email('Nieprawidłowy format maila.'),
		password: z.string().min(8, 'Hasło musi zawierać minimum 8 znaków.'),
		repeatPassword: z
			.string()
			.min(8, 'Hasło musi zawierać minimum 8 znaków.'),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: 'Hasła muszą do siebie pasować',
		path: ['repeatPassword'],
	});

export type TRegistrationSchema = z.infer<typeof registrationSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
