import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Img,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Layout from "../components/Layout";
import { useCollectionsQuery } from "../generated/graphql";

export default function Collections() {
  const [{ data }] = useCollectionsQuery();

  return (
    <Layout>
      <Container maxW="container.lg" marginTop={28}>
        <Box alignContent="center">
          <Heading size="md" textAlign="center">
            My Collections
          </Heading>

          <Text mb={5} textAlign="center">
            Create and manage collections of NFTs to share and sell.
          </Text>

          <Grid my={10} templateColumns="repeat(3, 1fr)" gap="10">
            {data?.collections.map((data, i) => (
              <Box
                boxShadow="3px 4px 14px 5px rgba(0, 0, 0, 0.5)"
                borderRadius="lg"
                key={i}
              >
                {/* <Img
                  src={data.image}
                  width="100%"
                  maxHeight="300px"
                  objectFit="cover"
                  alt="NFT-img"
                /> */}

                <Box
                  flexDirection="column"
                  display="flex"
                  padding="10"
                  justifyContent="space-between"
                  textAlign="center"
                >
                  <div>
                    <h1>
                      <strong>{data.name}</strong>
                    </h1>
                    <p>By {data.id}</p>
                  </div>
                  <a href={`collection/${data.name}`}>Explore Collection</a>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Container>
      <Button
        colorScheme="blackAlpha"
        borderRadius="xl"
        background="black"
        position="fixed"
        right="0"
        bottom="0"
        margin="6"
      >
        <Link href="/createCollection">Create New Collection</Link>
      </Button>
    </Layout>
  );
}
