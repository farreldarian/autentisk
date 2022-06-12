import { Box, useToast, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import TxButton from '../../common/components/TxButton'
import useFallbackAccountAddress from '../../common/hooks/useFallbackAccountAddress'
import MintLayout from '../../layouts/mint/MintLayout'
import { useAutentisk } from '../../modules/contracts/useAutentisk'
import formatIpfsUri from '../../modules/ipfs/format-ipfs-uri'
import pinContent from '../../modules/ipfs/pin-content'
import pinFile from '../../modules/ipfs/pin-file'
import DescriptionField from '../../modules/mint/DescriptionField'
import ImageFormSection from '../../modules/mint/ImageFormSection'
import makeTokenMetadata from '../../modules/mint/makeTokenMetadata'
import { MintFormProps } from '../../modules/mint/MintFormProps'
import NameField from '../../modules/mint/NameField'
import UserCollectionsInput from '../../modules/mint/UserCollectionsInput'

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  collectionId: Yup.string().required('Please select collection'),
})

export default function Mint() {
  const { address } = useFallbackAccountAddress()

  const [tx, setTx] = useState<string | undefined>()
  const { writeAsync, status } = useAutentisk('mint', [])

  const toast = useToast()

  return (
    <MintLayout>
      <Box maxW='container.md' mx='auto'>
        <Formik<MintFormProps>
          initialValues={{
            name: '',
            description: '',
            image: undefined,
            collectionId: '',
          }}
          onSubmit={async (
            { description, name, image, collectionId },
            { setFieldError, setSubmitting }
          ) => {
            if (!image) {
              setFieldError('image', 'Image is required')
              setSubmitting(false)
              return
            }

            const imageCid = await pinFile(image)
            if (!imageCid) {
              toast({
                title: 'Mint Failed',
                description: 'Failed uploading image',
                status: 'error',
              })
              setSubmitting(false)
              return
            }

            const metadata = makeTokenMetadata(
              name,
              description,
              formatIpfsUri(imageCid.toString())
            )

            const tokenCid = await pinContent(JSON.stringify(metadata, null, 2))
            if (!tokenCid) {
              toast({
                title: 'Mint Failed',
                description: 'Failed uploading token metadata',
                status: 'error',
              })
              setSubmitting(false)
              return
            }

            const tokenUri = formatIpfsUri(tokenCid.toString())

            try {
              const tx = await writeAsync({
                args: [
                  collectionId,
                  address,
                  tokenUri,
                  encodeURIComponent(tokenUri),
                ],
              })
              setTx(tx.hash)
              toast({ status: 'success', title: `Submitted transaction` })
            } catch (e) {
              if (e.error?.data?.message) {
                toast({ status: 'error', title: e.error.data.message })
              }
            }

            setSubmitting(false)
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack marginTop={12} spacing='6' align={'start'}>
                <UserCollectionsInput />
                <ImageFormSection />
                <NameField />
                <DescriptionField />
                <TxButton
                  type='submit'
                  status={status}
                  txHash={tx}
                  isLoading={isSubmitting}
                >
                  Mint
                </TxButton>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </MintLayout>
  )
}
