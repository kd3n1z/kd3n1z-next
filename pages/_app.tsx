import Menu from '@/components/Menu';
import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {
    const [loading, setLoading] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    
    useEffect(() => {
        const start = () => {
            setLoading(true);
        }
        
        const end = () => {
            setLoading(false);
        }

        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);

        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        }
    }, [])
  
    return (
        <>
            <Menu opened={menuOpened} setOpenState={setMenuOpened}/>
            <AnimatePresence mode='wait' initial={false}>
                {loading ? '' : <Component {...pageProps} key={router.asPath}/>}
            </AnimatePresence>
        </>
    );
}
