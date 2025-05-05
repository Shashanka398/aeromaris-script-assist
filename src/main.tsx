import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useLocalStorage } from '@mantine/hooks';
import { lightTheme, darkTheme } from './theme/theme';
import { useThemeStore } from './store/theme.store';
import App from './App';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ShipsList from './pages/ShipsList/ShipsList';
import ShipDetail from './pages/ShipDetail/ShipDetail';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound/NotFound';

export const routes = [
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/ships',
				element: (
					<ProtectedRoute>
						<ShipsList />
					</ProtectedRoute>
				)
			},
			{
				path: '/ships/:id',
				element: (
					<ProtectedRoute>
						<ShipDetail />
					</ProtectedRoute>
				)
			},
			{
				path: '/privacy',
				element: <div>Privacy Policy</div>
			},
			{
				path: '/terms',
				element: <div>Terms of Service</div>
			}
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});

const ThemeApp = () => {
	const themeMode = useThemeStore((state) => state.mode);
	const setThemeMode = useThemeStore((state) => state.setMode);
	
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: themeMode,
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) => {
		const newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(newColorScheme);
		setThemeMode(newColorScheme);
	};

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={colorScheme === 'dark' ? darkTheme : lightTheme}
				withGlobalStyles
				withNormalizeCSS
			>
				<QueryClientProvider client={queryClient}>
					<Notifications />
					<RouterProvider router={router} />
				</QueryClientProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<ThemeApp />
	</StrictMode>
);
