import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { Pages } from '@/App';

type MainLayoutProps = {
	children: ReactNode;
	page: Pages;
	setPage: Dispatch<SetStateAction<any>>;
};

export default function MainLayout({ children, setPage, page }: MainLayoutProps) {
	const [sidebarVisible, setSidebarVisible] = useState(false);

	const showLicenceNotification = false; // In case you want to give a missing licence key warning.

	return (
		<div className='absolute top-0 right-0 left-0 bottom-0 z-10'>
			<div className='flex -ml-5 -mt-5 text-[#6b7280]'>
				<Sidebar sidebarVisible={sidebarVisible} page={page} setPage={setPage} />
				<div className={`lg:w-[calc(100%-288px)] flex-1 bg-gray-50 ${sidebarVisible && 'ml-72 absolute w-full'} min-w-0`}>
					<Header setSidebarVisible={setSidebarVisible} />
					<div className='pt-7 pb-14 px-8'>{children}</div>
				</div>
				{showLicenceNotification && (
					<div
						className={`inline-flex justify-center items-center z-50 fixed h-10 w-full bottom-0 left-0 text-center bg-orange-400 text-white leading-10`}
					>
						<span>
							Add Your Licence key here:{' '}
							<a href='https://wpgens.com/docs/how-to-enable-auto-updates/' className='underline' target='_blank' rel='noreferrer'>
								Learn more
							</a>
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
