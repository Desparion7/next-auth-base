'use client';
import Button from '@/components/button';
import Link from 'next/link';
import { signUp } from '@/utils/signup';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { TRegistrationSchema, registrationSchema } from '@/utils/zodTypes';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Rejestracja() {

	const submitHandler = async (data: TRegistrationSchema) => {
		try {
			const response = await signUp(data.email, data.password, data.name);
			if (response.ok) {
				toast.success('Konto użytkownika zostało utworzone');
				reset();
			}
			if (response.status === 501) {
				toast.error('Użytkownik o podanym emailu już istnieje');
			}
			if (response.status === 502) {
				toast.error('Użytkownik o podanej nazwie już istnieje');
			}
			if (response.status === 500) {
				toast.error('Coś poszło nie tak!');
			}
		} catch (error) {
			console.log(error);
			toast.error('Coś poszło nie tak!');
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TRegistrationSchema>({
		resolver: zodResolver(registrationSchema),
	});

	return (
		<main className='flex min-h-screen flex-col items-center p-24 gap-3'>
			<h1 className='text-4xl'>Rejestracja</h1>
			<form onSubmit={handleSubmit(submitHandler)}>
				<div className='flex flex-col'>
					<label htmlFor='name' className='py-2'>
						Nazwa użytkownika:
					</label>
					<input
						{...register('name')}
						type='text'
						id='name'
						className={`text-black p-2 rounded-xl border placeholder:text-red-500 ${
							errors.name ? 'border-red-500' : 'border-gray-200'
						}`}
						placeholder={`${errors.name ? 'Pole wymagane' : ''}`}
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='email' className='py-2'>
						Email:
					</label>
					<input
						{...register('email')}
						type='email'
						name='email'
						id='email'
						className={`text-black p-2 rounded-xl outline-green-500 ${
							errors.email
								? 'border-gray-200'
								: 'outline-red-500 '
						}`}
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='password' className='py-2'>
						Hasło:
					</label>
					<input
						{...register('password')}
						type='password'
						name='password'
						id='password'
						className={`text-black p-2 rounded-xl outline-green-500 ${
							errors.password
								? 'border-gray-200'
								: 'outline-red-500 '
						}`}
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='repeatPassword' className='py-2'>
						Powtórz hasło:
					</label>
					<input
						{...register('repeatPassword')}
						type='password'
						name='repeatPassword'
						id='repeatPassword'
						className={`text-black p-2 rounded-xl outline-green-500 ${
							errors.repeatPassword
								? 'border-gray-200'
								: 'outline-red-500 '
						}`}
					/>
				</div>
				<Button
					text={'Utwórz konto'}
					penddingText={'Rejestracja...'}
					loading={isSubmitting}
				/>
				<p className='mt-3'>
					Mam konto.{' '}
					<Link
						href='/logowanie'
						className='text-blue-600 font-semibold hover:text-blue-400 transition'
					>
						Zaloguj się
					</Link>{' '}
				</p>
			</form>
		</main>
	);
}
