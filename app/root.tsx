import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { cssBundleHref } from '@remix-run/css-bundle';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
} from '@remix-run/react';
import React, { useEffect } from 'react';
import { Toaster } from '~/components/ui/toaster';
import styles from './tailwind.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'use-credentials',
    },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      sizes: '192x192',
      href: '/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      sizes: '512x512',
      href: '/android-chrome-512x512.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
  ];
};

export const meta: MetaFunction = () => {
  return {
    title: '배민 메뉴판',
    description: '웹에서 손쉽게 메뉴를 공유해보세요!',
    keywords: '배달의 민족, 배민',
    'og:title': '배민 메뉴판',
    'og:description': '웹에서 손쉽게 메뉴를 공유해보세요!',
    'og:image': '/images/baemin-helper.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': '배민 메뉴판',
  };
};

function Document({
  children,
  title,
}: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <Links />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {
          /* <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        /> */
        }
        {
          /* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2107785439138018"
          crossOrigin="anonymous"
        /> */
        }
        <Meta />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      // gtag.pageview(url);
    };
    handleRouteChange(location.pathname + location.search);
  }, [location]);

  return (
    <Document>
      <Toaster />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title="Uh-oh!">
      {caught.status === 404
        && (
          <>
            <h2 style={{ textAlign: 'center' }}>
              앗😓
            </h2>
            <h4
              style={{
                textAlign: 'center',
              }}
            >
              여긴 아무것도 없어요
            </h4>
          </>
        )}
    </Document>
  );
}

export function ErrorBoundary(error: any) {
  console.error({ error });
  return (
    <Document title="Uh-oh!">
      <h2 style={{ textAlign: 'center' }}>
        앗🙀
      </h2>
      <h4 style={{ textAlign: 'center' }}>
        잠시 후에 다시 들어와주시겠어요?
      </h4>
    </Document>
  );
}
