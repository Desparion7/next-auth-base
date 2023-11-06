'use client';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/button';
import { signin } from '@/utils/singin';
import Input from '@/components/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, TLoginSchema } from '@/utils/zodTypes';

const Logowanie = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		try {
			const response = await signin(email, password);
			if (response?.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<TLoginSchema>({
		resolver: zodResolver(loginSchema),
	});
	return (
		<main className='flex min-h-screen flex-col items-center p-24 gap-3'>
			<h1 className='text-4xl mb-5 uppercase font-semibold'>Logowanie</h1>
			<form
				onSubmit={submitHandler}
				className='flex flex-col text-center'
			>
				<Input
					label={'Email'}
					type={'email'}
					name={'email'}
					register={register('email')}
					errorMessage={errors.email?.message}
				/>
				<Input
					label={'Hasło'}
					type={'password'}
					name={'password'}
					register={register('password')}
					errorMessage={errors.password?.message}
				/>
				<Button
					text={'Zaloguj się'}
					penddingText={'Logowanie...'}
					loading={isLoading}
				/>
				<p className='mt-3 text-lg'>
					Nie masz konta?{' '}
					<Link
						href='/rejestracja'
						className='text-blue-600 font-semibold hover:text-blue-800 transition-all'
					>
						Utwórz konto.
					</Link>{' '}
				</p>
			</form>
		</main>
	);
};

export default Logowanie;
