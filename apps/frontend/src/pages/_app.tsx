import { ChakraProvider } from '@chakra-ui/react'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { Provider as UrqlProvider } from 'urql'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { client as urqlClient } from '../modules/graphql/urql'
import theme from '../theme'

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: 'u1p24el2wUqSKUJapyVeH91YDfVok-ur' })]
)

const { connectors } = getDefaultWallets({
  appName: 'Autentisk',
  chains,
})

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <UrqlProvider value={urqlClient}>
        <WagmiConfig client={client}>
          <SWRConfig
            value={{
              fetcher: (resource, init) =>
                fetch(resource, init).then((res) => res.json()),
            }}
          >
            <RainbowKitProvider chains={chains} showRecentTransactions>
              <ChakraProvider theme={theme}>
                <Component {...pageProps} />
              </ChakraProvider>
            </RainbowKitProvider>
          </SWRConfig>
        </WagmiConfig>
      </UrqlProvider>
    </RecoilRoot>
  )
}

export default MyApp
