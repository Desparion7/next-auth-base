import React from 'react';
import Link from 'next/link';
import Button from '@/components/button';

const Logowanie = () => {
	return (
		<main className='flex min-h-screen flex-col items-center p-24 gap-3'>
			<h1 className='text-4xl'>Logowanie</h1>
			<form action=''>
				<div className='flex flex-col'>
					<label htmlFor='name' className='py-2'>
						Nazwa użytkownika/ Email:
					</label>
					<input
						type='name'
						name='name'
						id='name'
						className='text-black p-2 rounded-xl outline-green-500'
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
					/>
				</div>
				<Button text={'Zaloguj się'} penddingText={'Logowanie...'} />
				<p className='mt-3'>
					Nie masz konta?{' '}
					<Link
						href='/'
						className='text-blue-600 font-semibold hover:text-blue-400 transition'
					>
						Utwórz konto
					</Link>{' '}
				</p>
			</form>
		</main>
	);
};

export default Logowanie;
