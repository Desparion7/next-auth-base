'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import Link from 'next/link';
import { signUp } from '@/utils/signup';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { TRegistrationSchema, registrationSchema } from '@/utils/zodTypes';

export default function Rejestracja() {
	const submitHandler = async (data: TRegistrationSchema) => {
		const response = await signUp(data.email, data.password, data.name);
		const responseData = await response.json();

		if (response.ok) {
			toast.success('Konto użytkownika zostało utworzone.');
			reset();
		}
		if (responseData.error) {
			if (response.status === 501) {
				toast.error(responseData.error);
				setError('email', {
					type: 'server',
					message: responseData.error,
				});
			} else if (response.status === 502) {
				toast.error(responseData.error);
				setError('name', {
					type: 'server',
					message: responseData.error,
				});
			} else if (response.status === 500) {
				toast.error(responseData.error);
			} else {
				toast.error(responseData.error);
			}
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError,
	} = useForm<TRegistrationSchema>({
		resolver: zodResolver(registrationSchema),
	});

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24 gap-3'>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className='flex flex-col text-center'
			>
				<motion.div
					initial={{ opacity: 0, y: -200 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						ease: 'linear',
					}}
				>
					<h1 className='text-4xl mb-10 uppercase font-semibold'>
						Rejestracja
					</h1>

					<Input
						label='Email'
						type='email'
						name='email'
						register={register('email')}
						errorMessage={errors.email?.message}
					/>
					<Input
						label='Nazwa użytkownika'
						type='text'
						name='name'
						register={register('name')}
						errorMessage={errors.name?.message}
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
				</motion.div>
				<motion.div
					className='w-[100%]'
					initial={{ opacity: 0, y: 200 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						ease: 'linear',
					}}
				>
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
				</motion.div>
			</form>
		</main>
	);
}
