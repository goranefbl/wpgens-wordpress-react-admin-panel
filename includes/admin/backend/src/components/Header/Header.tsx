import { Dispatch, SetStateAction } from 'react';

type HeaderProps = {
	setSidebarVisible: Dispatch<SetStateAction<boolean>>;
};

export function Header({ setSidebarVisible }: HeaderProps) {
	return (
		<section className='py-5 px-8'>
			<nav className='relative'>
				<div className='flex items-center justify-between'>
					<div className='flex lg:hidden'>
						<button className='flex items-center' onClick={() => setSidebarVisible((prev) => !prev)}>
							<svg
								className='text-blue-500 bg-gray-100 block h-8 w-8 p-2 rounded'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
							>
								<title>Mobile menu</title>
								<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
							</svg>
						</button>
					</div>
				</div>
			</nav>
		</section>
	);
}
