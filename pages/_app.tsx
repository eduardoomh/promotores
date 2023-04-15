import '../styles/globals.css'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import AppLayout from '../layouts/AppLayout';
import GlobalContextProvider from '../context/GlobalContextProvider';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.style.display = 'none';
    }
  }, []);

  return (
    <AppLayout>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </AppLayout>
  )
}
