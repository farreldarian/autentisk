import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Account = {
  __typename?: 'Account';
  collections: Array<Collection>;
  id: Scalars['ID'];
  tokens: Array<Token>;
};


export type AccountCollectionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Collection_Filter>;
};


export type AccountTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  collections_?: InputMaybe<Collection_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokens_?: InputMaybe<Token_Filter>;
};

export enum Account_OrderBy {
  Collections = 'collections',
  Id = 'id',
  Tokens = 'tokens'
}

export type Ask = {
  __typename?: 'Ask';
  createdAt: Scalars['BigInt'];
  currency: Currency;
  id: Scalars['ID'];
  price: Scalars['BigDecimal'];
  seller: Account;
  token: Token;
};

export type AskHistory = {
  __typename?: 'AskHistory';
  buyer?: Maybe<Account>;
  createdAt: Scalars['BigInt'];
  currency: Currency;
  id: Scalars['ID'];
  price: Scalars['BigDecimal'];
  seller: Account;
  soldAt?: Maybe<Scalars['BigInt']>;
  token: Token;
};

export type AskHistory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  buyer?: InputMaybe<Scalars['String']>;
  buyer_?: InputMaybe<Account_Filter>;
  buyer_contains?: InputMaybe<Scalars['String']>;
  buyer_contains_nocase?: InputMaybe<Scalars['String']>;
  buyer_ends_with?: InputMaybe<Scalars['String']>;
  buyer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_gt?: InputMaybe<Scalars['String']>;
  buyer_gte?: InputMaybe<Scalars['String']>;
  buyer_in?: InputMaybe<Array<Scalars['String']>>;
  buyer_lt?: InputMaybe<Scalars['String']>;
  buyer_lte?: InputMaybe<Scalars['String']>;
  buyer_not?: InputMaybe<Scalars['String']>;
  buyer_not_contains?: InputMaybe<Scalars['String']>;
  buyer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  buyer_not_ends_with?: InputMaybe<Scalars['String']>;
  buyer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_not_in?: InputMaybe<Array<Scalars['String']>>;
  buyer_not_starts_with?: InputMaybe<Scalars['String']>;
  buyer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  buyer_starts_with?: InputMaybe<Scalars['String']>;
  buyer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Scalars['String']>;
  currency_?: InputMaybe<Currency_Filter>;
  currency_contains?: InputMaybe<Scalars['String']>;
  currency_contains_nocase?: InputMaybe<Scalars['String']>;
  currency_ends_with?: InputMaybe<Scalars['String']>;
  currency_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currency_gt?: InputMaybe<Scalars['String']>;
  currency_gte?: InputMaybe<Scalars['String']>;
  currency_in?: InputMaybe<Array<Scalars['String']>>;
  currency_lt?: InputMaybe<Scalars['String']>;
  currency_lte?: InputMaybe<Scalars['String']>;
  currency_not?: InputMaybe<Scalars['String']>;
  currency_not_contains?: InputMaybe<Scalars['String']>;
  currency_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  currency_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currency_not_in?: InputMaybe<Array<Scalars['String']>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  currency_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currency_starts_with?: InputMaybe<Scalars['String']>;
  currency_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  price?: InputMaybe<Scalars['BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_lt?: InputMaybe<Scalars['BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']>;
  price_not?: InputMaybe<Scalars['BigDecimal']>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  seller?: InputMaybe<Scalars['String']>;
  seller_?: InputMaybe<Account_Filter>;
  seller_contains?: InputMaybe<Scalars['String']>;
  seller_contains_nocase?: InputMaybe<Scalars['String']>;
  seller_ends_with?: InputMaybe<Scalars['String']>;
  seller_ends_with_nocase?: InputMaybe<Scalars['String']>;
  seller_gt?: InputMaybe<Scalars['String']>;
  seller_gte?: InputMaybe<Scalars['String']>;
  seller_in?: InputMaybe<Array<Scalars['String']>>;
  seller_lt?: InputMaybe<Scalars['String']>;
  seller_lte?: InputMaybe<Scalars['String']>;
  seller_not?: InputMaybe<Scalars['String']>;
  seller_not_contains?: InputMaybe<Scalars['String']>;
  seller_not_contains_nocase?: InputMaybe<Scalars['String']>;
  seller_not_ends_with?: InputMaybe<Scalars['String']>;
  seller_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  seller_not_in?: InputMaybe<Array<Scalars['String']>>;
  seller_not_starts_with?: InputMaybe<Scalars['String']>;
  seller_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  seller_starts_with?: InputMaybe<Scalars['String']>;
  seller_starts_with_nocase?: InputMaybe<Scalars['String']>;
  soldAt?: InputMaybe<Scalars['BigInt']>;
  soldAt_gt?: InputMaybe<Scalars['BigInt']>;
  soldAt_gte?: InputMaybe<Scalars['BigInt']>;
  soldAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  soldAt_lt?: InputMaybe<Scalars['BigInt']>;
  soldAt_lte?: InputMaybe<Scalars['BigInt']>;
  soldAt_not?: InputMaybe<Scalars['BigInt']>;
  soldAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum AskHistory_OrderBy {
  Buyer = 'buyer',
  CreatedAt = 'createdAt',
  Currency = 'currency',
  Id = 'id',
  Price = 'price',
  Seller = 'seller',
  SoldAt = 'soldAt',
  Token = 'token'
}

export type Ask_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  createdAt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currency?: InputMaybe<Scalars['String']>;
  currency_?: InputMaybe<Currency_Filter>;
  currency_contains?: InputMaybe<Scalars['String']>;
  currency_contains_nocase?: InputMaybe<Scalars['String']>;
  currency_ends_with?: InputMaybe<Scalars['String']>;
  currency_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currency_gt?: InputMaybe<Scalars['String']>;
  currency_gte?: InputMaybe<Scalars['String']>;
  currency_in?: InputMaybe<Array<Scalars['String']>>;
  currency_lt?: InputMaybe<Scalars['String']>;
  currency_lte?: InputMaybe<Scalars['String']>;
  currency_not?: InputMaybe<Scalars['String']>;
  currency_not_contains?: InputMaybe<Scalars['String']>;
  currency_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  currency_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currency_not_in?: InputMaybe<Array<Scalars['String']>>;
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  currency_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currency_starts_with?: InputMaybe<Scalars['String']>;
  currency_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  price?: InputMaybe<Scalars['BigDecimal']>;
  price_gt?: InputMaybe<Scalars['BigDecimal']>;
  price_gte?: InputMaybe<Scalars['BigDecimal']>;
  price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_lt?: InputMaybe<Scalars['BigDecimal']>;
  price_lte?: InputMaybe<Scalars['BigDecimal']>;
  price_not?: InputMaybe<Scalars['BigDecimal']>;
  price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  seller?: InputMaybe<Scalars['String']>;
  seller_?: InputMaybe<Account_Filter>;
  seller_contains?: InputMaybe<Scalars['String']>;
  seller_contains_nocase?: InputMaybe<Scalars['String']>;
  seller_ends_with?: InputMaybe<Scalars['String']>;
  seller_ends_with_nocase?: InputMaybe<Scalars['String']>;
  seller_gt?: InputMaybe<Scalars['String']>;
  seller_gte?: InputMaybe<Scalars['String']>;
  seller_in?: InputMaybe<Array<Scalars['String']>>;
  seller_lt?: InputMaybe<Scalars['String']>;
  seller_lte?: InputMaybe<Scalars['String']>;
  seller_not?: InputMaybe<Scalars['String']>;
  seller_not_contains?: InputMaybe<Scalars['String']>;
  seller_not_contains_nocase?: InputMaybe<Scalars['String']>;
  seller_not_ends_with?: InputMaybe<Scalars['String']>;
  seller_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  seller_not_in?: InputMaybe<Array<Scalars['String']>>;
  seller_not_starts_with?: InputMaybe<Scalars['String']>;
  seller_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  seller_starts_with?: InputMaybe<Scalars['String']>;
  seller_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Ask_OrderBy {
  CreatedAt = 'createdAt',
  Currency = 'currency',
  Id = 'id',
  Price = 'price',
  Seller = 'seller',
  Token = 'token'
}

export type AuthenticityRequest = {
  __typename?: 'AuthenticityRequest';
  collection: Collection;
  id: Scalars['ID'];
  similarity?: Maybe<Scalars['BigDecimal']>;
  status: AuthenticityRequestStatus;
  tokenUri: Scalars['String'];
  tokenUriSignature: Scalars['String'];
};

export enum AuthenticityRequestStatus {
  Pending = 'Pending',
  Registered = 'Registered',
  Rejected = 'Rejected'
}

export type AuthenticityRequest_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  collection?: InputMaybe<Scalars['String']>;
  collection_?: InputMaybe<Collection_Filter>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  similarity?: InputMaybe<Scalars['BigDecimal']>;
  similarity_gt?: InputMaybe<Scalars['BigDecimal']>;
  similarity_gte?: InputMaybe<Scalars['BigDecimal']>;
  similarity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  similarity_lt?: InputMaybe<Scalars['BigDecimal']>;
  similarity_lte?: InputMaybe<Scalars['BigDecimal']>;
  similarity_not?: InputMaybe<Scalars['BigDecimal']>;
  similarity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  status?: InputMaybe<AuthenticityRequestStatus>;
  status_in?: InputMaybe<Array<AuthenticityRequestStatus>>;
  status_not?: InputMaybe<AuthenticityRequestStatus>;
  status_not_in?: InputMaybe<Array<AuthenticityRequestStatus>>;
  tokenUri?: InputMaybe<Scalars['String']>;
  tokenUriSignature?: InputMaybe<Scalars['String']>;
  tokenUriSignature_contains?: InputMaybe<Scalars['String']>;
  tokenUriSignature_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenUriSignature_ends_with?: InputMaybe<Scalars['String']>;
  tokenUriSignature_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenUriSignature_gt?: InputMaybe<Scalars['String']>;
  tokenUriSignature_gte?: InputMaybe<Scalars['String']>;
  tokenUriSignature_in?: InputMaybe<Array<Scalars['String']>>;
  tokenUriSignature_lt?: InputMaybe<Scalars['String']>;
  tokenUriSignature_lte?: InputMaybe<Scalars['String']>;
  tokenUriSignature_not?: InputMaybe<Scalars['String']>;
  tokenUriSignature_not_contains?: InputMaybe<Scalars['String']>;
  tokenUriSignature_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenUriSignature_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenUriSignature_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenUriSignature_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenUriSignature_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenUriSignature_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenUriSignature_starts_with?: InputMaybe<Scalars['String']>;
  tokenUriSignature_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenUri_contains?: InputMaybe<Scalars['String']>;
  tokenUri_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenUri_ends_with?: InputMaybe<Scalars['String']>;
  tokenUri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenUri_gt?: InputMaybe<Scalars['String']>;
  tokenUri_gte?: InputMaybe<Scalars['String']>;
  tokenUri_in?: InputMaybe<Array<Scalars['String']>>;
  tokenUri_lt?: InputMaybe<Scalars['String']>;
  tokenUri_lte?: InputMaybe<Scalars['String']>;
  tokenUri_not?: InputMaybe<Scalars['String']>;
  tokenUri_not_contains?: InputMaybe<Scalars['String']>;
  tokenUri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tokenUri_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenUri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tokenUri_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenUri_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenUri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokenUri_starts_with?: InputMaybe<Scalars['String']>;
  tokenUri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum AuthenticityRequest_OrderBy {
  Collection = 'collection',
  Id = 'id',
  Similarity = 'similarity',
  Status = 'status',
  TokenUri = 'tokenUri',
  TokenUriSignature = 'tokenUriSignature'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Collection = {
  __typename?: 'Collection';
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: Account;
  symbol: Scalars['String'];
  tokens: Array<Token>;
};


export type CollectionTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Token_Filter>;
};

export type Collection_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tokens_?: InputMaybe<Token_Filter>;
};

export enum Collection_OrderBy {
  Id = 'id',
  Name = 'name',
  Owner = 'owner',
  Symbol = 'symbol',
  Tokens = 'tokens'
}

export type Currency = {
  __typename?: 'Currency';
  decimal: Scalars['Int'];
  id: Scalars['ID'];
  symbol: Scalars['String'];
};

export type Currency_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  decimal?: InputMaybe<Scalars['Int']>;
  decimal_gt?: InputMaybe<Scalars['Int']>;
  decimal_gte?: InputMaybe<Scalars['Int']>;
  decimal_in?: InputMaybe<Array<Scalars['Int']>>;
  decimal_lt?: InputMaybe<Scalars['Int']>;
  decimal_lte?: InputMaybe<Scalars['Int']>;
  decimal_not?: InputMaybe<Scalars['Int']>;
  decimal_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Currency_OrderBy {
  Decimal = 'decimal',
  Id = 'id',
  Symbol = 'symbol'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  ask?: Maybe<Ask>;
  askHistories: Array<AskHistory>;
  askHistory?: Maybe<AskHistory>;
  asks: Array<Ask>;
  authenticityRequest?: Maybe<AuthenticityRequest>;
  authenticityRequests: Array<AuthenticityRequest>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  currencies: Array<Currency>;
  currency?: Maybe<Currency>;
  token?: Maybe<Token>;
  tokenMetadata: Array<TokenMetadata>;
  tokens: Array<Token>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryAskArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAskHistoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AskHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AskHistory_Filter>;
};


export type QueryAskHistoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAsksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ask_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Ask_Filter>;
};


export type QueryAuthenticityRequestArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAuthenticityRequestsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuthenticityRequest_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuthenticityRequest_Filter>;
};


export type QueryCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCollectionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collection_Filter>;
};


export type QueryCurrenciesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Currency_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Currency_Filter>;
};


export type QueryCurrencyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenMetadataArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenMetadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenMetadata_Filter>;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  ask?: Maybe<Ask>;
  askHistories: Array<AskHistory>;
  askHistory?: Maybe<AskHistory>;
  asks: Array<Ask>;
  authenticityRequest?: Maybe<AuthenticityRequest>;
  authenticityRequests: Array<AuthenticityRequest>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  currencies: Array<Currency>;
  currency?: Maybe<Currency>;
  token?: Maybe<Token>;
  tokenMetadata: Array<TokenMetadata>;
  tokens: Array<Token>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionAskArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAskHistoriesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AskHistory_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AskHistory_Filter>;
};


export type SubscriptionAskHistoryArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAsksArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ask_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Ask_Filter>;
};


export type SubscriptionAuthenticityRequestArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAuthenticityRequestsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AuthenticityRequest_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuthenticityRequest_Filter>;
};


export type SubscriptionCollectionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCollectionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Collection_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Collection_Filter>;
};


export type SubscriptionCurrenciesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Currency_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Currency_Filter>;
};


export type SubscriptionCurrencyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenMetadataArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenMetadata_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenMetadata_Filter>;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Token = {
  __typename?: 'Token';
  collection: Collection;
  id: Scalars['ID'];
  metadata?: Maybe<TokenMetadata>;
  mintedAt: Scalars['BigInt'];
  owner: Account;
  scId: Scalars['BigInt'];
  uri: Scalars['String'];
};

export type TokenMetadata = {
  __typename?: 'TokenMetadata';
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  token: Token;
};

export type TokenMetadata_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  image?: InputMaybe<Scalars['String']>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum TokenMetadata_OrderBy {
  Description = 'description',
  Id = 'id',
  Image = 'image',
  Name = 'name',
  Token = 'token'
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  collection?: InputMaybe<Scalars['String']>;
  collection_?: InputMaybe<Collection_Filter>;
  collection_contains?: InputMaybe<Scalars['String']>;
  collection_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_ends_with?: InputMaybe<Scalars['String']>;
  collection_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_gt?: InputMaybe<Scalars['String']>;
  collection_gte?: InputMaybe<Scalars['String']>;
  collection_in?: InputMaybe<Array<Scalars['String']>>;
  collection_lt?: InputMaybe<Scalars['String']>;
  collection_lte?: InputMaybe<Scalars['String']>;
  collection_not?: InputMaybe<Scalars['String']>;
  collection_not_contains?: InputMaybe<Scalars['String']>;
  collection_not_contains_nocase?: InputMaybe<Scalars['String']>;
  collection_not_ends_with?: InputMaybe<Scalars['String']>;
  collection_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  collection_not_in?: InputMaybe<Array<Scalars['String']>>;
  collection_not_starts_with?: InputMaybe<Scalars['String']>;
  collection_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  collection_starts_with?: InputMaybe<Scalars['String']>;
  collection_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_?: InputMaybe<TokenMetadata_Filter>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>;
  mintedAt?: InputMaybe<Scalars['BigInt']>;
  mintedAt_gt?: InputMaybe<Scalars['BigInt']>;
  mintedAt_gte?: InputMaybe<Scalars['BigInt']>;
  mintedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mintedAt_lt?: InputMaybe<Scalars['BigInt']>;
  mintedAt_lte?: InputMaybe<Scalars['BigInt']>;
  mintedAt_not?: InputMaybe<Scalars['BigInt']>;
  mintedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<Account_Filter>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  scId?: InputMaybe<Scalars['BigInt']>;
  scId_gt?: InputMaybe<Scalars['BigInt']>;
  scId_gte?: InputMaybe<Scalars['BigInt']>;
  scId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  scId_lt?: InputMaybe<Scalars['BigInt']>;
  scId_lte?: InputMaybe<Scalars['BigInt']>;
  scId_not?: InputMaybe<Scalars['BigInt']>;
  scId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  uri?: InputMaybe<Scalars['String']>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum Token_OrderBy {
  Collection = 'collection',
  Id = 'id',
  Metadata = 'metadata',
  MintedAt = 'mintedAt',
  Owner = 'owner',
  ScId = 'scId',
  Uri = 'uri'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Timestamp of the block if available, format depends on the chain */
  timestamp?: Maybe<Scalars['String']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type CollectionQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type CollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', name: string, owner: { __typename?: 'Account', id: string }, tokens: Array<{ __typename?: 'Token', id: string, scId: any, uri: string, owner: { __typename?: 'Account', id: string } }> } | null };

export type ActiveAskQueryVariables = Exact<{
  tokenId: Scalars['String'];
}>;


export type ActiveAskQuery = { __typename?: 'Query', asks: Array<{ __typename?: 'Ask', price: any, currency: { __typename?: 'Currency', id: string, symbol: string, decimal: number } }> };

export type CollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, name: string, owner: { __typename?: 'Account', id: string } }> };

export type FeaturedQueryVariables = Exact<{ [key: string]: never; }>;


export type FeaturedQuery = { __typename?: 'Query', tokens: Array<{ __typename?: 'Token', scId: any, uri: string, owner: { __typename?: 'Account', id: string }, collection: { __typename?: 'Collection', id: string, name: string } }> };

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', featured: Array<{ __typename?: 'Token', scId: any, uri: string, collection: { __typename?: 'Collection', id: string, name: string }, owner: { __typename?: 'Account', id: string } }>, tokens: Array<{ __typename?: 'Token', scId: any, uri: string, collection: { __typename?: 'Collection', id: string } }> };

export type ActivityRowFragment = { __typename?: 'AuthenticityRequest', status: AuthenticityRequestStatus, similarity?: any | null, tokenUri: string, tokenUriSignature: string, collection: { __typename?: 'Collection', name: string, owner: { __typename?: 'Account', id: string } } };

export type MintActivityQueryVariables = Exact<{ [key: string]: never; }>;


export type MintActivityQuery = { __typename?: 'Query', authenticityRequests: Array<{ __typename?: 'AuthenticityRequest', tokenUri: string, status: AuthenticityRequestStatus, similarity?: any | null, tokenUriSignature: string, collection: { __typename?: 'Collection', id: string, name: string, owner: { __typename?: 'Account', id: string } } }> };

export type UserCollectionsQueryVariables = Exact<{
  owner: Scalars['String'];
}>;


export type UserCollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string, name: string }> };

export type GetAskHistoriesQueryVariables = Exact<{
  tokenId: Scalars['String'];
}>;


export type GetAskHistoriesQuery = { __typename?: 'Query', askHistories: Array<{ __typename?: 'AskHistory', createdAt: any, id: string, price: any, soldAt?: any | null, seller: { __typename?: 'Account', id: string }, buyer?: { __typename?: 'Account', id: string } | null }> };

export type TokenPageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TokenPageQuery = { __typename?: 'Query', token?: { __typename?: 'Token', uri: string, mintedAt: any, owner: { __typename?: 'Account', id: string }, collection: { __typename?: 'Collection', id: string, name: string } } | null };

export const ActivityRowFragmentDoc = gql`
    fragment ActivityRow on AuthenticityRequest {
  status
  similarity
  tokenUri
  tokenUriSignature
  collection {
    name
    owner {
      id
    }
  }
}
    `;
export const CollectionDocument = gql`
    query Collection($address: ID!) {
  collection(id: $address) {
    name
    owner {
      id
    }
    tokens {
      id
      scId
      uri
      owner {
        id
      }
    }
  }
}
    `;

export function useCollectionQuery(options: Omit<Urql.UseQueryArgs<CollectionQueryVariables>, 'query'>) {
  return Urql.useQuery<CollectionQuery>({ query: CollectionDocument, ...options });
};
export const ActiveAskDocument = gql`
    query ActiveAsk($tokenId: String!) {
  asks(where: {token: $tokenId}) {
    currency {
      id
      symbol
      decimal
    }
    price
  }
}
    `;

export function useActiveAskQuery(options: Omit<Urql.UseQueryArgs<ActiveAskQueryVariables>, 'query'>) {
  return Urql.useQuery<ActiveAskQuery>({ query: ActiveAskDocument, ...options });
};
export const CollectionsDocument = gql`
    query Collections {
  collections {
    id
    owner {
      id
    }
    name
  }
}
    `;

export function useCollectionsQuery(options?: Omit<Urql.UseQueryArgs<CollectionsQueryVariables>, 'query'>) {
  return Urql.useQuery<CollectionsQuery>({ query: CollectionsDocument, ...options });
};
export const FeaturedDocument = gql`
    query Featured {
  tokens(first: 1) {
    scId
    uri
    owner {
      id
    }
    collection {
      id
      name
    }
  }
}
    `;

export function useFeaturedQuery(options?: Omit<Urql.UseQueryArgs<FeaturedQueryVariables>, 'query'>) {
  return Urql.useQuery<FeaturedQuery>({ query: FeaturedDocument, ...options });
};
export const HomeDocument = gql`
    query Home {
  featured: tokens(first: 1) {
    scId
    uri
    collection {
      id
      name
    }
    owner {
      id
    }
  }
  tokens(skip: 1) {
    scId
    uri
    collection {
      id
    }
  }
}
    `;

export function useHomeQuery(options?: Omit<Urql.UseQueryArgs<HomeQueryVariables>, 'query'>) {
  return Urql.useQuery<HomeQuery>({ query: HomeDocument, ...options });
};
export const MintActivityDocument = gql`
    query MintActivity {
  authenticityRequests {
    ...ActivityRow
    tokenUri
    status
    similarity
    collection {
      id
      name
      owner {
        id
      }
    }
  }
}
    ${ActivityRowFragmentDoc}`;

export function useMintActivityQuery(options?: Omit<Urql.UseQueryArgs<MintActivityQueryVariables>, 'query'>) {
  return Urql.useQuery<MintActivityQuery>({ query: MintActivityDocument, ...options });
};
export const UserCollectionsDocument = gql`
    query UserCollections($owner: String!) {
  collections(where: {owner: $owner}) {
    id
    name
  }
}
    `;

export function useUserCollectionsQuery(options: Omit<Urql.UseQueryArgs<UserCollectionsQueryVariables>, 'query'>) {
  return Urql.useQuery<UserCollectionsQuery>({ query: UserCollectionsDocument, ...options });
};
export const GetAskHistoriesDocument = gql`
    query getAskHistories($tokenId: String!) {
  askHistories(where: {token: $tokenId}) {
    createdAt
    id
    price
    soldAt
    seller {
      id
    }
    buyer {
      id
    }
  }
}
    `;

export function useGetAskHistoriesQuery(options: Omit<Urql.UseQueryArgs<GetAskHistoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAskHistoriesQuery>({ query: GetAskHistoriesDocument, ...options });
};
export const TokenPageDocument = gql`
    query TokenPage($id: ID!) {
  token(id: $id) {
    uri
    mintedAt
    owner {
      id
    }
    collection {
      id
      name
    }
  }
}
    `;

export function useTokenPageQuery(options: Omit<Urql.UseQueryArgs<TokenPageQueryVariables>, 'query'>) {
  return Urql.useQuery<TokenPageQuery>({ query: TokenPageDocument, ...options });
};