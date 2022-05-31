import { Button, Flex, Heading } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { isNil } from 'lodash'
import NextLink from 'next/link'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

const Navbar = () => {
  const { data: account } = useAccount()

  const connected = useMemo(() => !isNil(account?.address), [account?.address])

  return (
    <Flex
      align='center'
      justify={'space-between'}
      bg='#F7FAFC50'
      position='sticky'
      top={0}
      height='20'
      px='24'
      // borderBottom='1px'
      // borderColor={'whiteAlpha.500'}
      backdropFilter='blur(24px)'
      zIndex={10}
    >
      <Heading letterSpacing={1} size='lg' mr='6'>
        <NextLink href='/'>Autentisk</NextLink>
      </Heading>

      <Flex align='center' gap='6'>
        <NextLink href='/mint/activity' passHref>
          <Button colorScheme={'blackAlpha'} variant='ghost' color='black'>
            Activity
          </Button>
        </NextLink>

        {connected && (
          <NextLink href='/mint' passHref>
            <Button>Create</Button>
          </NextLink>
        )}

        <ConnectButton showBalance={false} />
      </Flex>
    </Flex>
  )
}

export default Navbar
