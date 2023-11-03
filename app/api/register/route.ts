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
				{ error: 'User with email already exists' },
				{ status: 501 }
			);
		}
		if (existUserName) {
			return NextResponse.json(
				{ error: 'Username already exists' },
				{ status: 502 }
			);
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ email, password: hashedPassword, username: name });
		return NextResponse.json(
			{ message: 'User registered.' },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'An error occurred while registering the user.' },
			{ status: 500 }
		);
	}
}
