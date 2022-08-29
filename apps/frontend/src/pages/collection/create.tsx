import { Flex } from '@chakra-ui/react'
import { useNetwork } from 'wagmi'
import CreateCollectionForm from '../../components/CreateCollectionForm'
import Layout from '../../components/Layout'

export default function Create() {
  const { chain } = useNetwork()

  return (
    <Layout>
      <Flex
        maxWidth='container.md'
        minH='calc(100vh - 80px)'
        minW='100vw'
        align='center'
        justify={'center'}
      >
        {chain?.id && !chain?.unsupported && <CreateCollectionForm />}
      </Flex>
    </Layout>
  )
}
