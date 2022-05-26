import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
  Textarea,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useUserCollectionsQuery } from "../../generated/graphql";
import FileDropzone from "../components/FileDropzone";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import UserCollectionsInput from "../modules/create/UserCollectionsInput";

export default function Create() {
  const { data: accountData } = useAccount();

  if (!accountData?.address) return <Layout></Layout>;

  return (
    <Layout>
      {" "}
      <Container maxW="container.md" marginTop={28}>
        <Heading as="h2" size="lg" isTruncated>
          Mint NFT
        </Heading>
        <Box marginTop={10}>
          <FormControl>
            <FormLabel>
              <Flex>
                <Box>
                  <strong>Collection</strong>
                </Box>
                <Spacer />
                <Box>
                  <Link href="/collections">
                    <a>Manage Collections</a>
                  </Link>
                </Box>
              </Flex>
            </FormLabel>

            <UserCollectionsInput />
          </FormControl>

          <FormControl marginTop={5}>
            <FormLabel>
              <strong>Image Upload</strong>
              <br></br>File Types Supported: JPG, PNG, JPEG, GIF
            </FormLabel>
            <FileDropzone />
          </FormControl>

          <FormControl marginTop={5}>
            <FormLabel>
              <strong>Name</strong>
            </FormLabel>
            <Input id="name" />
          </FormControl>

          <FormControl marginTop={5}>
            <FormLabel>
              <strong>Description</strong>
            </FormLabel>
            <Textarea id="name" />
          </FormControl>

          <Button
            marginTop={5}
            borderRadius="20px"
            bg="#000000"
            color="#FFFFFF"
            fontWeight="normal"
            _hover={{ bg: "#ebedf0", color: "#000000" }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </Layout>
  );
}
