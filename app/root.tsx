import { ToastContainer } from '@dano-inc/design-system';
import { globalCss } from '@dano-inc/stitches-react';
import { useLayoutEffect } from 'react';
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction } from 'remix';

export const links: LinksFunction = () => {
  return [
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
    title: '배민 헬퍼',
    description: '웹에서 손쉽게 메뉴를 공유해보세요!',
    keywords: '배달의 민족, 배민',
    'og:title': '배민 헬퍼',
    'og:description': '웹에서 손쉽게 메뉴를 공유해보세요!',
    'og:image': '/images/baemin-helper.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': '배민 헬퍼',
  };
};

const resetStyle = globalCss({
  body: { padding: 0, margin: 0 },

  a: {
    textDecoration: 'none',
    all: 'unset',
  },

  'html, body': {
    minHeight: '100vh',
  },

  button: {
    background: 'none',
    padding: 'none',
    border: 'none',
  },

  '*': {
    fontFamily:
      `'Noto Sans KR', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    letterSpacing: '-0.01em',
  },
});

export default function App() {
  resetStyle();

  useLayoutEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
  });

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', 'G-6KWFTN3DEJ');
  `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2107785439138018"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <ToastContainer />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
