import { Container, Heading } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import Layout from '../../components/Layout'

type Props = {
  children: ReactNode
}

export default function MintLayout({ children }: Props) {
  return (
    <Layout>
      <Container maxW='container.md' minH='calc(100vh - 80px)' py='12'>
        <Heading as='h2' size='lg' isTruncated>
          Mint NFT
        </Heading>

        {children}
      </Container>
    </Layout>
  )
}
