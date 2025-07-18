'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Spinner, themeController } from 'xtreme-ui';
import { DEFAULT_THEME_COLOR } from '#utils/constants/common';

export default function Logout () {
	const router = useRouter();
	const session = useSession();

	useEffect(() => {
		if (session?.status === 'authenticated') {
			localStorage.setItem('logoutData', JSON.stringify({
				role: session?.data?.role,
				restaurant: session?.data?.restaurant?.username,
				table: session?.data?.restaurant?.table,
			}));

			signOut();
		}
		else if (session?.status === 'unauthenticated') {
			try {
				const { role, restaurant, table } = JSON.parse(localStorage.getItem('logoutData') ?? '');
				localStorage.removeItem('logoutData');

				if (role === 'admin' || role === 'kitchen') router.push('/');
				else if (role === 'customer') router.push(`/${restaurant}?table=${table}`);
				else router.push('/');
			}
			catch (err) {
				console.log(err);
				router.push('/');
			}
		}
	}, [router, session]);

	return (
		<>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeController({color: DEFAULT_THEME_COLOR}) }} suppressHydrationWarning />
			</head>
		<body>
			<Spinner fullpage label='Signing out...' />
		</body>
		</>
	);
}
