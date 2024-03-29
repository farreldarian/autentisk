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
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ChainlinkRequestInterfaceInterface extends utils.Interface {
  functions: {
    "cancelOracleRequest(bytes32,uint256,bytes4,uint256)": FunctionFragment;
    "oracleRequest(address,uint256,bytes32,address,bytes4,uint256,uint256,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "cancelOracleRequest" | "oracleRequest"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelOracleRequest",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "oracleRequest",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "cancelOracleRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "oracleRequest",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ChainlinkRequestInterface extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ChainlinkRequestInterfaceInterface;

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
    cancelOracleRequest(
      requestId: PromiseOrValue<BytesLike>,
      payment: PromiseOrValue<BigNumberish>,
      callbackFunctionId: PromiseOrValue<BytesLike>,
      expiration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    oracleRequest(
      sender: PromiseOrValue<string>,
      requestPrice: PromiseOrValue<BigNumberish>,
      serviceAgreementID: PromiseOrValue<BytesLike>,
      callbackAddress: PromiseOrValue<string>,
      callbackFunctionId: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      dataVersion: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  cancelOracleRequest(
    requestId: PromiseOrValue<BytesLike>,
    payment: PromiseOrValue<BigNumberish>,
    callbackFunctionId: PromiseOrValue<BytesLike>,
    expiration: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  oracleRequest(
    sender: PromiseOrValue<string>,
    requestPrice: PromiseOrValue<BigNumberish>,
    serviceAgreementID: PromiseOrValue<BytesLike>,
    callbackAddress: PromiseOrValue<string>,
    callbackFunctionId: PromiseOrValue<BytesLike>,
    nonce: PromiseOrValue<BigNumberish>,
    dataVersion: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelOracleRequest(
      requestId: PromiseOrValue<BytesLike>,
      payment: PromiseOrValue<BigNumberish>,
      callbackFunctionId: PromiseOrValue<BytesLike>,
      expiration: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    oracleRequest(
      sender: PromiseOrValue<string>,
      requestPrice: PromiseOrValue<BigNumberish>,
      serviceAgreementID: PromiseOrValue<BytesLike>,
      callbackAddress: PromiseOrValue<string>,
      callbackFunctionId: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      dataVersion: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    cancelOracleRequest(
      requestId: PromiseOrValue<BytesLike>,
      payment: PromiseOrValue<BigNumberish>,
      callbackFunctionId: PromiseOrValue<BytesLike>,
      expiration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    oracleRequest(
      sender: PromiseOrValue<string>,
      requestPrice: PromiseOrValue<BigNumberish>,
      serviceAgreementID: PromiseOrValue<BytesLike>,
      callbackAddress: PromiseOrValue<string>,
      callbackFunctionId: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      dataVersion: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelOracleRequest(
      requestId: PromiseOrValue<BytesLike>,
      payment: PromiseOrValue<BigNumberish>,
      callbackFunctionId: PromiseOrValue<BytesLike>,
      expiration: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    oracleRequest(
      sender: PromiseOrValue<string>,
      requestPrice: PromiseOrValue<BigNumberish>,
      serviceAgreementID: PromiseOrValue<BytesLike>,
      callbackAddress: PromiseOrValue<string>,
      callbackFunctionId: PromiseOrValue<BytesLike>,
      nonce: PromiseOrValue<BigNumberish>,
      dataVersion: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
