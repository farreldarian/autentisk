import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core";
import Head from "next/head";
import useDAppConfig from "../lib/web3/usedapp-config";

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: "Work Sans, sans-serif",
      body: "Work Sans, sans-serif",
    },
  });
  return (
    <DAppProvider config={useDAppConfig}>
      <ChakraProvider theme={theme}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
