import { Signer } from 'ethers';
import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';

export type WalletAddress = string;

export interface Wallet {
  address: WalletAddress;

  // TODO: move chain ID out of wallet, and into its own provider?
  getChainId(): Promise<number>;
  signMessage(this: void, message: string): Promise<string>;
  sendTransaction(this: void, transaction: TransactionRequest): Promise<TransactionResponse>;
}

export default function makeWallet(address: WalletAddress, signer: Signer): Wallet {
  async function getChainId() {
    return signer.getChainId();
  }

  async function signMessage(message: string): Promise<string> {
    return signer.signMessage(message);
  }

  async function sendTransaction(transaction: TransactionRequest): Promise<TransactionResponse> {
    return signer.sendTransaction(transaction);
  }

  return { address, getChainId, signMessage, sendTransaction };
}
