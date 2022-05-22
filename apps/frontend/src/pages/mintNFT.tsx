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
import FileDropzone from "../components/FileDropzone";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

export default function mintNFT() {
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
            <Select placeholder="Select Collection">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
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
