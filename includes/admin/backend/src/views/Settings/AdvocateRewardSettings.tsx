/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import InlineError from '@/components/InlineError/InlineError';
import Alert from '@/components/Alert/Alert';
import { setGeneralSettings, getGeneralSettings } from '@/services/settings.service';
import WooCoupons, { AdvocateRewardSettingsForm, AdvocateRewardSettingsRequest } from '@/components/WooCoupons/WooCoupons';
import { emptyStringToNull } from '@/utils/helpers';
import ToggleField from '@/components/Form/ToggleField/ToggleField';
import Loader from '@/components/Loader/Loader';

const labels = {
	order: {
		title: 'Order Based Reward',
		subtitle: 'With this option, coupon code will be generated after friend makes an order and order is marked as completed.',
	},
	registration: {
		title: 'Registration Based Reward',
		subtitle: 'Choose this option to issue a coupon to the user after their friend registers with the site.',
	},
};

const schema = yup
	.object()
	.shape({
		gens_raf_coupon_type: yup.string(),
		gens_raf_coupon_amount: yup.number(),
		gens_raf_product_ids: yup.array().of(
			yup.object().shape({
				value: yup.number().required(),
				label: yup.string().required(),
			})
		),
		gens_raf_product_exclude_ids: yup.array().of(
			yup.object().shape({
				value: yup.number().required(),
				label: yup.string().required(),
			})
		),
		gens_raf_product_categories: yup.array().of(
			yup.object().shape({
				value: yup.number().required(),
				label: yup.string().required(),
			})
		),
		gens_raf_exclude_product_categories: yup.array().of(
			yup.object().shape({
				value: yup.number().required(),
				label: yup.string().required(),
			})
		),
		gens_raf_coupon_duration: yup.number().transform(emptyStringToNull).nullable(),
		gens_raf_min_order: yup.number().transform(emptyStringToNull).nullable(),
		gens_raf_individual_use: yup.boolean().optional(),
		gens_raf_exclude_sale_items: yup.boolean().optional(),
		gens_raf_free_shipping: yup.boolean().optional(),
		gens_raf_limit_usage: yup.number().transform(emptyStringToNull).nullable(),
		gens_raf_nth_coupon: yup.number().transform(emptyStringToNull).nullable(),
		gens_raf_generate_for_registration: yup.boolean().optional(),
		gens_raf_generate_for_order: yup.boolean().optional(),
	})
	.required();

export default function AdvocateRewardSettings() {
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm<AdvocateRewardSettingsForm>({
		resolver: yupResolver(schema),
	});

	const generateForRegistration = watch('gens_raf_generate_for_registration');
	const generateForOrder = watch('gens_raf_generate_for_order');

	const { data: settings, isLoading }: { data: AdvocateRewardSettingsRequest | undefined; isLoading: boolean } = useQuery(
		'wpgens-coupon-settings',
		getGeneralSettings
	);

	useEffect(() => {
		// Formating product/cats, they are saved as 1,2,3 in DB while we need object{value:x,label:x}
		if (settings) {
			const { gens_raf_product_ids, gens_raf_product_exclude_ids, gens_raf_product_categories, gens_raf_exclude_product_categories, ...rest } = settings;
			const wooProducts = window.pluginName.products;
			const wooCats = window.pluginName.cats;

			const formatted: AdvocateRewardSettingsForm = { ...rest };

			if (formatted) {
				// Format Product IDs
				formatted['gens_raf_product_ids'] =
					settings['gens_raf_product_ids']
						?.split(',')
						.map((id) => ({ value: parseInt(id), label: wooProducts.find((p) => p.value === parseInt(id))?.label || '' })) || [];
				// Format Excluded Product IDs
				formatted['gens_raf_product_exclude_ids'] =
					settings['gens_raf_product_exclude_ids']
						?.split(',')
						.map((id) => ({ value: parseInt(id), label: wooProducts.find((p) => p.value === parseInt(id))?.label || '' })) || [];
				// Format Category IDs
				formatted['gens_raf_product_categories'] =
					settings['gens_raf_product_categories']
						?.split(',')
						.map((id) => ({ value: parseInt(id), label: wooCats.find((p) => p.value === parseInt(id))?.label || '' })) || [];
				// Format Excluded Category IDs
				formatted['gens_raf_exclude_product_categories'] =
					settings['gens_raf_exclude_product_categories']
						?.split(',')
						.map((id) => ({ value: parseInt(id), label: wooCats.find((p) => p.value === parseInt(id))?.label || '' })) || [];

				reset(formatted);
			}
		}
	}, [settings]);

	useEffect(() => {
		if (generateForRegistration) {
			setValue('gens_raf_generate_for_order', false);
		}
	}, [generateForRegistration]);

	useEffect(() => {
		if (generateForOrder) {
			setValue('gens_raf_generate_for_registration', false);
		}
	}, [generateForOrder]);

	const {
		isSuccess,
		mutate,
		isLoading: submitLoading,
	} = useMutation<any, void, AdvocateRewardSettingsForm, () => void>(setGeneralSettings, {
		onSuccess: () => {},
		onError: (err: unknown) => {
			if (err instanceof Error) {
				setError(err?.message);
			} else {
				setError('Something went wrong. Please try again or contact support.');
			}
		},
	});

	const formatBeforeSubmit = (d) => {
		d['gens_raf_product_ids'] = d['gens_raf_product_ids'].map((v) => v.value).join(',');
		d['gens_raf_product_exclude_ids'] = d['gens_raf_product_exclude_ids'].map((v) => v.value).join(',');
		d['gens_raf_product_categories'] = d['gens_raf_product_categories'].map((v) => v.value).join(',');
		d['gens_raf_exclude_product_categories'] = d['gens_raf_exclude_product_categories'].map((v) => v.value).join(',');
		mutate(d);
	};

	if (isLoading) {
		return (
			<div className='text-center'>
				<Loader />
				<div>Loading Screen...</div>
			</div>
		);
	}

	return (
		<form className='max-w-5xl px-6' onSubmit={handleSubmit(formatBeforeSubmit, (err) => console.log(err))}>
			<header className='mb-8'>
				<h2 className='text-2xl font-bold'>Advocate Reward</h2>
				<span className='text-sm block mt-1'>
					A coupon that is awarded to the user that referred a friend. Coupon is issued <strong>AFTER</strong> order is marked as completed.
				</span>
			</header>
			<div className='flex flex-col mb-8'>
				<div className='flex flex-col justify-between items-center bg-white p-6 rounded-xl border border-gray-200 mb-4 w-full'>
					<ToggleField register={register} name='gens_raf_generate_for_order' label={labels.order.title} description={labels.order.subtitle} />
					<ToggleField
						register={register}
						name='gens_raf_generate_for_registration'
						label={labels.registration.title}
						description={labels.registration.subtitle}
					/>
				</div>
			</div>
			{(generateForRegistration || generateForOrder) && (
				<div className='flex flex-col mb-8'>
					<div className=' mb-2 pr-2'>
						<h3 className='mb-0 font-bold text-lg'>{generateForOrder ? labels.order.title : labels.registration.title}</h3>
						<span className='text-sm block pr-4'>{generateForOrder ? labels.order.subtitle : labels.registration.subtitle}</span>
					</div>
					<div className='bg-white p-6 rounded-xl border border-gray-200 mb-4 w-full'>
						<WooCoupons
							type='advocate'
							subscriptionActive={!!settings?.gens_raf_subscription}
							errors={errors}
							register={register}
							control={control}
						/>
					</div>
				</div>
			)}
			{isSuccess && <Alert message='Settings Saved.' type='success' />}
			{error && <InlineError error={error} />}
			<div className='text-right'>
				<button type='submit' disabled={submitLoading} className='btn-primary mt-2'>
					Save
				</button>
			</div>
		</form>
	);
}
