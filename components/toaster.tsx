import { Toaster } from 'react-hot-toast';

const Toast = () => {
	return (
		<div>
			<Toaster
				toastOptions={{
					className: 'text-center',
					duration: 3000,
					position: 'top-center',
					style: {
						background: 'rgb(255,255,255)',
						color: 'rgb(0,0,0)',
						padding: '16px',
						border: '2px solid var(--error-color)',
					},
					success: {
						iconTheme: {
							primary: 'var(--mainColor)',
							secondary: 'rgb(255,255,255)',
						},
						style: {
							border: '2px solid var(--mainColor)',
						},
					},
				}}
			/>
		</div>
	);
};

export default Toast;
