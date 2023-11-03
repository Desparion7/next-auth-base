'use client';
import { FormEvent, useState } from 'react';
import Button from '@/components/button';
import Link from 'next/link';
import { signUp } from '@/utils/signup';
import { toast } from 'react-hot-toast';

export default function Rejestracja() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;

		try {
			const response = await signUp(email, password, name);
			if (response.ok) {
				toast.success('You account created.');
			}
			if (response.status === 501) {
				toast.error('User with email already exists');
			}
			if (response.status === 502) {
				toast.error('User with name already exists');
			}
			if (response.status === 500) {
				toast.error('Something go wrong!');
			}
		} catch (error) {
			console.log(error);
			toast.error('Something go wrong!');
		}
		setIsLoading(false);
	};
	return (
		<main className='flex min-h-screen flex-col items-center p-24 gap-3'>
			<h1 className='text-4xl'>Rejestracja</h1>
			<form onSubmit={submitHandler}>
				<div className='flex flex-col'>
					<label htmlFor='name' className='py-2'>
						Nazwa użytkownika:
					</label>
					<input
						type='name'
						name='name'
						id='name'
						className='text-black p-2 rounded-xl outline-green-500'
						required
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='email' className='py-2'>
						Email:
					</label>
					<input
						type='email'
						name='email'
						id='email'
						className='text-black p-2 rounded-xl outline-green-500'
						required
					/>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='password' className='py-2'>
						Hasło:
					</label>
					<input
						type='password'
						name='password'
						id='password'
						className='text-black p-2 rounded-xl outline-green-500'
						required
					/>
				</div>
				<Button
					text={'Utwórz konto'}
					penddingText={'Rejestracja...'}
					loading={isLoading}
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
