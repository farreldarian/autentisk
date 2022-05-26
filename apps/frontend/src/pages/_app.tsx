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
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";

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
    <RecoilRoot>
      <UrqlProvider value={urqlClient}>
        <Provider client={client}>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            <RainbowKitProvider chains={chains}>
              <ChakraProvider theme={theme}>
                <Component {...pageProps} />
              </ChakraProvider>
            </RainbowKitProvider>
          </SWRConfig>
        </Provider>
      </UrqlProvider>
    </RecoilRoot>
  );
}

export default MyApp;
