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
import { useEtherBalance, useEthers } from "@usedapp/core";
import { isNil } from "lodash";
import { useMemo, useState } from "react";
import { TextTruncate } from "react-text-truncate";
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

const Navbar = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  const connected = useMemo(() => !isNil(account), [account]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  function discon() {
    onClose();
    deactivate();
  }

  return (
    <Box padding={5} marginBottom={10}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Box>
              <Button onClick={() => discon()}>Disconnect</Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box marginLeft="200px" marginRight="200px" display="flex">
        <Heading letterSpacing={1} fontSize="32px">
          {" "}
          <Link href="/">Autentisk</Link>{" "}
        </Heading>
        <InputGroup
          width="900px"
          marginLeft="20px"
          color="gray.500"
          fontSize="18px"
        >
          {/* // eslint-disable-next-line react/no-children-prop */}
          <InputLeftElement pointerEvents="none" children={<Search2Icon />} />
          <Input
            placeholder="Search Collection, Specific Art or User"
            borderRadius={20}
            fontWeight={"bold"}
          />
        </InputGroup>
        {connected ? (
          <Flex>
            <Button
              onClick={() => console.log("button about diclick")}
              backgroundColor="transparent"
              fontSize="18px"
              marginLeft="25px"
              marginRight="25px"
              _hover={{ backgroundColor: "transparent", color: "grey" }}
            >
              About
            </Button>
            <IconButton
              onClick={() => console.log("button notifikasi")}
              icon={<BellIcon color={"black"} boxSize={"25px"} margin={0} />}
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent", color: "grey" }}
              aria-label="Notification"
            ></IconButton>
            <Box
              fontSize="14px"
              fontWeight="bold"
              marginRight="15px"
              marginLeft="15px"
            >
              <Text textAlign={"center"}>{truncate(account, 7)}</Text>
              <Text borderBottom={"2px"} width="80px"></Text>
              <Text textAlign={"center"}>
                {etherBalance ? (+formatEther(etherBalance)).toFixed(4) : "0"}{" "}
                ETH
              </Text>
            </Box>
            <Button
              onClick={onOpen}
              backgroundColor="white"
              borderRadius={100}
              boxSize="40px"
              _hover={{
                backgroundColor: "transparent",
                shadow: ".1px .3px .3px .1px grey",
              }}
            >
              <Box borderRadius={100} padding="15px" backgroundColor={"yellow"}>
                {/* profileimage */}
              </Box>
            </Button>
            <Button
              backgroundColor="black"
              fontSize="18px"
              color="white"
              borderRadius={20}
              marginLeft="30px"
              _hover={{ backgroundColor: "grey" }}
            >
              <Link href="/mintNFT">Create</Link>
            </Button>
          </Flex>
        ) : (
          <Flex>
            <Button
              onClick={() => console.log("button about diclick")}
              backgroundColor="transparent"
              fontSize="18px"
              marginLeft="75px"
              _hover={{ backgroundColor: "transparent", color: "grey" }}
            >
              About
            </Button>
            <Button
              onClick={() => activateBrowserWallet()}
              backgroundColor="black"
              fontSize="18px"
              color="white"
              borderRadius={20}
              marginLeft="75px"
              _hover={{ backgroundColor: "grey" }}
            >
              Connect Wallet
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
