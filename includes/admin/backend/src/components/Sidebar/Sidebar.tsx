import { Dispatch, SetStateAction } from 'react';
import Footer from './components/Footer';
import Logo from './components/Logo';
import MenuItem from './components/MenuItem';

import DashboardSVG from '@/components/Icons/DashboardSVG';
import InvoiceSVG from '@/components/Icons/InvoiceSVG';
import SettingsSVG from '@/components/Icons/SettingsSVG';
import LinkSVG from '@/components/Icons/LinkSVG';
import UserSVG from '@/components/Icons/UserSVG';

import { Pages } from '@/App';

type SidebarProps = {
	sidebarVisible: boolean;
	page: Pages;
	setPage: Dispatch<SetStateAction<any>>;
};

export default function Sidebar({ sidebarVisible, setPage, page }: SidebarProps) {
	const settingsSubmenu = [
		{ title: 'General Settings', slug: Pages.SettingsGeneral },
		// { title: 'Display Settings', slug: Pages.SettingsDisplay },
	];

	return (
		<div className={`${sidebarVisible ? 'block absolute z-10' : 'hidden'} lg:block w-72 min-h-screen bg-[#344054] text-white border-r-white border-r`}>
			<div className='mt-6 h-full overflow-y-auto w-72'>
				<Logo />
				<ul className='px-5 mb-4'>
					<MenuItem page={page} setPage={setPage} isActive={page === Pages.Posts} title={Pages.Posts} Image={DashboardSVG} />
					<MenuItem page={page} setPage={setPage} isActive={page === Pages.Users} title={Pages.Users} Image={UserSVG} />
					<MenuItem
						page={page}
						setPage={setPage}
						isActive={page === Pages.Settings}
						title={Pages.Settings}
						Image={SettingsSVG}
						submenu={settingsSubmenu}
					/>
					<MenuItem page={page} setPage={setPage} isActive={page === Pages.Licence} title={Pages.Licence} Image={InvoiceSVG} />
					<MenuItem
						page={page}
						setPage={setPage}
						isActive={page === Pages.WPGensPlugins}
						title={Pages.WPGensPlugins}
						Image={LinkSVG}
						link='https://wpgens.com/#plugins'
					/>
				</ul>
				<Footer />
			</div>
		</div>
	);
}
