import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Hamburger from 'hamburger-react'
import { isNil } from 'lodash'
import NextLink from 'next/link'
import { useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

const Navbar = () => {
  const { address } = useAccount()

  const connected = useMemo(() => !isNil(address), [address])
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Flex
      align='center'
      justify={'space-between'}
      bg='#F7FAFC50'
      position='sticky'
      top={0}
      height='20'
      px={{ base: '6', md: '12', lg: '24' }}
      backdropFilter='blur(24px)'
      zIndex={10}
    >
      <Heading letterSpacing={1} size='lg' mr='6'>
        {isMobile ? (
          <NextLink href='/'>A.</NextLink>
        ) : (
          <NextLink href='/'>Autentisk</NextLink>
        )}
      </Heading>

      <Flex align='center' gap='6'>
        <ConnectButton showBalance={false} />

        {isMobile ? (
          <Hamburger toggled={drawerOpen} toggle={setDrawerOpen} />
        ) : (
          <>
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
          </>
        )}
      </Flex>

      {isMobile && (
        <Drawer
          isOpen={drawerOpen}
          placement='bottom'
          onClose={() => setDrawerOpen(false)}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Flex flexDir={'column'} p='6' gap='3'>
              <NextLink href='/mint/activity' passHref>
                <Button
                  colorScheme={'blackAlpha'}
                  variant='ghost'
                  color='black'
                >
                  Activity
                </Button>
              </NextLink>

              {connected && (
                <NextLink href='/mint' passHref>
                  <Button>Create</Button>
                </NextLink>
              )}
            </Flex>
          </DrawerContent>
        </Drawer>
      )}
    </Flex>
  )
}

export default Navbar
