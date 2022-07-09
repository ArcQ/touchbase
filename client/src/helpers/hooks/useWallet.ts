import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import useEventEmitter, { EventEmitter } from 'helpers/hooks/useEventEmitter';
import useEthers from 'helpers/hooks/useEthers';
import { Connect } from 'helpers/hooks/useEthers/types';
import makeWallet, { Wallet, WalletAddress } from 'utils/Wallet';

const WalletContext = createContext<[Wallet | undefined, Connect | undefined]>([
  undefined,
  undefined,
]);

export default function useWallet(): [Wallet | undefined, Connect | undefined] {
  return useContext(WalletContext);
}

export type Props = {
  children: ReactNode;
};

export function WalletProvider({ children }: Props): ReactElement {
  const [provider, signer, connect] = useEthers();
  const [wallet, setWallet] = useState<Wallet | undefined>();
  // We defer exposing the connect function here because it takes a little
  // while to get the user's wallet address even when the Web3Modal is ready.
  const [connectReady, setConnectReady] = useState(false);

  const updateWallet = useCallback(
    (account: WalletAddress) => {
      if (!account) {
        setWallet(undefined);
      } else {
        setWallet(makeWallet(account, signer));
      }
    },
    [signer],
  );

  useEffect(() => {
    if (signer) {
      void signer
        .getAddress()
        .then(updateWallet)
        .finally(() => setConnectReady(true));
    } else if (connect) {
      setConnectReady(true);
    }
  }, [signer, connect, updateWallet]);

  useEventEmitter<WalletAddress[]>(
    provider?.provider as EventEmitter,
    'accountsChanged',
    () => updateWallet[0],
  );
  useEventEmitter<number>(provider?.provider as EventEmitter, 'chainChanged', () =>
    window.location.reload(),
  );

  return (
    <WalletContext.Provider value={[wallet, connectReady ? connect : undefined]}>
      {children}
    </WalletContext.Provider>
  );
}
