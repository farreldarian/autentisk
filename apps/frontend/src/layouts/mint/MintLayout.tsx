import { Container, Heading, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode, useMemo } from 'react'
import Layout from '../../components/Layout'
import MintHeading from './MintHeading'

type Props = {
  children: ReactNode
}

export default function MintLayout({ children }: Props) {
  const { asPath } = useRouter()
  const onActivity = useMemo(() => asPath.includes('activity'), [asPath])

  return (
    <Layout>
      <Container maxW='container.md' minH='calc(100vh - 80px)' py='12'>
        <HStack spacing={'6'}>
          <MintHeading href='/mint' isActive={!onActivity}>
            Mint NFT
          </MintHeading>

          <Heading size='lg' color='gray.300'>
            /
          </Heading>

          <MintHeading href='/mint/activity' isActive={onActivity}>
            Activity
          </MintHeading>
        </HStack>

        {children}
      </Container>
    </Layout>
  )
}
