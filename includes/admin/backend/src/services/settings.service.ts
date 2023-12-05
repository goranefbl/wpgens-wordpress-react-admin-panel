import apiFetch from '@wordpress/api-fetch';
import { GeneralSettingsRequest } from '@/views/Settings/GeneralSettings';

export const setGeneralSettings = (data: GeneralSettingsRequest) =>
	apiFetch({ path: '/settings', method: 'POST', data }).then((posts) => {
		console.log(posts);
	});

export const getGeneralSettings = () => apiFetch<GeneralSettingsRequest | []>({ path: `/settings/` }).then((response) => response);
