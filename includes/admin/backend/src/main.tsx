/* eslint-disable no-var */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5000,
			refetchOnWindowFocus: false,
			retry: 2,
		},
	},
});

interface GensRafObject {
	root: string;
	apiNonce: string;
	cats: { value: number; label: string }[];
	products: { value: number; label: string }[];
}

declare global {
	var pluginName: GensRafObject;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);