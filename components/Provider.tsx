'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type AuthProviderType = {
	children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderType) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
