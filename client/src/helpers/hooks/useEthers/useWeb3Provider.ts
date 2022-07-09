import { useEffect, useCallback, useState } from "react";
import { providers } from "ethers";
import useEventEmitter, { EventEmitter } from "hooks/useEventEmitter";
import useWeb3Modal from "./useWeb3Modal";
import type { WalletAddress } from "util/Wallet";
import type { ConnectOptions, Connect } from "./types";

type Web3Provider = providers.ExternalProvider & EventEmitter; // TODO: no package provides good types for this thing

export default function useWeb3Provider(): [
  Web3Provider | undefined,
  Connect | undefined,
] {
  const web3Modal = useWeb3Modal();
  const [web3Provider, setWeb3Provider] = useState<Web3Provider | undefined>();
  // We defer exposing the connect function so that we can be sure whether
  // the user's wallet was connected or not before showing any connect buttons
  // in the UI. Loading and initializing the Web3Modal is not instantaneous, so
  // we can't connect before it is ready.
  const [connectReady, setConnectReady] = useState(false);

  const connect = useCallback(
    async ({ prompt = true }: ConnectOptions = {}) => {
      try {
        if (prompt || web3Modal.cachedProvider) {
          setWeb3Provider((await web3Modal.connect()) as Web3Provider);
        }
        setConnectReady(true);
      } catch (error) {
        web3Modal.clearCachedProvider();
      }
    },
    [web3Modal],
  );

  useEventEmitter<WalletAddress[]>(
    web3Provider,
    "accountsChanged",
    (accounts: WalletAddress[]) => {
      if (accounts.length === 0) {
        web3Modal.clearCachedProvider();
      }
    },
  );

  useEffect(() => {
    if (web3Modal) void connect({ prompt: false });
  }, [web3Modal, connect]);

  return [web3Provider, connectReady ? connect : undefined];
}
