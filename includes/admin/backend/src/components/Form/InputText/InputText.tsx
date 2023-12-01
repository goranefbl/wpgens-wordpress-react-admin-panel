/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from 'react-hook-form';

interface InputTextProps {
	label: string;
	name: string;
	placeholder?: string;
	description?: string;
	disabled?: boolean;
	register?: UseFormRegister<any>;
	error?: string | null;
	value?: string;
	className?: string;
	type?: 'text' | 'email' | 'password' | 'number';
}

export default function InputText({ label, register, name, description, disabled, error, type, placeholder, value, className }: InputTextProps) {
	/* When register is not passed, its just dummy input field, we use it for disabled inputs that cant be changed */
	return (
		<div className='flex flex-wrap -mx-3 mb-3'>
			<div className={`relative w-full px-3 mb-3`}>
				<div className='pb-2'>
					<label className='block font-semibold text-sm text-black'>{label}</label>
					{description && <span>{description}</span>}
				</div>
				{register ? (
					<input
						{...register(name)}
						placeholder={placeholder || label}
						className={`appearance-none block w-full ${
							disabled ? 'text-gray-400' : 'text-gray-700'
						} border rounded !py-3 !px-4 !leading-tight focus:outline-none focus:bg-white ${
							error ? 'border-red-500' : '!border-gray-300 !focus:border-blue-500'
						} ${className}`}
						id={name}
						disabled={disabled}
						step='0.01'
						min={0}
						type={type ? type : 'text'}
					/>
				) : (
					<input
						placeholder={placeholder || label}
						className={`appearance-none block w-full ${
							disabled ? 'text-gray-400' : 'text-gray-700'
						} border rounded !py-3 !px-4 !leading-tight focus:outline-none focus:bg-white ${
							error ? 'border-red-500' : '!border-gray-300 !focus:border-blue-500'
						} ${className}`}
						value={value}
						id={name}
						step='0.01'
						min={0}
						disabled={disabled}
						type={type ? type : 'text'}
					/>
				)}
				{error && <span className='text-red-500 text-sm'>{error}</span>}
			</div>
		</div>
	);
}
