import apiFetch from '@wordpress/api-fetch';
import { useState } from 'react';
import './assets/css/index.css';
import MainLayout from './components/MainLayout/MainLayout';
import GeneralSettings from './views/Settings/GeneralSettings';
import Licence from './views/Licence/Licence';
import Posts from './views/Posts/Posts';
import Users from './views/Users/Users';

export enum Pages {
	Posts = 'Posts',
	Users = 'Users',
	Settings = 'Settings',
	SettingsGeneral = 'SettingsGeneral',
	SettingsDisplay = 'SettingsDisplay',
	Licence = 'Automatic Updates',
	WPGensPlugins = 'WPGens Plugins',
}

apiFetch.use(apiFetch.createRootURLMiddleware(window.pluginName?.root));
apiFetch.use(apiFetch.createNonceMiddleware(window.pluginName?.apiNonce));

function App() {
	const [page, setPage] = useState(Pages.Posts);

	return (
		<MainLayout page={page} setPage={setPage}>
			{page === Pages.Posts && <Posts />}
			{page === Pages.Users && <Users />}
			{page === Pages.SettingsGeneral && <GeneralSettings />}
			{page === Pages.Licence && <Licence />}
		</MainLayout>
	);
}

export default App;
