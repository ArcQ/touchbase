import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useGoogleAnalytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
