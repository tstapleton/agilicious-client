import React from 'react';
// import './App.css';
import Router from './Router';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider} from '@shopify/polaris';
import { Link } from './components';

function App() {
	return (
		<AppProvider i18n={enTranslations} linkComponent={Link} features={{ newDesignLanguage: true }}>
			<Router />
		</AppProvider>
	);
}

export default App;
