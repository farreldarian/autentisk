/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export declare namespace AsksV1_1 {
  export type AskStruct = {
    seller: string;
    sellerFundsRecipient: string;
    askCurrency: string;
    findersFeeBps: BigNumberish;
    askPrice: BigNumberish;
  };

  export type AskStructOutput = [string, string, string, number, BigNumber] & {
    seller: string;
    sellerFundsRecipient: string;
    askCurrency: string;
    findersFeeBps: number;
    askPrice: BigNumber;
  };
}

export declare namespace UniversalExchangeEventV1 {
  export type ExchangeDetailsStruct = {
    tokenContract: string;
    tokenId: BigNumberish;
    amount: BigNumberish;
  };

  export type ExchangeDetailsStructOutput = [string, BigNumber, BigNumber] & {
    tokenContract: string;
    tokenId: BigNumber;
    amount: BigNumber;
  };
}

export interface AsksV1_1Interface extends utils.Interface {
  functions: {
    "_handleRoyaltyEnginePayout(address,uint256,uint256,address)": FunctionFragment;
    "askForNFT(address,uint256)": FunctionFragment;
    "cancelAsk(address,uint256)": FunctionFragment;
    "createAsk(address,uint256,uint256,address,address,uint16)": FunctionFragment;
    "erc20TransferHelper()": FunctionFragment;
    "erc721TransferHelper()": FunctionFragment;
    "fillAsk(address,uint256,address,uint256,address)": FunctionFragment;
    "name()": FunctionFragment;
    "registrar()": FunctionFragment;
    "setAskPrice(address,uint256,uint256,address)": FunctionFragment;
    "setRoyaltyEngineAddress(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "_handleRoyaltyEnginePayout"
      | "askForNFT"
      | "cancelAsk"
      | "createAsk"
      | "erc20TransferHelper"
      | "erc721TransferHelper"
      | "fillAsk"
      | "name"
      | "registrar"
      | "setAskPrice"
      | "setRoyaltyEngineAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "_handleRoyaltyEnginePayout",
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "askForNFT",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelAsk",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createAsk",
    values: [string, BigNumberish, BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20TransferHelper",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "erc721TransferHelper",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fillAsk",
    values: [string, BigNumberish, string, BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "registrar", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setAskPrice",
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRoyaltyEngineAddress",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "_handleRoyaltyEnginePayout",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "askForNFT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cancelAsk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createAsk", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "erc20TransferHelper",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "erc721TransferHelper",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fillAsk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registrar", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAskPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRoyaltyEngineAddress",
    data: BytesLike
  ): Result;

  events: {
    "AskCanceled(address,uint256,tuple)": EventFragment;
    "AskCreated(address,uint256,tuple)": EventFragment;
    "AskFilled(address,uint256,address,address,tuple)": EventFragment;
    "AskPriceUpdated(address,uint256,tuple)": EventFragment;
    "ExchangeExecuted(address,address,tuple,tuple)": EventFragment;
    "RoyaltyPayout(address,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AskCanceled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AskCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AskFilled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AskPriceUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ExchangeExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoyaltyPayout"): EventFragment;
}

export interface AskCanceledEventObject {
  tokenContract: string;
  tokenId: BigNumber;
  ask: AsksV1_1.AskStructOutput;
}
export type AskCanceledEvent = TypedEvent<
  [string, BigNumber, AsksV1_1.AskStructOutput],
  AskCanceledEventObject
>;

export type AskCanceledEventFilter = TypedEventFilter<AskCanceledEvent>;

export interface AskCreatedEventObject {
  tokenContract: string;
  tokenId: BigNumber;
  ask: AsksV1_1.AskStructOutput;
}
export type AskCreatedEvent = TypedEvent<
  [string, BigNumber, AsksV1_1.AskStructOutput],
  AskCreatedEventObject
>;

export type AskCreatedEventFilter = TypedEventFilter<AskCreatedEvent>;

export interface AskFilledEventObject {
  tokenContract: string;
  tokenId: BigNumber;
  buyer: string;
  finder: string;
  ask: AsksV1_1.AskStructOutput;
}
export type AskFilledEvent = TypedEvent<
  [string, BigNumber, string, string, AsksV1_1.AskStructOutput],
  AskFilledEventObject
>;

export type AskFilledEventFilter = TypedEventFilter<AskFilledEvent>;

export interface AskPriceUpdatedEventObject {
  tokenContract: string;
  tokenId: BigNumber;
  ask: AsksV1_1.AskStructOutput;
}
export type AskPriceUpdatedEvent = TypedEvent<
  [string, BigNumber, AsksV1_1.AskStructOutput],
  AskPriceUpdatedEventObject
>;

export type AskPriceUpdatedEventFilter = TypedEventFilter<AskPriceUpdatedEvent>;

export interface ExchangeExecutedEventObject {
  userA: string;
  userB: string;
  a: UniversalExchangeEventV1.ExchangeDetailsStructOutput;
  b: UniversalExchangeEventV1.ExchangeDetailsStructOutput;
}
export type ExchangeExecutedEvent = TypedEvent<
  [
    string,
    string,
    UniversalExchangeEventV1.ExchangeDetailsStructOutput,
    UniversalExchangeEventV1.ExchangeDetailsStructOutput
  ],
  ExchangeExecutedEventObject
>;

export type ExchangeExecutedEventFilter =
  TypedEventFilter<ExchangeExecutedEvent>;

export interface RoyaltyPayoutEventObject {
  tokenContract: string;
  tokenId: BigNumber;
  recipient: string;
  amount: BigNumber;
}
export type RoyaltyPayoutEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  RoyaltyPayoutEventObject
>;

export type RoyaltyPayoutEventFilter = TypedEventFilter<RoyaltyPayoutEvent>;

export interface AsksV1_1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AsksV1_1Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    askForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, number, BigNumber] & {
        seller: string;
        sellerFundsRecipient: string;
        askCurrency: string;
        findersFeeBps: number;
        askPrice: BigNumber;
      }
    >;

    cancelAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    erc20TransferHelper(overrides?: CallOverrides): Promise<[string]>;

    erc721TransferHelper(overrides?: CallOverrides): Promise<[string]>;

    fillAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _fillCurrency: string,
      _fillAmount: BigNumberish,
      _finder: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    registrar(overrides?: CallOverrides): Promise<[string]>;

    setAskPrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  _handleRoyaltyEnginePayout(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _amount: BigNumberish,
    _payoutCurrency: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  askForNFT(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, number, BigNumber] & {
      seller: string;
      sellerFundsRecipient: string;
      askCurrency: string;
      findersFeeBps: number;
      askPrice: BigNumber;
    }
  >;

  cancelAsk(
    _tokenContract: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createAsk(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _askPrice: BigNumberish,
    _askCurrency: string,
    _sellerFundsRecipient: string,
    _findersFeeBps: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  erc20TransferHelper(overrides?: CallOverrides): Promise<string>;

  erc721TransferHelper(overrides?: CallOverrides): Promise<string>;

  fillAsk(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _fillCurrency: string,
    _fillAmount: BigNumberish,
    _finder: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  registrar(overrides?: CallOverrides): Promise<string>;

  setAskPrice(
    _tokenContract: string,
    _tokenId: BigNumberish,
    _askPrice: BigNumberish,
    _askCurrency: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRoyaltyEngineAddress(
    _royaltyEngine: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    askForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, number, BigNumber] & {
        seller: string;
        sellerFundsRecipient: string;
        askCurrency: string;
        findersFeeBps: number;
        askPrice: BigNumber;
      }
    >;

    cancelAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    createAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    erc20TransferHelper(overrides?: CallOverrides): Promise<string>;

    erc721TransferHelper(overrides?: CallOverrides): Promise<string>;

    fillAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _fillCurrency: string,
      _fillAmount: BigNumberish,
      _finder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    registrar(overrides?: CallOverrides): Promise<string>;

    setAskPrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AskCanceled(address,uint256,tuple)"(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskCanceledEventFilter;
    AskCanceled(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskCanceledEventFilter;

    "AskCreated(address,uint256,tuple)"(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskCreatedEventFilter;
    AskCreated(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskCreatedEventFilter;

    "AskFilled(address,uint256,address,address,tuple)"(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      buyer?: string | null,
      finder?: null,
      ask?: null
    ): AskFilledEventFilter;
    AskFilled(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      buyer?: string | null,
      finder?: null,
      ask?: null
    ): AskFilledEventFilter;

    "AskPriceUpdated(address,uint256,tuple)"(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskPriceUpdatedEventFilter;
    AskPriceUpdated(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      ask?: null
    ): AskPriceUpdatedEventFilter;

    "ExchangeExecuted(address,address,tuple,tuple)"(
      userA?: string | null,
      userB?: string | null,
      a?: null,
      b?: null
    ): ExchangeExecutedEventFilter;
    ExchangeExecuted(
      userA?: string | null,
      userB?: string | null,
      a?: null,
      b?: null
    ): ExchangeExecutedEventFilter;

    "RoyaltyPayout(address,uint256,address,uint256)"(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      recipient?: null,
      amount?: null
    ): RoyaltyPayoutEventFilter;
    RoyaltyPayout(
      tokenContract?: string | null,
      tokenId?: BigNumberish | null,
      recipient?: null,
      amount?: null
    ): RoyaltyPayoutEventFilter;
  };

  estimateGas: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    askForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cancelAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    erc20TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;

    erc721TransferHelper(overrides?: CallOverrides): Promise<BigNumber>;

    fillAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _fillCurrency: string,
      _fillAmount: BigNumberish,
      _finder: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    registrar(overrides?: CallOverrides): Promise<BigNumber>;

    setAskPrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _handleRoyaltyEnginePayout(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _amount: BigNumberish,
      _payoutCurrency: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    askForNFT(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cancelAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      _sellerFundsRecipient: string,
      _findersFeeBps: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    erc20TransferHelper(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    erc721TransferHelper(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fillAsk(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _fillCurrency: string,
      _fillAmount: BigNumberish,
      _finder: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    registrar(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setAskPrice(
      _tokenContract: string,
      _tokenId: BigNumberish,
      _askPrice: BigNumberish,
      _askCurrency: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRoyaltyEngineAddress(
      _royaltyEngine: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
