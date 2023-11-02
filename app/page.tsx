'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
	const { data: session } = useSession();
	if (!session) redirect('/logowanie');
	return (
		<main className='flex min-h-screen flex-col items-center p-24 gap-3'>
			<h1>Welcome !!!</h1>
		</main>
	);
}
