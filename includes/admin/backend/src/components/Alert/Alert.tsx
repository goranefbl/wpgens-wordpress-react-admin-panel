import { useEffect, useRef, useState } from 'react';

export enum alertMsgType {
	success = 'success',
	error = 'error',
}

type AlertType = {
	message: string;
	type: alertMsgType;
	action?: () => void;
	permament?: boolean;
};

export default function Alert({ message, type, action, permament = false }: AlertType) {
	const [visible, setVisible] = useState(true);
	const timeout = useRef<ReturnType<typeof setInterval>>();

	useEffect(() => {
		if (permament) {
			return;
		}

		timeout.current = setTimeout(() => {
			if (action) {
				action();
			}
			setVisible(false);
		}, 4000);

		return () => {
			clearTimeout(timeout.current);
		};
	}, [action, permament]);

	const runAction = () => {
		setVisible(false);
		if (action) {
			action();
		}
	};

	if (!visible) {
		return null;
	}

	return (
		<div
			className={`inline-flex justify-center items-center z-[99] fixed h-10 w-full bottom-0 left-0 text-center ${
				type === 'success' ? 'bg-green-600' : 'bg-red-400'
			} text-white leading-10`}
		>
			<span>{message}</span>
			{permament && (
				<button type='button' onClick={runAction}>
					<svg
						className='h-6 w-6 ml-6 text-green-50'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'
					>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
					</svg>
				</button>
			)}
		</div>
	);
}
