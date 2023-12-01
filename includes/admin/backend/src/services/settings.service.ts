import apiFetch from '@wordpress/api-fetch';
import { GeneralSettingsRequest } from '@/views/Settings/GeneralSettings';
import { DisplaySettingsRequest } from '@/views/Settings/DisplaySettings';
import { EmailSettingsRequest } from '@/views/Settings/EmailSettings';
import { FraudSettingsRequest } from '@/views/Settings/FraudSettings';
import { AdvocateRewardSettings, FriendRewardSettings, FriendRewardSettingsRequest } from '@/components/WooCoupons/WooCoupons';

apiFetch.use(apiFetch.createRootURLMiddleware(window.pluginName?.root));
apiFetch.use(apiFetch.createNonceMiddleware(window.pluginName?.apiNonce));

type Settings =
	| AdvocateRewardSettings
	| GeneralSettingsRequest
	| DisplaySettingsRequest
	| EmailSettingsRequest
	| FraudSettingsRequest
	| FriendRewardSettings
	| FriendRewardSettingsRequest;

export const setGeneralSettings = (data: Settings) =>
	apiFetch({ path: '/settings', method: 'POST', data }).then((posts) => {
		console.log(posts);
	});

export const getGeneralSettings = () => apiFetch<Settings>({ path: `/settings/` }).then((response) => response);
