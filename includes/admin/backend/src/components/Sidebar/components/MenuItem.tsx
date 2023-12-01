import { ComponentType, Dispatch, SetStateAction, useState } from 'react';
import SubMenuItem from './SubMenuItem';
import { Pages } from '@/App';

type MenuItemProps = {
	title: Pages;
	isActive: boolean;
	Image: ComponentType;
	page: Pages;
	setPage: Dispatch<SetStateAction<any>>;
	link?: string;
	submenu?: { title: string; slug: Pages }[];
};

export default function MenuItem({ title, Image, link, submenu, isActive, setPage, page }: MenuItemProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const expandMenu = () => {
		if (link) {
			return window.open(link);
		}
		if (!submenu) {
			setPage(title);
			return;
		} else {
			setPage(submenu[0].slug);
		}
		setIsExpanded(!isExpanded);
	};

	return (
		<li className='my-1'>
			<button
				className={`relative h-12 px-4 py-2 text-sm flex w-full items-center transition ${
					isActive ? 'bg-[#475467] text-orange-400 font-semibold' : 'hover:bg-[#475467]'
				} rounded-lg`}
				onClick={expandMenu}
			>
				<div className='mr-4'>
					<Image />
				</div>
				{title}
				{submenu && (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink='http://www.w3.org/1999/xlink'
						aria-hidden='true'
						role='img'
						className={`absolute right-3 ${isExpanded && 'rotate-90'}`}
						width='18px'
						height='18px'
						viewBox='0 0 24 24'
					>
						<g id='iconifyReact6147'>
							<g id='iconifyReact6148'>
								<path
									id='iconifyReact6149'
									fill='currentColor'
									d='M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19Z'
								></path>
							</g>
						</g>
					</svg>
				)}
			</button>
			{submenu && isExpanded && (
				<div className='flex flex-col'>
					{submenu.map((item) => (
						<SubMenuItem setPage={setPage} page={page} key={item.title} isActive={page === item.slug} title={item.title} slug={item.slug} />
					))}
				</div>
			)}
		</li>
	);
}
