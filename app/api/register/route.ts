import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
	const { email, password, name } = await req.json();

	try {
		await connectToDB();
		const existUserName = await User.findOne({ username: name });
		const existUserEmail = await User.findOne({ email });
		if (existUserEmail) {
			return NextResponse.json(
				{ error: 'Użytkownik o podanym mailu już istnieje.' },
				{ status: 501 }
			);
		}
		if (existUserName) {
			return NextResponse.json(
				{ error: 'Użytkownik o podanej nazwie już istnieje.' },
				{ status: 502 }
			);
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ email, password: hashedPassword, username: name });
		return NextResponse.json(
			{ message: 'Użytkownik zarejestrowany' },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Wystąpił problem podczas rejstracji' },
			{ status: 500 }
		);
	}
}
