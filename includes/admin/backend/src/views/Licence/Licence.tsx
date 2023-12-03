import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import InlineError from '@/components/InlineError/InlineError';
import InputText from '@/components/Form/InputText/InputText';
import { SetLicenseResponse, deactivateLicence, getLicence, setLicence } from '@/services/licence.service';
import Loader from '@/components/Loader/Loader';

export type LicenceRequest = {
	license_key: string;
};

const schema = yup
	.object()
	.shape({
		license_key: yup.string().required(),
	})
	.required();

export default function Licence() {
	const [status, setStatus] = useState('');
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LicenceRequest>({
		resolver: yupResolver(schema),
	});

	const queryClient = useQueryClient();
	const { data: license, isLoading } = useQuery('wpgens-license', getLicence);

	useEffect(() => {
		if (license) {
			reset(license);
			setStatus(license?.message);
		}
	}, [license]);

	const { mutate, isLoading: licenceLoading } = useMutation<any, void, LicenceRequest, () => void>(setLicence, {
		onSuccess: (response: SetLicenseResponse) => {
			setStatus(response.message);
		},
		onError: (err: unknown) => {
			console.log('ee', err);
			if (err instanceof Error) {
				setError(err?.message);
			} else {
				setError('Something went wrong. Please try again or contact support.');
			}
		},
	});

	async function deactivateLicense() {
		const response = await deactivateLicence();
		if (response.message === 'deactivated') {
			setStatus('Your license is not active for this URL.');
			queryClient.invalidateQueries({ queryKey: ['wpgens-license'] });
		}
	}

	const isValidLicense = status === 'License key is valid.';

	return (
		<form className='max-w-5xl px-6' onSubmit={handleSubmit((d) => mutate(d))}>
			<header className='mb-8'>
				<h2 className='text-2xl font-bold'>Enable Updates</h2>
				<span className='text-sm block mt-1'>
					Thanks for supporting our work! Add your licence below to enable updates from your site's Plugins page. You can find license key under
					account purchase history.
				</span>
			</header>
			<div className='flexasd md:fadslex-row mb-8'>
				<div className=' bg-white p-6 rounded-xl border border-gray-200 mb-4 w-full'>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<InputText
								label='Licence Key'
								placeholder=''
								description=''
								error={errors.license_key?.message}
								register={register}
								name='license_key'
							/>

							{status && (
								<span
									className={`text-center text-white font-semibold bg-green-700 block h-9 leading-[36px] rounded-lg ${
										isValidLicense ? `bg-green-700` : `bg-red-700`
									}`}
								>
									{status}
								</span>
							)}
						</>
					)}
				</div>
			</div>
			{error && <InlineError error={error} />}
			<div className='text-right'>
				{license?.license_key && (
					<button type='button' className='text-red-500 mr-12 underline' onClick={deactivateLicense}>
						Deactivate Site
					</button>
				)}
				<button type='submit' disabled={isLoading || licenceLoading} className='btn-primary mt-2'>
					Save
				</button>
			</div>
		</form>
	);
}
