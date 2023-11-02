import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/Provider';
import Toast from '@/components/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Centrum logowania',
	description:
		'Przykładowe centrum logowania pozwalajace logować się za pomoca emaila oraz Gmail',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='pl'>
			<AuthProvider>
				<body className={inter.className}>
					<Toast />
					{children}
				</body>
			</AuthProvider>
		</html>
	);
}
