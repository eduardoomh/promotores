import '../styles/globals.css'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import AppLayout from '../layouts/AppLayout';
import GlobalContextProvider from '../context/GlobalContextProvider';
import { usePathname } from 'next/navigation'

export default function App({ Component, pageProps }: AppProps) {
  const pathname = usePathname()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader)
        loader.style.display = 'none';
    }
  }, []);

  useEffect(() =>{
    console.log(pathname)
  },[pathname])

  return (
    <AppLayout>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </AppLayout>
  )
}
