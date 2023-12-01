import { useState } from 'react';
import './assets/index.css';
import MainLayout from './components/MainLayout/MainLayout';
import GeneralSettings from './views/Settings/GeneralSettings';
import DisplaySettings from './views/Settings/DisplaySettings';
import EmailSettings from './views/Settings/EmailSettings';
import Licence from './views/Licence';
import Orders from './views/Orders/Orders';
import Advocates from './views/Advocates/Advocates';

export enum Pages {
	Orders = 'Orders',
	Advocates = 'Advocates',
	Events = 'Event Logs',
	Settings = 'Settings',
	SettingsGeneral = 'SettingsGeneral',
	SettingsCoupon = 'SettingsCoupon',
	FriendReward = 'FriendReward',
	SettingsDisplay = 'SettingsDisplay',
	SettingsEmail = 'SettingsEmail',
	SettingsFraud = 'SettingsFraud',
	Licence = 'Automatic Updates',
	WPGensPlugins = 'WPGens Plugins',
}

function App() {
	const [page, setPage] = useState(Pages.Orders);

	return (
		<MainLayout page={page} setPage={setPage}>
			{page === Pages.SettingsGeneral && <GeneralSettings />}
			{page === Pages.SettingsDisplay && <DisplaySettings />}
			{page === Pages.SettingsEmail && <EmailSettings />}
			{page === Pages.Licence && <Licence />}
			{page === Pages.Orders && <Orders />}
			{page === Pages.Advocates && <Advocates />}
		</MainLayout>
	);
}

export default App;
