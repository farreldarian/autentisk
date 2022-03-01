import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";


const Collections = () => {

    return (
        <div>
            <Navbar/>
            <Container marginTop={8}>
               <Box alignContent="center">
                    <Heading size="md" textAlign="center">My Collections</Heading>
                    <Text textAlign="center">Create and manage collections of NFTs to share and sell.</Text>
               </Box>
            </Container>
        </div>
    )
}

export default Collections;