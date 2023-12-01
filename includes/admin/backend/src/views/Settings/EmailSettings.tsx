/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import InlineError from '@/components/InlineError/InlineError';
import ToggleField from '@/components/Form/ToggleField/ToggleField';
import Alert from '@/components/Alert/Alert';
import InputText from '@/components/Form/InputText/InputText';
import { setGeneralSettings, getGeneralSettings } from '@/services/settings.service';
import TextArea from '@/components/Form/TextArea/TextArea';
import Loader from '@/components/Loader/Loader';

export type EmailSettingsRequest = {
	gens_raf_disable_emails?: boolean;
	gens_raf_use_woo_mail?: boolean;
	gens_raf_email_subject?: string;
	gens_raf_email_heading?: string;
	gens_raf_email_message?: string;
	gens_raf_buyer_email_subject?: string;
	gens_raf_buyer_email_message?: string;

	gens_raf_email_subject_share?: string;
	gens_raf_email_heading_share?: string;
	gens_raf_email_body?: string;
	gens_raf_email_from?: boolean; // ovo ugasiti
	gens_raf_email_hide?: boolean;
};

const schema = yup
	.object()
	.shape({
		gens_raf_disable_emails: yup.boolean().optional(),
		gens_raf_use_woo_mail: yup.boolean().optional(),
		gens_raf_email_subject: yup.string(),
		gens_raf_email_heading: yup.string(),
		gens_raf_email_message: yup.string(),
		gens_raf_buyer_email_subject: yup.string(),
		gens_raf_buyer_email_message: yup.string(),

		gens_raf_email_subject_share: yup.string(),
		gens_raf_email_heading_share: yup.string(),
		gens_raf_email_body: yup.string(),
		gens_raf_email_from: yup.boolean().optional(), // ovo ugasiti
		gens_raf_email_hide: yup.boolean().optional(),
	})
	.required();

export default function EmailSettings() {
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EmailSettingsRequest>({
		resolver: yupResolver(schema),
	});

	const { data: generalSettings, isLoading } = useQuery('wpgens-email-settings', getGeneralSettings);

	useEffect(() => {
		if (generalSettings) {
			reset(generalSettings as EmailSettingsRequest);
		}
	}, [generalSettings]);

	const {
		isSuccess,
		isLoading: submitLoading,
		mutate,
	} = useMutation<any, void, EmailSettingsRequest, () => void>(setGeneralSettings, {
		onSuccess: () => {},
		onError: (err: unknown) => {
			if (err instanceof Error) {
				setError(err?.message);
			} else {
				setError('Something went wrong. Please try again or contact support.');
			}
		},
	});

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
				(err) => setError(JSON.stringify(err)),
			)}
		>
			<header className='mb-8'>
				<h2 className='text-2xl font-bold'>Email Settings</h2>
			</header>
			<div className='flex flex-col md:flex-row mb-8'>
				<div className='md:basis-1/5 mb-2 pr-2'>
					<h3 className='mb-0 font-bold text-lg'>General Settings</h3>
					<span className='text-sm block pr-4'>General Email Settings</span>
				</div>
				<div className='md:basis-4/5'>
					<div className='bg-white p-6 rounded-xl border border-gray-200 mb-4'>
						<ToggleField
							register={register}
							name='gens_raf_disable_emails'
							label='Disable sending of emails'
							description='If you dont want to inform customers of their coupon via email, check this box.'
						/>
						<ToggleField
							register={register}
							name='gens_raf_use_woo_mail'
							label='WooCommerce Template'
							description='Check this to use woo default email template.'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col md:flex-row mb-8'>
				<div className='md:basis-1/5 mb-2 pr-2'>
					<h3 className='mb-0 font-bold text-lg'>Share Email</h3>
					<span className='text-sm block pr-4'>Check the look of the email by sending an email to yourself.</span>
				</div>
				<div className='md:basis-4/5'>
					<div className='bg-white p-6 rounded-xl border border-gray-200 mb-4'>
						<ToggleField
							register={register}
							name='gens_raf_email_hide'
							label='Hide share via email option'
							description='Checking this will remove share via email option.'
						/>
						<InputText
							label='Email Subject'
							description='Subject of an email that is sent when user shares his URL via email. Use {{name}} to show senders name. Use {{friend_name}} to show name of a friend to whom referrer is sending email'
							error={errors.gens_raf_email_subject_share?.message}
							register={register}
							name='gens_raf_email_subject_share'
						/>
						<InputText
							label='Email Headings'
							description='Email headings is shown above body text in bigger fonts. Use {{name}} to show senders name. Use {{friend_name}} to show name of a friend to whom referrer is sending email.'
							error={errors.gens_raf_email_heading_share?.message}
							register={register}
							name='gens_raf_email_heading_share'
						/>
						<TextArea
							label='Email Body'
							description='Body text of the email that is sent when user shares his referral url via email. Use {{name}} to show senders name. Use {{friend_name}} to show name of a friend to whom referrer is sending email.'
							error={errors.gens_raf_email_body?.message}
							register={register}
							name='gens_raf_email_body'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col md:flex-row mb-8'>
				<div className='md:basis-1/5 mb-2 pr-2'>
					<h3 className='mb-0 font-bold text-lg'>Coupon Email</h3>
					<span className='text-sm block pr-4'>Email sent when user earns a coupon code.</span>
				</div>
				<div className='md:basis-4/5'>
					<div className='bg-white p-6 rounded-xl border border-gray-200 mb-4'>
						<InputText
							label='Email Subject'
							description='Enter the subject of email that will be sent when notifiying the user of their coupon code. Use {{name}} to show users name.'
							error={errors.gens_raf_email_subject?.message}
							placeholder='Hey there!'
							register={register}
							name='gens_raf_email_subject'
						/>
						<InputText
							label='Email Headings'
							description='Enter the email headings. It is shown above body text in bigger fonts. Use {{name}} to show users name.'
							placeholder='Hey there!'
							error={errors.gens_raf_email_heading?.message}
							register={register}
							name='gens_raf_email_heading'
						/>
						<TextArea
							label='Email Message'
							description='Text that will appear in email that is sent to user once they get the code. Use {{name}} to show users name. HTML allowed.'
							error={errors.gens_raf_email_message?.message}
							register={register}
							name='gens_raf_email_message'
						/>
					</div>
				</div>
			</div>
			<div className='flex flex-col md:flex-row mb-8'>
				<div className='md:basis-1/5 mb-2 pr-2'>
					<h3 className='mb-0 font-bold text-lg'>Friend Coupon Email</h3>
					<span className='text-sm block pr-4'>This email is sent to a friend only if he is set to receive a coupon AFTER his first purchase.</span>
				</div>
				<div className='md:basis-4/5'>
					<div className='bg-white p-6 rounded-xl border border-gray-200 mb-4'>
						<InputText
							label='Email Subject'
							description='Enter the subject of email that will be sent when notifiying the user of their coupon code. Use {{name}} to show users name.'
							error={errors.gens_raf_buyer_email_subject?.message}
							placeholder='Hey there!'
							register={register}
							name='gens_raf_buyer_email_subject'
						/>
						<TextArea
							label='Email Message'
							description='Text that will appear in email that is sent to user once they get the code. Use {{name}} to show users name. HTML allowed.'
							error={errors.gens_raf_buyer_email_message?.message}
							register={register}
							name='gens_raf_buyer_email_message'
						/>
					</div>
				</div>
			</div>
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
