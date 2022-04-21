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

export default function Collections() {
  const dummy = [
    {
      name: "Collection summer",
      price: "85",
      image:
        "https://lh3.googleusercontent.com/UZ-26gO6lqy5ttLDdHM5hdZFUy1fjHCpurmWHJl0dFgmuQw2LVjN2FV2bm5JwS-i1rvkngpBzDyWaKgDox80OB4v8_muh9JkZcFS=w361",
      author: "Bored Ape Yacht Club",
    },
    {
      name: "Collection 5465",
      price: "22",
      image:
        "https://lh3.googleusercontent.com/Czn9y9yAUpvuI6SGoVSnNe29_kZ84Ey_9saCrdpA7a5j2_8IWlUFSBM3_GMkjBPmbG8AS1jWtrzgQG4nCsyAlR_VtEI0fXMeKD8ILA=w361",
      author: "Bored Ape Yacht Club",
    },
    {
      name: "Collection 1912",
      price: "853",
      image:
        "https://lh3.googleusercontent.com/1HBO9fN-D2vu75HgWYmQSzje5Zyf6j2RTGPPdaYcEpKDpdxEuPzZG-z2K7Iu0ragRZGsj4B6cW6F-ZDrAz-m9qjuQva1iSAin6O_hA=w361",
      author: "Bored Ape Yacht Club",
    },
    {
      name: "Collection 19927",
      price: "999",
      image:
        "https://lh3.googleusercontent.com/WJXu2fRjo2dvTbwMex8tlNXOAqGfGyWIROS7sbjp4agSaPlj3Pul73KoCduXN5g31s9QoU7KTjN9JG_XMx-A9Femd8Eh4btISSpC1A=w361",
      author: "Bored Ape Yacht Club",
    },
  ];
  return (
    <Layout>
      <Container maxW="container.lg" marginTop={8}>
        <Box alignContent="center">
          <Heading size="md" textAlign="center">
            My Collections
          </Heading>

          <Text mb={5} textAlign="center">
            Create and manage collections of NFTs to share and sell.
          </Text>

          <Grid my={10} templateColumns="repeat(3, 1fr)" gap="10">
            {dummy.map((data, i) => (
              <Box
                boxShadow="3px 4px 14px 5px rgba(0, 0, 0, 0.5)"
                borderRadius="lg"
                key={i}
              >
                <Img
                  src={data.image}
                  maxWidth="100%"
                  maxHeight="400px"
                  objectFit="contain"
                  alt="NFT-img"
                />

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
                    <p>By You</p>
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
