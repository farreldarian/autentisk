import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import FileDropzone from "../components/FileDropzone";
import Navbar from "../components/Navbar";

export default function createCollection() {
  return (
    <div>
      <Navbar />
      <Container maxWidth="container.md">
        <Heading as="h2" size="lg" isTruncated>
          Create New Collection
        </Heading>

        <FormControl marginTop={5}>
          <FormLabel>
            <strong>Image Upload</strong>
            <br></br>File Types Supported: JPG, PNG, JPEG, GIF
          </FormLabel>
          <FileDropzone />
        </FormControl>

        <FormControl marginTop={5}>
          <FormLabel>
            <strong>Collection Name</strong>
          </FormLabel>
          <Input id="name" />
        </FormControl>

        <Button
          marginTop={5}
          borderRadius="20px"
          bg="#000000"
          color="#FFFFFF"
          fontWeight="normal"
          _hover={{ bg: "#ebedf0", color: "#000000" }}
        >
          Create Collection
        </Button>
      </Container>
    </div>
  );
}
