import { Web3Provider } from 'helpers/context/web3Context';

import 'react-toastify/dist/ReactToastify.css';

import 'styles/tailwind.css';
import 'styles/base.css';

import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Footer from 'pageComponents/home/Footer';
import storageService from 'services/firebase/storageService';
import { AppStateProvider, useAppStateContext } from 'helpers/context/appContext';
import NavComponent from 'components/NavComponent';
import firebaseService from 'services/firebaseService';
import ErrorBoundary from 'components/ErrorBoundary';
import authService from 'services/firebase/authService';
import CustomCookieConsent from 'components/atoms/CustomCookieConsent';
import backendApiClient from 'services/backendApiClient';
import Toast from 'components/atoms/Toast';
import HeadTag from 'components/atoms/HeadTag';
import useGoogleAnalytics from 'helpers/hooks/useGoogleAnalytics';

firebaseService.init();
authService.init();
storageService.init();
backendApiClient.init();
const queryClient = new QueryClient();

const Noop = ({ children }) => <>{children}</>;

const AppStateWrapper = Component => props => {
  const { isAppContextLoading, myUser } = useAppStateContext();
  return (
    <>
      <Component {...props} />
    </>
  );
};

function App({ Component, pageProps }) {
  useGoogleAnalytics();
  const PageContextProvider = Component.provider || Noop;
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  const handlePageClick = e => {
    if (!e.target.matches('.dropdown-button')) {
      setShowDropdownMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handlePageClick);
    return () => {
      window.removeEventListener('click', handlePageClick);
    };
  }, []);

  return (
    <>
      <HeadTag title="Foldable: Play to Earn" description="New website" />
      <div className="bg-black text-charcoal5">
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <AppStateProvider>
              <Web3Provider>
                <PageContextProvider>
                  <Toast />
                  <NavComponent
                    showDropdownMenu={showDropdownMenu}
                    setShowDropdownMenu={setShowDropdownMenu}
                  />
                  <Component {...pageProps} />
                  <Footer />
                  <CustomCookieConsent />
                </PageContextProvider>
              </Web3Provider>
            </AppStateProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
