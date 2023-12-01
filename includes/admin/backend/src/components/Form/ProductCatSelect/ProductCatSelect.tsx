import Select from 'react-select';

import { Control, Controller } from 'react-hook-form';
import { AdvocateRewardSettingsForm, FriendRewardSettingsForm } from '@/components/WooCoupons/WooCoupons';

type WooApiTerms =
	| 'gens_raf_product_ids'
	| 'gens_raf_product_exclude_ids'
	| 'gens_raf_product_categories'
	| 'gens_raf_exclude_product_categories'
	| 'gens_raf_friend_product_ids'
	| 'gens_raf_friend_product_exclude_ids'
	| 'gens_raf_friend_product_categories'
	| 'gens_raf_friend_exclude_product_categories';

interface ProductCatSelectProps {
	label: string;
	name: WooApiTerms;
	description?: string;
	control: Control<AdvocateRewardSettingsForm | FriendRewardSettingsForm>;
	disabled?: boolean;
	error?: string;
}

export default function ProductCatSelect({ label, name, description, error, control }: ProductCatSelectProps) {
	const isCategory = name.includes('categories');

	const wooCategories = window.pluginName.cats;

	const wooProducts = window.pluginName.products;

	return (
		<div className='flex flex-wrap -mx-3 mb-3'>
			<div className={`w-full px-3 ${description ? 'mb-1' : 'mb-3'}`}>
				<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{label}</label>
				<div className='relative'>
					<Controller
						name={name}
						control={control}
						render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
							<Select
								isMulti
								options={isCategory ? wooCategories : wooProducts}
								className={`${error && 'border-red-500'}`}
								name=''
								ref={ref}
								value={value}
								onBlur={onBlur}
								onChange={onChange}
							/>
						)}
					/>
					{error && <span className='text-red-500 text-sm'>{error}</span>}
					{description && <p className='text-gray-600 text-sm italic mt-2'>{description}</p>}
				</div>
			</div>
		</div>
	);
}
