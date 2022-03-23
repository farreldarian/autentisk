import { Search2Icon } from "@chakra-ui/icons"
import { Box, Button, DefaultIcon, Flex, Heading, HStack, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"
import { formatEther } from "ethers/lib/utils"
import { useEtherBalance, useEthers } from "@usedapp/core";
import { isNil } from "lodash";
import { useMemo } from "react";

const Navbar = () => {
    const { activateBrowserWallet, account, deactivate } = useEthers();
    const etherBalance = useEtherBalance(account);
    const connected = useMemo(() => !isNil(account), [account]);

    return (
        <Box padding='5' paddingLeft='70'>
        <HStack spacing='24px'>
            <Heading letterSpacing={2}>Autentisk</Heading>
            <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                  children={<Search2Icon/>}
                />
                  <Input placeholder='Search Collection, Specific Art or User' />
            </InputGroup>
            <Button>
              About
            </Button>
            {connected ? (
              <Box>
                <Flex>
                  <Button onClick={() => deactivate()}>Disconnect</Button>
                  <Box>
                    <Text>Address: {account}</Text>
                    <Text>
                      Balance: {etherBalance ? formatEther(etherBalance) : "0"} ETH
                    </Text>
                  </Box>
                  <Button><a href="/mint">Create</a></Button>
                </Flex>
              </Box>
            ) : (
              <Button onClick={() => activateBrowserWallet()}>
                Connect Wallet
              </Button>
            )}
          </HStack>
          </Box>
    )
}

export default Navbar;