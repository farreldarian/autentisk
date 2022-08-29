import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import TxButton from '../common/components/TxButton'
import useToast from '../common/hooks/useToast'
import { useAutentisk } from '../modules/contracts/useAutentisk'

export default function CreateCollectionForm() {
  const toast = useToast()
  const [tx, setTx] = useState<string | undefined>()
  const { writeAsync, isSuccess, error, status } = useAutentisk(
    'createCollection',
    ['', '']
  )

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const name = e.target['name'].value
    const symbol = e.target['symbol'].value

    try {
      const tx = await writeAsync?.({ args: [name, symbol] })
      setTx(tx.hash)
      toast({ status: 'success', title: `Submitted transaction` })
    } catch (e) {
      if (e.error?.data?.message) {
        toast({ status: 'error', title: e.error.data.message })
      }
    }
  }

  return (
    <Box>
      <Heading as='h2' size='lg' isTruncated>
        Create New Collection
      </Heading>

      <form onSubmit={onSubmit}>
        <FormControl marginTop={12}>
          <FormLabel>
            <strong>Collection Name</strong>
          </FormLabel>

          <Input id='name' />
        </FormControl>

        <FormControl marginTop={3}>
          <FormLabel>
            <strong>Symbol</strong>
          </FormLabel>

          <Input id='symbol' />
        </FormControl>

        <TxButton
          colorScheme={'blue'}
          mt='6'
          type='submit'
          txHash={tx}
          status={status}
        >
          <>Create Collection</>
        </TxButton>

        {error && (
          <Text mt='1.5' color='red'>
            {error?.message}
          </Text>
        )}
      </form>
    </Box>
  )
}
