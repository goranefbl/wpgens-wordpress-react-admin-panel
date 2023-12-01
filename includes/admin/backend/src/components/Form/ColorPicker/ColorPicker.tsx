import { ChromePicker } from 'react-color';
import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { ColorResult } from 'react-color';

interface ColorPickerProps {
	title: string;
	color: string;
	setColor: (c: ColorResult) => void;
}
export default function ColorPicker({ color, setColor, title }: ColorPickerProps) {
	const containerRef = useRef(null);
	const [colorPicker, setColorPicker] = useState(false);
	useClickOutside(containerRef, () => {
		setColorPicker(false);
	});

	return (
		<div className='flex flex-wrap -mx-3 mb-6'>
			<div className='w-full px-3'>
				<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{title}</label>
				<div className='flex items-center' ref={containerRef}>
					<input
						disabled
						value={color}
						className='appearance-none w-36 block text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						name='primaryColor'
						type='text'
					/>
					<div className='color-picker'>
						<span
							role='presentation'
							className='color-picker-trigger'
							unselectable='on'
							style={{
								opacity: 1,
								backgroundColor: color,
							}}
							onClick={() => setColorPicker(!colorPicker)}
						/>
						<div className='color-picker-popup'>{colorPicker && <ChromePicker disableAlpha color={color} onChange={(c) => setColor(c)} />}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
