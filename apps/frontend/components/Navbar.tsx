import { Search2Icon, BellIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  DefaultIcon,
  Flex,
  Heading,
  HStack,
  IconButton,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatEther } from "ethers/lib/utils";
import { isNil } from "lodash";
import { useMemo, useState } from "react";
import AccountModal from "../components/connect-wallet/AccountModal";
import Link from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { utils } from "ethers";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const { data: account } = useAccount();

  const connected = useMemo(() => !isNil(account?.address), [account?.address]);

  return (
    <Box
      background="whiteAlpha.400"
      position="sticky"
      top={0}
      padding={5}
      backdropFilter="blur(8px)"
    >
      <Flex>
        <Heading letterSpacing={1} fontSize="32px" mr="6">
          {" "}
          <Link href="/">Autentisk</Link>{" "}
        </Heading>

        <InputGroup
          width="900px"
          color="gray.500"
          fontSize="18px"
          flex={1}
          mr="6"
        >
          <InputLeftElement pointerEvents="none">
            <Search2Icon />
          </InputLeftElement>

          <Input
            placeholder="Search Collection, Specific Art or User"
            borderRadius={20}
            fontWeight={"bold"}
          />
        </InputGroup>

        <Button
          onClick={() => console.log("button about diclick")}
          backgroundColor="transparent"
          _hover={{ backgroundColor: "transparent", color: "grey" }}
          mr="6"
        >
          About
        </Button>

        {connected && (
          <Button
            backgroundColor="black"
            color="white"
            borderRadius={20}
            mr="6"
            _hover={{ backgroundColor: "grey" }}
          >
            <Link href="/mintNFT">Create</Link>
          </Button>
        )}

        <ConnectButton showBalance={false} />
      </Flex>
    </Box>
  );
};

export default Navbar;
