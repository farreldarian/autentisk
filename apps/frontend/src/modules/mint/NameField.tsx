import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { MintFormProps } from './MintFormProps'

export default function NameField() {
  const { isSubmitting, errors, touched, getFieldProps } =
    useFormikContext<MintFormProps>()

  return (
    <FormControl isInvalid={!!errors.name && !!touched.name}>
      <FormLabel htmlFor='name' fontWeight={'bold'}>
        Name
      </FormLabel>
      <Input id='name' isDisabled={isSubmitting} {...getFieldProps('name')} />
      <FormErrorMessage>{errors.name}</FormErrorMessage>
    </FormControl>
  )
}
