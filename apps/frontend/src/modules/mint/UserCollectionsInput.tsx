import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  Select,
  Skeleton,
} from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import NextLink from 'next/link'
import { useUserCollectionsQuery } from '../../../generated/graphql'
import useFallbackAccountAddress from '../../common/hooks/useFallbackAccountAddress'
import { MintFormProps } from './MintFormProps'

export default function UserCollectionsInput() {
  const { address, fallback } = useFallbackAccountAddress()

  const [{ data, fetching }] = useUserCollectionsQuery({
    variables: { owner: address.toLowerCase() },
    pause: fallback,
  })

  const { errors, touched, getFieldProps, isSubmitting } =
    useFormikContext<MintFormProps>()

  return (
    <FormControl isInvalid={!!errors.collectionId && !!touched.collectionId}>
      <Flex justify='space-between'>
        <FormLabel fontWeight={'bold'}>Collection</FormLabel>

        <NextLink href='/collections' passHref>
          <Link color='blue.500'>Manage Collections</Link>
        </NextLink>
      </Flex>

      <Skeleton isLoaded={!fetching}>
        <Select
          placeholder='Select Collection'
          isDisabled={isSubmitting}
          {...getFieldProps('collectionId')}
        >
          {!fallback &&
            data?.collections.map(({ id, name }, key) => (
              <option value={id} key={key}>
                {name}
              </option>
            ))}
        </Select>
      </Skeleton>

      <FormErrorMessage>{errors.collectionId}</FormErrorMessage>
    </FormControl>
  )
}
