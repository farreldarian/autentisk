/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  AutentiskERC721,
  AutentiskERC721Interface,
} from "../../../contracts/token/AutentiskERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620034b0380380620034b08339818101604052810190620000379190620003b0565b818181600090805190602001906200005192919062000163565b5080600190805190602001906200006a92919062000163565b5050506200008d620000816200009560201b60201c565b6200009d60201b60201c565b505062000499565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001719062000464565b90600052602060002090601f016020900481019282620001955760008555620001e1565b82601f10620001b057805160ff1916838001178555620001e1565b82800160010185558215620001e1579182015b82811115620001e0578251825591602001919060010190620001c3565b5b509050620001f09190620001f4565b5090565b5b808211156200020f576000816000905550600101620001f5565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200027c8262000231565b810181811067ffffffffffffffff821117156200029e576200029d62000242565b5b80604052505050565b6000620002b362000213565b9050620002c1828262000271565b919050565b600067ffffffffffffffff821115620002e457620002e362000242565b5b620002ef8262000231565b9050602081019050919050565b60005b838110156200031c578082015181840152602081019050620002ff565b838111156200032c576000848401525b50505050565b6000620003496200034384620002c6565b620002a7565b9050828152602081018484840111156200036857620003676200022c565b5b62000375848285620002fc565b509392505050565b600082601f83011262000395576200039462000227565b5b8151620003a784826020860162000332565b91505092915050565b60008060408385031215620003ca57620003c96200021d565b5b600083015167ffffffffffffffff811115620003eb57620003ea62000222565b5b620003f9858286016200037d565b925050602083015167ffffffffffffffff8111156200041d576200041c62000222565b5b6200042b858286016200037d565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200047d57607f821691505b60208210810362000493576200049262000435565b5b50919050565b61300780620004a96000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063715018a6116100a2578063b88d4fde11610071578063b88d4fde146102a4578063c87b56dd146102c0578063d0def521146102f0578063e985e9c514610320578063f2fde38b146103505761010b565b8063715018a6146102425780638da5cb5b1461024c57806395d89b411461026a578063a22cb465146102885761010b565b806323b872dd116100de57806323b872dd146101aa57806342842e0e146101c65780636352211e146101e257806370a08231146102125761010b565b806301ffc9a71461011057806306fdde0314610140578063081812fc1461015e578063095ea7b31461018e575b600080fd5b61012a60048036038101906101259190611caa565b61036c565b6040516101379190611cf2565b60405180910390f35b61014861044e565b6040516101559190611da6565b60405180910390f35b61017860048036038101906101739190611dfe565b6104e0565b6040516101859190611e6c565b60405180910390f35b6101a860048036038101906101a39190611eb3565b610565565b005b6101c460048036038101906101bf9190611ef3565b61067c565b005b6101e060048036038101906101db9190611ef3565b6106dc565b005b6101fc60048036038101906101f79190611dfe565b6106fc565b6040516102099190611e6c565b60405180910390f35b61022c60048036038101906102279190611f46565b6107ad565b6040516102399190611f82565b60405180910390f35b61024a610864565b005b6102546108ec565b6040516102619190611e6c565b60405180910390f35b610272610916565b60405161027f9190611da6565b60405180910390f35b6102a2600480360381019061029d9190611fc9565b6109a8565b005b6102be60048036038101906102b9919061213e565b6109be565b005b6102da60048036038101906102d59190611dfe565b610a20565b6040516102e79190611da6565b60405180910390f35b61030a60048036038101906103059190612221565b610b71565b6040516103179190611f82565b60405180910390f35b61033a60048036038101906103359190612281565b610c64565b6040516103479190611cf2565b60405180910390f35b61036a60048036038101906103659190611f46565b610cf8565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061043757507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610447575061044682610def565b5b9050919050565b60606000805461045d906122f0565b80601f0160208091040260200160405190810160405280929190818152602001828054610489906122f0565b80156104d65780601f106104ab576101008083540402835291602001916104d6565b820191906000526020600020905b8154815290600101906020018083116104b957829003601f168201915b5050505050905090565b60006104eb82610e59565b61052a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052190612393565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000610570826106fc565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036105e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d790612425565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105ff610ec5565b73ffffffffffffffffffffffffffffffffffffffff16148061062e575061062d81610628610ec5565b610c64565b5b61066d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610664906124b7565b60405180910390fd5b6106778383610ecd565b505050565b61068d610687610ec5565b82610f86565b6106cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c390612549565b60405180910390fd5b6106d7838383611064565b505050565b6106f7838383604051806020016040528060008152506109be565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079b906125db565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361081d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108149061266d565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61086c610ec5565b73ffffffffffffffffffffffffffffffffffffffff1661088a6108ec565b73ffffffffffffffffffffffffffffffffffffffff16146108e0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d7906126d9565b60405180910390fd5b6108ea60006112ca565b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060018054610925906122f0565b80601f0160208091040260200160405190810160405280929190818152602001828054610951906122f0565b801561099e5780601f106109735761010080835404028352916020019161099e565b820191906000526020600020905b81548152906001019060200180831161098157829003601f168201915b5050505050905090565b6109ba6109b3610ec5565b8383611390565b5050565b6109cf6109c9610ec5565b83610f86565b610a0e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0590612549565b60405180910390fd5b610a1a848484846114fc565b50505050565b6060610a2b82610e59565b610a6a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a619061276b565b60405180910390fd5b6000600660008481526020019081526020016000208054610a8a906122f0565b80601f0160208091040260200160405190810160405280929190818152602001828054610ab6906122f0565b8015610b035780601f10610ad857610100808354040283529160200191610b03565b820191906000526020600020905b815481529060010190602001808311610ae657829003601f168201915b505050505090506000610b14611558565b90506000815103610b29578192505050610b6c565b600082511115610b5e578082604051602001610b469291906127c7565b60405160208183030381529060405292505050610b6c565b610b678461156f565b925050505b919050565b6000610b7b610ec5565b73ffffffffffffffffffffffffffffffffffffffff16610b996108ec565b73ffffffffffffffffffffffffffffffffffffffff1614610bef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610be6906126d9565b60405180910390fd5b610bf96008611616565b610c03600861162c565b9050610c0f848261163a565b610c5d8184848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050611813565b9392505050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610d00610ec5565b73ffffffffffffffffffffffffffffffffffffffff16610d1e6108ec565b73ffffffffffffffffffffffffffffffffffffffff1614610d74576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6b906126d9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610de3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dda9061285d565b60405180910390fd5b610dec816112ca565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610f40836106fc565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610f9182610e59565b610fd0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fc7906128ef565b60405180910390fd5b6000610fdb836106fc565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061101d575061101c8185610c64565b5b8061105b57508373ffffffffffffffffffffffffffffffffffffffff16611043846104e0565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16611084826106fc565b73ffffffffffffffffffffffffffffffffffffffff16146110da576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d190612981565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611149576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161114090612a13565b60405180910390fd5b611154838383611887565b61115f600082610ecd565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546111af9190612a62565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112069190612a96565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46112c583838361188c565b505050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036113fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113f590612b38565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516114ef9190611cf2565b60405180910390a3505050565b611507848484611064565b61151384848484611891565b611552576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161154990612bca565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606061157a82610e59565b6115b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115b090612c5c565b60405180910390fd5b60006115c3611558565b905060008151116115e3576040518060200160405280600081525061160e565b806115ed84611a18565b6040516020016115fe9291906127c7565b6040516020818303038152906040525b915050919050565b6001816000016000828254019250508190555050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036116a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116a090612cc8565b60405180910390fd5b6116b281610e59565b156116f2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116e990612d34565b60405180910390fd5b6116fe60008383611887565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461174e9190612a96565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461180f6000838361188c565b5050565b61181c82610e59565b61185b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161185290612dc6565b60405180910390fd5b80600660008481526020019081526020016000209080519060200190611882929190611b9b565b505050565b505050565b505050565b60006118b28473ffffffffffffffffffffffffffffffffffffffff16611b78565b15611a0b578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026118db610ec5565b8786866040518563ffffffff1660e01b81526004016118fd9493929190612e3b565b6020604051808303816000875af192505050801561193957506040513d601f19601f820116820180604052508101906119369190612e9c565b60015b6119bb573d8060008114611969576040519150601f19603f3d011682016040523d82523d6000602084013e61196e565b606091505b5060008151036119b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119aa90612bca565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611a10565b600190505b949350505050565b606060008203611a5f576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611b73565b600082905060005b60008214611a91578080611a7a90612ec9565b915050600a82611a8a9190612f40565b9150611a67565b60008167ffffffffffffffff811115611aad57611aac612013565b5b6040519080825280601f01601f191660200182016040528015611adf5781602001600182028036833780820191505090505b5090505b60008514611b6c57600182611af89190612a62565b9150600a85611b079190612f71565b6030611b139190612a96565b60f81b818381518110611b2957611b28612fa2565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a85611b659190612f40565b9450611ae3565b8093505050505b919050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b828054611ba7906122f0565b90600052602060002090601f016020900481019282611bc95760008555611c10565b82601f10611be257805160ff1916838001178555611c10565b82800160010185558215611c10579182015b82811115611c0f578251825591602001919060010190611bf4565b5b509050611c1d9190611c21565b5090565b5b80821115611c3a576000816000905550600101611c22565b5090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611c8781611c52565b8114611c9257600080fd5b50565b600081359050611ca481611c7e565b92915050565b600060208284031215611cc057611cbf611c48565b5b6000611cce84828501611c95565b91505092915050565b60008115159050919050565b611cec81611cd7565b82525050565b6000602082019050611d076000830184611ce3565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611d47578082015181840152602081019050611d2c565b83811115611d56576000848401525b50505050565b6000601f19601f8301169050919050565b6000611d7882611d0d565b611d828185611d18565b9350611d92818560208601611d29565b611d9b81611d5c565b840191505092915050565b60006020820190508181036000830152611dc08184611d6d565b905092915050565b6000819050919050565b611ddb81611dc8565b8114611de657600080fd5b50565b600081359050611df881611dd2565b92915050565b600060208284031215611e1457611e13611c48565b5b6000611e2284828501611de9565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611e5682611e2b565b9050919050565b611e6681611e4b565b82525050565b6000602082019050611e816000830184611e5d565b92915050565b611e9081611e4b565b8114611e9b57600080fd5b50565b600081359050611ead81611e87565b92915050565b60008060408385031215611eca57611ec9611c48565b5b6000611ed885828601611e9e565b9250506020611ee985828601611de9565b9150509250929050565b600080600060608486031215611f0c57611f0b611c48565b5b6000611f1a86828701611e9e565b9350506020611f2b86828701611e9e565b9250506040611f3c86828701611de9565b9150509250925092565b600060208284031215611f5c57611f5b611c48565b5b6000611f6a84828501611e9e565b91505092915050565b611f7c81611dc8565b82525050565b6000602082019050611f976000830184611f73565b92915050565b611fa681611cd7565b8114611fb157600080fd5b50565b600081359050611fc381611f9d565b92915050565b60008060408385031215611fe057611fdf611c48565b5b6000611fee85828601611e9e565b9250506020611fff85828601611fb4565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61204b82611d5c565b810181811067ffffffffffffffff8211171561206a57612069612013565b5b80604052505050565b600061207d611c3e565b90506120898282612042565b919050565b600067ffffffffffffffff8211156120a9576120a8612013565b5b6120b282611d5c565b9050602081019050919050565b82818337600083830152505050565b60006120e16120dc8461208e565b612073565b9050828152602081018484840111156120fd576120fc61200e565b5b6121088482856120bf565b509392505050565b600082601f83011261212557612124612009565b5b81356121358482602086016120ce565b91505092915050565b6000806000806080858703121561215857612157611c48565b5b600061216687828801611e9e565b945050602061217787828801611e9e565b935050604061218887828801611de9565b925050606085013567ffffffffffffffff8111156121a9576121a8611c4d565b5b6121b587828801612110565b91505092959194509250565b600080fd5b600080fd5b60008083601f8401126121e1576121e0612009565b5b8235905067ffffffffffffffff8111156121fe576121fd6121c1565b5b60208301915083600182028301111561221a576122196121c6565b5b9250929050565b60008060006040848603121561223a57612239611c48565b5b600061224886828701611e9e565b935050602084013567ffffffffffffffff81111561226957612268611c4d565b5b612275868287016121cb565b92509250509250925092565b6000806040838503121561229857612297611c48565b5b60006122a685828601611e9e565b92505060206122b785828601611e9e565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061230857607f821691505b60208210810361231b5761231a6122c1565b5b50919050565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b600061237d602c83611d18565b915061238882612321565b604082019050919050565b600060208201905081810360008301526123ac81612370565b9050919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061240f602183611d18565b915061241a826123b3565b604082019050919050565b6000602082019050818103600083015261243e81612402565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b60006124a1603883611d18565b91506124ac82612445565b604082019050919050565b600060208201905081810360008301526124d081612494565b9050919050565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b6000612533603183611d18565b915061253e826124d7565b604082019050919050565b6000602082019050818103600083015261256281612526565b9050919050565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b60006125c5602983611d18565b91506125d082612569565b604082019050919050565b600060208201905081810360008301526125f4816125b8565b9050919050565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b6000612657602a83611d18565b9150612662826125fb565b604082019050919050565b600060208201905081810360008301526126868161264a565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006126c3602083611d18565b91506126ce8261268d565b602082019050919050565b600060208201905081810360008301526126f2816126b6565b9050919050565b7f45524337323155524953746f726167653a2055524920717565727920666f722060008201527f6e6f6e6578697374656e7420746f6b656e000000000000000000000000000000602082015250565b6000612755603183611d18565b9150612760826126f9565b604082019050919050565b6000602082019050818103600083015261278481612748565b9050919050565b600081905092915050565b60006127a182611d0d565b6127ab818561278b565b93506127bb818560208601611d29565b80840191505092915050565b60006127d38285612796565b91506127df8284612796565b91508190509392505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612847602683611d18565b9150612852826127eb565b604082019050919050565b600060208201905081810360008301526128768161283a565b9050919050565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b60006128d9602c83611d18565b91506128e48261287d565b604082019050919050565b60006020820190508181036000830152612908816128cc565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b600061296b602583611d18565b91506129768261290f565b604082019050919050565b6000602082019050818103600083015261299a8161295e565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006129fd602483611d18565b9150612a08826129a1565b604082019050919050565b60006020820190508181036000830152612a2c816129f0565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612a6d82611dc8565b9150612a7883611dc8565b925082821015612a8b57612a8a612a33565b5b828203905092915050565b6000612aa182611dc8565b9150612aac83611dc8565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612ae157612ae0612a33565b5b828201905092915050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000612b22601983611d18565b9150612b2d82612aec565b602082019050919050565b60006020820190508181036000830152612b5181612b15565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612bb4603283611d18565b9150612bbf82612b58565b604082019050919050565b60006020820190508181036000830152612be381612ba7565b9050919050565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b6000612c46602f83611d18565b9150612c5182612bea565b604082019050919050565b60006020820190508181036000830152612c7581612c39565b9050919050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b6000612cb2602083611d18565b9150612cbd82612c7c565b602082019050919050565b60006020820190508181036000830152612ce181612ca5565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000612d1e601c83611d18565b9150612d2982612ce8565b602082019050919050565b60006020820190508181036000830152612d4d81612d11565b9050919050565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b6000612db0602e83611d18565b9150612dbb82612d54565b604082019050919050565b60006020820190508181036000830152612ddf81612da3565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000612e0d82612de6565b612e178185612df1565b9350612e27818560208601611d29565b612e3081611d5c565b840191505092915050565b6000608082019050612e506000830187611e5d565b612e5d6020830186611e5d565b612e6a6040830185611f73565b8181036060830152612e7c8184612e02565b905095945050505050565b600081519050612e9681611c7e565b92915050565b600060208284031215612eb257612eb1611c48565b5b6000612ec084828501612e87565b91505092915050565b6000612ed482611dc8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612f0657612f05612a33565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000612f4b82611dc8565b9150612f5683611dc8565b925082612f6657612f65612f11565b5b828204905092915050565b6000612f7c82611dc8565b9150612f8783611dc8565b925082612f9757612f96612f11565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea26469706673582212202d861bf4e32d00e842d679f5a8f845e3254ccaa14b1cf7c40267d63f20013a1a64736f6c634300080d0033";

type AutentiskERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AutentiskERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AutentiskERC721__factory extends ContractFactory {
  constructor(...args: AutentiskERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AutentiskERC721> {
    return super.deploy(
      name,
      symbol,
      overrides || {}
    ) as Promise<AutentiskERC721>;
  }
  override getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override attach(address: string): AutentiskERC721 {
    return super.attach(address) as AutentiskERC721;
  }
  override connect(signer: Signer): AutentiskERC721__factory {
    return super.connect(signer) as AutentiskERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AutentiskERC721Interface {
    return new utils.Interface(_abi) as AutentiskERC721Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AutentiskERC721 {
    return new Contract(address, _abi, signerOrProvider) as AutentiskERC721;
  }
}