import { ChakraProvider } from "@chakra-ui/react";
import { DAppProvider } from "@usedapp/core";
import useDAppConfig from "../lib/web3/usedapp-config";

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={useDAppConfig}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
