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
        className="bg-hero-pattern bg-cover bg-center bg-no-repeat bg-slate-900  h-screen
       selection:bg-blue-100/30 selection:text-blue-500
       "
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
