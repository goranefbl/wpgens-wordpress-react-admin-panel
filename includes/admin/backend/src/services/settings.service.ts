import apiFetch from '@wordpress/api-fetch';
import { GeneralSettingsRequest } from '@/views/Settings/GeneralSettings';

type Settings = GeneralSettingsRequest | [];

export const setGeneralSettings = (data: Settings) =>
	apiFetch({ path: '/settings', method: 'POST', data }).then((posts) => {
		console.log(posts);
	});

export const getGeneralSettings = () => apiFetch<Settings>({ path: `/settings/` }).then((response) => response);
