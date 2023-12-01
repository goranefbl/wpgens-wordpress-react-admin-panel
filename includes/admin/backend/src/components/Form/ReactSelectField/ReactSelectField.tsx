import { Control, Controller, UseFormRegister } from 'react-hook-form';
import ReactSelect from 'react-select';

export type ReactSelectType = {
	readonly value: string;
	readonly label: string;
	readonly isFixed?: boolean;
	readonly isDisabled?: boolean;
};

interface ReactSelectFieldProps {
	label: string;
	name: string;
	description?: string;
	disabled?: boolean;
	control: Control<any>;
	register: UseFormRegister<any>;
	error?: string;
	options: ReactSelectType[] | undefined;
}

export default function ReactSelectField({ label, control, name, description, error, options }: ReactSelectFieldProps) {
	return (
		<div className='flex flex-wrap -mx-3 mb-3'>
			<div className={`w-full px-3 ${description ? 'mb-1' : 'mb-3'}`}>
				<label className='block font-semibold text-sm text-black'>{label}</label>
				<div className='relative'>
					<Controller
						name={name}
						control={control}
						render={({ field: { onChange, value, ref } }) => (
							<ReactSelect
								ref={ref}
								onChange={(val) => onChange(val?.value)}
								defaultValue={value}
								className={`capitalize ${error ? 'border-red-500' : 'border-gray-200'}`}
								options={options}
							/>
						)}
						rules={{ required: true }}
					/>
					{error && <span className='text-red-500 text-sm'>{error}</span>}
					{description && <p className='text-gray-600 text-sm italic mt-2'>{description}</p>}
				</div>
			</div>
		</div>
	);
}
