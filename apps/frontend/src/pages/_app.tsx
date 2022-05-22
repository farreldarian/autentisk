import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  apiProvider,
  configureChains,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { chain, createClient, Provider } from "wagmi";
import { Provider as UrqlProvider } from "urql";
import { client as urqlClient } from "../modules/graphql/urql";
import theme from "../theme";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [apiProvider.alchemy("u1p24el2wUqSKUJapyVeH91YDfVok-ur")]
);

const { connectors } = getDefaultWallets({
  appName: "Autentisk",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <UrqlProvider value={urqlClient}>
      <Provider client={client}>
        <RainbowKitProvider chains={chains}>
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
        </RainbowKitProvider>
      </Provider>
    </UrqlProvider>
  );
}

export default MyApp;
