import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
	const { email, password } = await req.json();

	try {
		await connectToDB();
		const existUser = await User.findOne({ email });
		if (existUser) {
			return NextResponse.json(
				{ message: 'User already exists' },
				{ status: 500 }
			);
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ email, password: hashedPassword });
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
