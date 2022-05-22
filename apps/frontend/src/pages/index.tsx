import {
  Box,
  Button,
  ChakraProvider,
  Divider,
  extendTheme,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const featured = {
  collection: "COLLAB LABS",
  name: "Respect",
  author: "@hoizon",
  owner: "@farreldarian",
  status: "onsale",
  price: "0.32",
  image:
    "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/2/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
};

const nftData = [
  {
    name: "The Banished Beauty",
    author: "@hoizon",
    owner: "@edwinfernaldy",
    status: "sold",
    price: "0.40",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/1/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
  {
    name: "Respect",
    author: "@hoizon",
    owner: "@farreldarian",
    status: "onsale",
    price: "0.32",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/2/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
  {
    name: "DreamScape",
    author: "@hoizon",
    owner: "@edricktio",
    status: "onsale",
    price: "0.80",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/3/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
  {
    name: "The Banished Beauty",
    author: "@hoizon",
    owner: "@edwinfernaldy",
    status: "sold",
    price: "0.40",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/1/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
  {
    name: "Respect",
    author: "@hoizon",
    owner: "@farreldarian",
    status: "onsale",
    price: "0.32",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/2/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
  {
    name: "DreamScape",
    author: "@hoizon",
    owner: "@edricktio",
    status: "onsale",
    price: "0.80",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/3/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
  {
    name: "The Banished Beauty",
    author: "@hoizon",
    owner: "@edwinfernaldy",
    status: "sold",
    price: "0.40",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/1/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
  {
    name: "Respect",
    author: "@hoizon",
    owner: "@farreldarian",
    status: "onsale",
    price: "0.32",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/2/nft.png?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
  {
    name: "DreamScape",
    author: "@hoizon",
    owner: "@edricktio",
    status: "onsale",
    price: "0.80",
    image:
      "https://f8n-production-collection-assets.imgix.net/0x9ac56Aca096d8C68F676d87C9feAD3BaC94F98f3/3/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680",
  },
];
export default function Home() {
  return (
    <div>
      <Head>
        <title>Authentic NFT Marketplace</title>
        <meta name="description" content="AI-Driven NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout>
          <section>
            <Box
              paddingY="36"
              justifyContent={"space-evenly"}
              gap={"10"}
              display="flex"
            >
              <Box w={"25%"} maxH={"30%"}>
                <Image
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                  alt="featured-nft"
                  src={featured.image}
                />
              </Box>

              <Box
                minH={"full"}
                border={"1px"}
                borderColor={"black"}
                bgColor={"black"}
              />

              <Box
                display="flex"
                justifyContent={"space-between"}
                flexDir={"column"}
                gap="4"
              >
                <Text fontSize={"9xl"}>{featured.name}</Text>

                <Box display={"flex"} justifyContent="space-between">
                  <Box gap={"3"} display="flex" flexDir={"column"}>
                    <Text color={"blackAlpha.500"} fontWeight={"semibold"}>
                      Created By
                    </Text>

                    <Box
                      padding={3}
                      borderRadius={"lg"}
                      boxShadow={"2px 2px 3px black"}
                    >
                      {featured.author}
                    </Box>
                  </Box>

                  <Box gap={"3"} display="flex" flexDir={"column"}>
                    <Text color={"blackAlpha.500"} fontWeight={"semibold"}>
                      Collection
                    </Text>
                    <Box
                      padding={3}
                      borderRadius={"lg"}
                      boxShadow={"2px 2px 3px black"}
                    >
                      {featured.collection}
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Text>Current Price</Text>
                  <Text fontSize={"5xl"}>{featured.price} ETH</Text>
                </Box>

                <Button colorScheme={"blackAlpha"} variant={"outline"}>
                  View NFT
                </Button>
              </Box>
            </Box>
          </section>

          <section>
            <Box padding={"20"} display="flex" flexDir={"column"} gap={"4"}>
              <Text
                fontSize="4xl"
                borderBottom={"1px"}
                w={"full"}
                borderColor={"black"}
                fontWeight={"bold"}
                letterSpacing="widest"
              >
                Explore NFTs
              </Text>

              <Box
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
              >
                {nftData.map((data, i) => (
                  <Box
                    minH={"500px"}
                    margin="1"
                    padding={6}
                    flexBasis={"30%"}
                    borderRadius={"3xl"}
                    backgroundSize={"cover"}
                    backgroundRepeat={"no-repeat"}
                    background={"blackAlpha.400"}
                    backgroundBlendMode="overlay"
                    backgroundPosition={"center"}
                    backgroundImage={data.image}
                    key={i}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"flex-end"}
                    color={"white"}
                  >
                    <Text fontSize={"3xl"} textShadow={"2px 2px black"}>
                      {data.name}
                    </Text>
                    <Text fontSize={"2xl"}>{data.price} ETH</Text>
                    <Button colorScheme={"blackAlpha"}>View NFT</Button>
                  </Box>
                ))}
              </Box>
            </Box>
          </section>
        </Layout>
      </main>
    </div>
  );
}
