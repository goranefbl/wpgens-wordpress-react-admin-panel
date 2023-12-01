import { UseFormRegister } from 'react-hook-form';

interface TextAreaProps {
	label: string;
	name: string;
	description?: string;
	placeholder?: string;
	disabled?: boolean;
	register: UseFormRegister<any>;
	error?: string;
}

export default function TextArea({ label, register, name, description, placeholder, disabled, error }: TextAreaProps) {
	return (
		<div className='flex flex-wrap -mx-3 mb-3'>
			<div className='relative w-full px-3 mb-3'>
				<div className='pb-2'>
					<label className='block font-semibold text-sm text-black'>{label}</label>
					{description && <span>{description}</span>}
				</div>
				<textarea
					placeholder={placeholder}
					disabled={disabled}
					id={name}
					{...register(name)}
					className={`appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 ${
						description ? 'mb-1' : 'mb-0'
					} leading-relaxed focus:outline-none focus:bg-white focus:border-gray-500`}
				/>
				{error && <span className='text-red-500'>{error}</span>}
			</div>
		</div>
	);
}
