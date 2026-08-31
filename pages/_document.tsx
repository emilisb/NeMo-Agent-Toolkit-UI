import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';

import { APPLICATION_UI_NAME } from '@/constants';

import i18nextConfig from '../next-i18next.config';


type Props = DocumentProps & {
  // add custom document props
};

export default function Document(props: Props) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-title"
          content={APPLICATION_UI_NAME}
        ></meta>
        <script async src="/__ENV.js" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var s = localStorage.getItem('settings');
              if (s) {
                var parsed = JSON.parse(s);
                if (parsed.theme === 'dark') {
                  parsed.theme = 'light';
                  localStorage.setItem('settings', JSON.stringify(parsed));
                }
              }
            } catch(e) {}
          })();
        `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
