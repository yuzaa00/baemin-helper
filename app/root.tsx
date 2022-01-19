import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction } from 'remix';
import { globalCss } from '@dano-inc/stitches-react';

export const meta: MetaFunction = () => {
  return { title: 'Baemin Helper' };
};

const resetStyle = globalCss({
  body: { padding: 0, margin: 0 },

  a: {
    textDecoration: 'none',
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
    fontFamily: `'Noto Sans KR', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    letterSpacing: '-0.01em',
  },
});

export default function App() {
  resetStyle();

  return (
    <html lang='ko'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
