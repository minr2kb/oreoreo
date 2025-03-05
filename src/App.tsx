import { Suspense } from 'react';
import HomePage from '@/pages/HomePage';
import LoadingPage from '@/pages/LoadingPage';
import ErrorPage from '@/pages/ErrorPage';
import Fonts from '@/theme/Fonts';
import { Toaster } from '@/components/ui/toaster';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import ThemePage from './pages/ThemePage';

const router = createBrowserRouter([
  {
    path: ROUTES.theme,
    element: <ThemePage />,
  },
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    path: `${ROUTES.home}/:id`,
    element: <HomePage />,
  },
]);

function App() {
  const handleError = (error: Error) => {
    console.error('Error in App', error, {
      error,
    });
  };

  return (
    <ChakraProvider defaultTheme="light">
      <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />} onError={handleError}>
        <Suspense fallback={<LoadingPage />}>
          <Toaster />
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
          <Fonts />
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  );
}

export default App;
