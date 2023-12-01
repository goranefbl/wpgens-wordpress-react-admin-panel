import { Pages } from '@/App';
import { Dispatch, SetStateAction } from 'react';

type SubMenuItemProps = {
    title: string;
    slug: Pages;
    page: Pages;
    setPage: Dispatch<SetStateAction<any>>;
};

export default function SubMenuItem({ title, slug, setPage, page }: SubMenuItemProps) {
    function handleClick() {
        setPage(slug);
    }

    return (
        <button className={`relative h-10 ml-10 px-4 py-2 text-sm flex items-center transition ${slug === page ? ' text-orange-400' : 'hover:underline'} rounded-lg`} onClick={handleClick} key={slug}>
            <div className="absolute -left-4">
                <span className={`w-2 h-2 rounded-full block mr-5 ${slug === page ? 'bg-orange-400' : 'bg-gray-200'}`}></span>
            </div>
            {title}
        </button>
    );
}
