import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";

export default function Create() {
  return (
    <Layout>
      <Flex
        maxWidth="container.md"
        minH="calc(100vh - 80px)"
        minW="100vw"
        align="center"
        justify={"center"}
      >
        <Box>
          <Heading as="h2" size="lg" isTruncated>
            Create New Collection
          </Heading>

          <FormControl marginTop={5}>
            <FormLabel>
              <strong>Collection Name</strong>
            </FormLabel>

            <Input id="name" />
          </FormControl>

          <Button colorScheme={"blue"} mt="6">
            Create Collection
          </Button>
        </Box>
      </Flex>
    </Layout>
  );
}
