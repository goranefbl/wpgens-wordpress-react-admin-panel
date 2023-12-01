import { UseFormRegister } from 'react-hook-form';

interface SelectFieldProps {
	label: string;
	name: string;
	description?: string;
	disabled?: boolean;
	register?: UseFormRegister<any>;
	error?: string;
	options: { id: number; name: string }[] | { id: string; name: string }[] | undefined;
}

export default function SelectField({ label, register, name, description, disabled, error, options }: SelectFieldProps) {
	return (
		<div className='flex flex-wrap -mx-3 mb-3'>
			<div className={`w-full px-3 mb-3`}>
				<div className='pb-2'>
					<label className='block font-semibold text-sm text-black'>{label}</label>
					{description && <span>{description}</span>}
				</div>
				<div className='relative'>
					{options && options?.length > 0 ? (
						<select
							{...(register ? register(name) : [])}
							className={`block appearance-none capitalize w-full !max-w-full border text-gray-700 pr-8 !py-1 rounded leading-tight focus:outline-none bg-white ${
								error ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
							}`}
							id={name}
							disabled={disabled}
						>
							{options.map((o) => (
								<option key={o.id} value={o.id}>
									{o.name}
								</option>
							))}
						</select>
					) : (
						'Loading...'
					)}
				</div>
				{error && <span className='text-red-500 text-sm'>{error}</span>}
			</div>
		</div>
	);
}
