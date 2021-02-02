import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  /* New styles */
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  // Deixa branco no começo
  color: ${({ theme }) => theme.colors.contrastText};
}
html, body {
  min-height: 100vh;
}
#__next {
  flex: 1;
  display: flex;
  flex-direction: column;
}
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

        <title>Cycling Quiz</title>
        <link rel="shortcut icon" href="/favcycle.ico" />
        <meta name="title" content="Cycling Quiz" />
        <meta name="description" content="Um quiz sobre bicicletas pra ver o quanto você é pedaluda ou pedaludo!" />

        {/* Open Graph / Facebook */}
        <meta name="viewport" />
        <meta property="og:image" content={db.bg} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Cycling Quiz" />
        <meta property="og:description" content="Um quiz sobre bicicletas pra ver o quanto você é pedaluda ou pedaludo!" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Cycling Quiz" />
        <meta property="twitter:description" content="Um quiz sobre bicicletas pra ver o quanto você é pedaluda ou pedaludo!" />
        <meta property="twitter:image" content={db.bg} />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
