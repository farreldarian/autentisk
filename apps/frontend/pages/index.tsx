import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { isNil } from "lodash";
import Head from "next/head";
import { useMemo } from "react";

export default function Home() {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const connected = useMemo(() => !isNil(account), [account]);

  return (
    <div>
      <Head>
        <title>Authentic NFT Marketplace</title>
        <meta name="description" content="AI-Driven NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Box>
          <Heading>Authentic NFT Marketplace</Heading>
          {connected ? (
            <Box>
              <Button onClick={() => deactivate()}>Disconnect</Button>

              <Text>Address: {account}</Text>
              <Text>
                Balance: {etherBalance ? formatEther(etherBalance) : "0"} ETH
              </Text>
            </Box>
          ) : (
            <Button onClick={() => activateBrowserWallet()}>
              Connect Wallet
            </Button>
          )}
        </Box>
      </main>
    </div>
  );
}
