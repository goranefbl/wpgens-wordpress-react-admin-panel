import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import InlineError from '@/components/InlineError/InlineError';
import Alert, { alertMsgType } from '@/components/Alert/Alert';
import InputText from '@/components/Form/InputText/InputText';
import { setGeneralSettings, getGeneralSettings } from '@/services/settings.service';
import ToggleField from '@/components/Form/ToggleField/ToggleField';
import { emptyStringToNull } from '@/utils/helpers';
import Loader from '@/components/Loader/Loader';

export type GeneralSettingsRequest = {
	my_plugin_disable?: boolean;
	my_plugin_hide_no_orders_text?: string;
	my_plugin_cookie_time?: number | null;
	my_plugin_min_ref_order?: number | null;
	my_plugin_cookie_remove?: boolean;
	my_plugin_allow_guests?: boolean;
	my_plugin_hide_no_orders?: boolean;
	my_plugin_referral_codes?: boolean;
	my_plugin_subscription?: boolean;
	my_plugin_subscription_all_coupons?: boolean;
	my_plugin_subscription_exclude_shipping?: boolean;
};

const schema = yup
	.object()
	.shape({
		my_plugin_disable: yup.boolean().optional(),
		my_plugin_hide_no_orders_text: yup.string(),
		my_plugin_cookie_time: yup.number().transform(emptyStringToNull).nullable(),
		my_plugin_min_ref_order: yup.number().transform(emptyStringToNull).nullable(),
		my_plugin_cookie_remove: yup.boolean().optional(),
		my_plugin_allow_guests: yup.boolean().optional(),
		my_plugin_hide_no_orders: yup.boolean().optional(),
		my_plugin_referral_codes: yup.boolean().optional(),
		my_plugin_subscription: yup.boolean().optional(),
		my_plugin_subscription_all_coupons: yup.boolean().optional(),
		my_plugin_subscription_exclude_shipping: yup.boolean().optional(),
	})
	.required();

export default function GeneralSettings() {
	const [expand, setExpand] = useState(false);
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<GeneralSettingsRequest>({
		resolver: yupResolver(schema),
	});

	const { data: generalSettings, isLoading } = useQuery('wpgens-general-settings', getGeneralSettings);

	const {
		isSuccess,
		isLoading: submitLoading,
		mutate,
	} = useMutation<any, void, GeneralSettingsRequest, () => void>(setGeneralSettings, {
		onSuccess: () => {},
		onError: (err: unknown) => {
			if (err instanceof Error) {
				setError(err?.message);
			} else {
				setError('Something went wrong. Please try again or contact support.');
			}
		},
	});

	useEffect(() => {
		if (generalSettings && !Array.isArray(generalSettings)) {
			reset(generalSettings);
		}
	}, [generalSettings]);

	if (isLoading) {
		return (
			<div className='text-center'>
				<Loader />
				<div>Loading Screen...</div>
			</div>
		);
	}

	return (
		<form
			className='max-w-5xl px-6'
			onSubmit={handleSubmit(
				(d) => mutate(d),
				(err) => console.log(err)
			)}
		>
			<header className='mb-8'>
				<h2 className='text-2xl font-bold'>General Settings</h2>
			</header>
			<div className='flex flex-col md:flex-row mb-8'>
				<div className='md:basis-1/5 mb-2 pr-2'>
					<h3 className='mb-0 font-bold text-lg'>Program Status</h3>
				</div>
				<div className='md:basis-4/5'>
					<div className='flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 mb-4 w-full'>
						<ToggleField
							register={register}
							name='my_plugin_disable'
							label='Disable Referral Program'
							description='Check to disable. Referral program will be hidden, links and codes wont work.'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col md:flex-row mb-8'>
				<div className='md:basis-1/5 mb-2 pr-2'>
					<h3 className='mb-0 font-bold text-lg'>General Settings</h3>
					<span className='text-sm block pr-4'>Refer a Friend General Settings</span>
				</div>
				<div className='md:basis-4/5'>
					<div className='bg-white p-6 rounded-xl border border-gray-200 mb-4'>
						<ToggleField
							register={register}
							name='my_plugin_referral_codes'
							label='Enable Referral Codes'
							description='By default user can invite friend via link. With this option, user can invite friend with referral code as well. Their friend will insert them as a coupons to get defined discount.'
						/>
						<ToggleField
							register={register}
							name='my_plugin_allow_guests'
							label='Enable referral links for guests'
							description='If checked, guests will be able to get referral links as well. This works in shortcode and product tabs.'
						/>
						<ToggleField
							register={register}
							name='my_plugin_hide_no_orders'
							label='Hide referral link for users without any orders'
							description='If checked, users that dont have at least a single order wont see their referral code and link.'
						/>
						<InputText
							label='No orders text'
							placeholder='Referral code is available only to users with at least one order.'
							description='Text that appears instead of a referral link for users that dont have any orders. If you chose to hide link from them. Place something like: Referral code is available only to users with at least one order.'
							error={errors.my_plugin_hide_no_orders_text?.message}
							register={register}
							name='my_plugin_hide_no_orders_text'
						/>
						{!expand && (
							<div className='block text-right'>
								<button onClick={() => setExpand(true)} className='text-blue-500 hover:no-underline underline text-sm'>
									Show advance options
								</button>
							</div>
						)}
						{expand && (
							<>
								<InputText
									label='Cookie Time'
									type='number'
									placeholder='7'
									description='How long should user be counted as referral before it expires.(In days) Leave default for 7.'
									error={errors.my_plugin_cookie_time?.message}
									register={register}
									name='my_plugin_cookie_time'
								/>
								<InputText
									label='Minimum referral order'
									type='number'
									placeholder='0'
									description='Set how much someone needs to purchase in order to generate coupon for referral. Leave empty for 0'
									error={errors.my_plugin_min_ref_order?.message}
									register={register}
									name='my_plugin_min_ref_order'
								/>
								<ToggleField
									register={register}
									name='my_plugin_cookie_remove'
									label='Delete Cookie after Purchase'
									description='If checked, cookie will be deleted after customer makes a purchase.'
								/>
							</>
						)}
						{expand && (
							<div className='block text-right'>
								<button onClick={() => setExpand(false)} className='text-blue-500 hover:no-underline underline text-sm'>
									Show less options
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='flex flex-col md:flex-row mb-8'>
				<div className='md:basis-1/5 mb-2 pr-2'>
					<h3 className='mb-0 font-bold text-lg'>WooCommerce Subscription</h3>
					<span className='text-sm block pr-4'>Specify the landing page for your referral links.</span>
				</div>
				<div className='md:basis-4/5'>
					<div className='bg-white p-6 rounded-xl border border-gray-200 mb-4'>
						<ToggleField
							register={register}
							name='my_plugin_subscription'
							label='Enable Integration'
							description='Check this to enable auto applying of coupons to subscription renewal. Works with payment gateways that support recurring total modifications.'
						/>
						<ToggleField
							register={register}
							name='my_plugin_subscription_all_coupons'
							label='Apply All Coupons'
							description='Checking this means that the plugin will automatically apply all of the users available coupons (if he has more than one) during the next renewal, up to renewal price. If
                        he has more coupons than renewal price, they will be passed to be used during the next renewal period.'
						/>
						<ToggleField
							register={register}
							name='my_plugin_subscription_exclude_shipping'
							label='Exclude Shipping'
							description='Check this box if you want to exclude shipping from being discounted in Woo Subscription renewals. This only applies to renewals.'
						/>
					</div>
				</div>
			</div>
			{isSuccess && <Alert message='Settings Saved.' type={alertMsgType.success} />}
			{error && <InlineError error={error} />}
			<div className='text-right'>
				<button type='submit' disabled={submitLoading} className='btn-primary mt-2'>
					Save
				</button>
			</div>
		</form>
	);
}
