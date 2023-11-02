import { Toaster } from 'react-hot-toast';

const Toast = () => {
	return (
		<div>
			<Toaster
				toastOptions={{
					className: 'text-center',
					duration: 3000,
					position: 'top-right',
					style: {
						background: 'rgb(255,255,255)',
						color: 'rgb(0,0,0)',
						padding: '16px',
						border: '2px solid var(--mainColor)',
					},
					success: {
						iconTheme: {
							primary: 'var(--mainColor)',
							secondary: 'rgb(255,255,255)',
						},
					},
				}}
			/>
		</div>
	);
};

export default Toast;
