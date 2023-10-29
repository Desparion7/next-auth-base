'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

type ButtonPropsType = {
	text: string;
	penddingText: string;
};

const Button = ({ text, penddingText }: ButtonPropsType) => {
	const { pending } = useFormStatus();
	return (
		<button
			type='submit'
			className='mt-5 p-3 bg-gradient-to-b from-blue-700 to-blue-900 rounded-lg hover:text-green-500 transition font-semibold'
			disabled={pending}
		>
			{pending ? penddingText : text}
		</button>
	);
};

export default Button;
