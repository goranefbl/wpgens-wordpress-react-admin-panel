import { useState } from 'react';
import './assets/index.css';
import MainLayout from './components/MainLayout/MainLayout';
import GeneralSettings from './views/Settings/GeneralSettings';
import DisplaySettings from './views/Settings/DisplaySettings';
import Licence from './views/Licence/Licence';
import Orders from './views/Orders/Orders';
import Advocates from './views/Advocates/Advocates';

export enum Pages {
	Orders = 'Orders',
	Advocates = 'Advocates',
	Settings = 'Settings',
	SettingsGeneral = 'SettingsGeneral',
	SettingsDisplay = 'SettingsDisplay',
	Licence = 'Automatic Updates',
	WPGensPlugins = 'WPGens Plugins',
}

function App() {
	const [page, setPage] = useState(Pages.Orders);

	return (
		<MainLayout page={page} setPage={setPage}>
			{page === Pages.Orders && <Orders />}
			{page === Pages.Advocates && <Advocates />}
			{page === Pages.SettingsGeneral && <GeneralSettings />}
			{page === Pages.SettingsDisplay && <DisplaySettings />}
			{page === Pages.Licence && <Licence />}
		</MainLayout>
	);
}

export default App;
