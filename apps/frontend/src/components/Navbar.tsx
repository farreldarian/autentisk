import { Button, Flex, Heading, HStack } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { isNil } from 'lodash'
import Link from 'next/link'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

const Navbar = () => {
  const { data: account } = useAccount()

  const connected = useMemo(() => !isNil(account?.address), [account?.address])

  return (
    <Flex
      align='center'
      justify={'space-between'}
      bg='#F7FAFC60'
      position='sticky'
      top={0}
      height='20'
      px='24'
      borderBottom='1px'
      borderColor={'whiteAlpha.500'}
      backdropFilter='blur(16px)'
      zIndex={10}
    >
      <Heading letterSpacing={1} size='lg' mr='6'>
        <Link href='/'>Autentisk</Link>
      </Heading>

      <HStack spacing={'6'}>
        {connected && (
          <Link href='/mint' passHref>
            <Button>Create</Button>
          </Link>
        )}

        <ConnectButton showBalance={false} />
      </HStack>
    </Flex>
  )
}

export default Navbar
