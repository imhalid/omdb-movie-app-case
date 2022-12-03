import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className="dark:bg-gray-300 bg-neutral-100 h-screen
       selection:bg-blue-100/30 selection:text-blue-500
       dark:selection:bg-blue-300/10 dark:selection:text-blue-400
       "
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
