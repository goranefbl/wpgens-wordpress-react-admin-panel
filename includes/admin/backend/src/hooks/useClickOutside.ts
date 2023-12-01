import { MutableRefObject, useEffect } from 'react';

const useClickOutside = (ref: MutableRefObject<HTMLElement | null>, handler: Function) => {
	useEffect(() => {
		const trigger = (e: any) => {
			if (!ref?.current?.contains(e.target)) handler();
		};

		document.addEventListener('click', trigger);
		return () => document.removeEventListener('click', trigger);
	}, [handler, ref]);
};

export default useClickOutside;
