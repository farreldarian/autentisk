import { Config, Rinkeby } from '@usedapp/core'

const useDAppConfig: Config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]:
      'https://eth-rinkeby.alchemyapi.io/v2/cN-U-aabNb0s2S9H8QklAnM_-GriV9n-',
  },
}

export default useDAppConfig
