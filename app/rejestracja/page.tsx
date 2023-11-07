'use client';
import Button from '@/components/button';
import Link from 'next/link';
import { signUp } from '@/utils/signup';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { TRegistrationSchema, registrationSchema } from '@/utils/zodTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/input';

export default function Rejestracja() {
	const submitHandler = async (data: TRegistrationSchema) => {
		try {
			const response = await signUp(data.email, data.password, data.name);
			if (response.ok) {
				toast.success('Konto użytkownika zostało utworzone');
				reset();
			}
			if (response.status === 501) {
				toast.error('Użytkownik o podanym mailu już istnieje!');
			}
			if (response.status === 502) {
				toast.error('Użytkownik o podanej nazwie już istnieje!');
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
		<main className='flex min-h-screen flex-col items-center justify-center p-24 gap-3'>
			<h1 className='text-4xl mb-5 uppercase font-semibold'>
				Rejestracja
			</h1>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className='flex flex-col text-center'
			>
				<Input
					label='Nazwa użytkownika'
					type='text'
					name='name'
					register={register('name')}
					errorMessage={errors.name?.message}
				/>
				<Input
					label='Email'
					type='email'
					name='email'
					register={register('email')}
					errorMessage={errors.email?.message}
				/>
				<Input
					label='Hasło'
					type='password'
					name='password'
					register={register('password')}
					errorMessage={errors.password?.message}
				/>
				<Input
					label='Powtórz hasło'
					type='password'
					name='repeatPassword'
					register={register('repeatPassword')}
					errorMessage={errors.repeatPassword?.message}
				/>
				<Button
					text={'Utwórz konto'}
					penddingText={'Rejestracja...'}
					loading={isSubmitting}
				/>
				<p className='mt-3 text-lg text-black'>
					Mam konto.{' '}
					<Link
						href='/logowanie'
						className='text-blue-600 font-semibold hover:text-blue-800 transition'
					>
						Zaloguj się
					</Link>{' '}
				</p>
			</form>
		</main>
	);
}
