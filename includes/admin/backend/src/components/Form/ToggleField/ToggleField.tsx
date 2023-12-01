/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from 'react-hook-form';

interface InputTextProps {
	label: string;
	name: string;
	description?: string;
	disabled?: boolean;
	register?: UseFormRegister<any>;
	error?: string;
}

export default function ToggleField({ label, register, name, description, disabled, error }: InputTextProps) {
	return (
		<div className='flex justify-between items-center mb-6 w-full'>
			<div className='pr-12'>
				<label className='block font-semibold text-sm text-black'>{label}</label>
				{description && <span>{description}</span>}
			</div>
			<div>
				<label className='relative inline-flex items-center cursor-pointer'>
					<input disabled={disabled} id={name} {...(register ? register(name) : [])} type='checkbox' className='sr-only peer' />
					<div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
				</label>
				{error && <span className='text-red-500 text-sm'>{error}</span>}
			</div>
		</div>
	);
}
