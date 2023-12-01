import apiFetch from '@wordpress/api-fetch';
import { LicenceRequest } from '../views/Licence';

type GetLicenseResponse = {
	gens_raf_license_key: string;
	message: string;
};

export type SetLicenseResponse = {
	status: string;
	message: string;
};

export type DeactivateLicenseResponse = {
	message: string;
};

apiFetch.use(apiFetch.createRootURLMiddleware(window.pluginName?.root));
apiFetch.use(apiFetch.createNonceMiddleware(window.pluginName?.apiNonce));

export const setLicence = (data: LicenceRequest) => apiFetch<SetLicenseResponse>({ path: '/license', method: 'POST', data }).then((response) => response);

export const getLicence = () => apiFetch<GetLicenseResponse>({ path: `/license` }).then((response) => response);

export const deactivateLicence = () => apiFetch<DeactivateLicenseResponse>({ path: '/license/deactivate', method: 'POST' }).then((response) => response);
