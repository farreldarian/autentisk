import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ImageFormSection from "../modules/mint/ImageFormSection";
import Layout from "../components/Layout";
import UserCollectionsInput from "../modules/mint/UserCollectionsInput";
import { useAutentisk } from "../modules/contracts/useAutentisk";
import { useRecoilValue } from "recoil";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useFallbackAccountAddress from "../common/hooks/useFallbackAccountAddress";
import getIpfs from "../modules/ipfs/get-ipfs";
import NameField from "../modules/mint/NameField";
import DescriptionField from "../modules/mint/DescriptionField";
import makeTokenMetadata from "../modules/mint/makeTokenMetadata";
import formatIpfsUri from "../modules/ipfs/format-ipfs-uri";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  collectionId: Yup.string().required("Please select collection"),
});

export default function Mint() {
  const { address } = useFallbackAccountAddress();
  const { writeAsync } = useAutentisk("mint", []);
  const toast = useToast({
    isClosable: true,
    position: "bottom-right",
    variant: "solid",
  });

  return (
    <Layout>
      <Container maxW="container.md" minH="calc(100vh - 80px)" py="12">
        <Heading as="h2" size="lg" isTruncated>
          Mint NFT
        </Heading>

        <Formik
          initialValues={{
            name: "",
            description: "",
            image: undefined,
            collectionId: "",
          }}
          onSubmit={async (
            { description, name, image, collectionId },
            { setFieldError, setSubmitting }
          ) => {
            if (!image) {
              setFieldError("image", "Image is required");
              setSubmitting(false);
              return;
            }

            const client = getIpfs();
            const { cid: imageCid } =
              (await client
                .add(image, {
                  cidVersion: 1,
                  pin: true,
                })
                .catch(() => {
                  return undefined;
                })) ?? {};
            if (!imageCid) {
              toast({
                title: "Mint Failed",
                description: "Failed uploading image",
                status: "error",
              });
              setSubmitting(false);
              return;
            }

            const metadata = makeTokenMetadata(
              name,
              description,
              formatIpfsUri(imageCid.toString())
            );

            const { cid: tokenCid } =
              (await client
                .add(JSON.stringify(metadata, null, 2), {
                  cidVersion: 1,
                  pin: true,
                })
                .catch(() => undefined)) ?? {};

            if (!tokenCid) {
              toast({
                title: "Mint Failed",
                description: "Failed uploading token metadata",
                status: "error",
              });
              setSubmitting(false);
              return;
            }

            const tokenUri = formatIpfsUri(tokenCid.toString());

            try {
              await writeAsync({
                args: [
                  collectionId,
                  address,
                  tokenUri,
                  encodeURIComponent(tokenUri),
                ],
              });
            } catch (e) {
              toast({
                title: "Mint Failed",
                // description: e.error.message,
                status: "error",
              });
            }

            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <VStack marginTop={12} spacing="6" align={"start"}>
                <UserCollectionsInput />
                <ImageFormSection />
                <NameField />
                <DescriptionField />
                <Button type="submit" isLoading={isSubmitting}>
                  Next
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
}
