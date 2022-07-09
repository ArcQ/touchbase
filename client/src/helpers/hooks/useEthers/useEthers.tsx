import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactElement,
  ReactNode,
} from 'react';
import { ethers } from 'ethers';
import useWeb3Provider from './useWeb3Provider';
import type { Connect } from './types';

export type EthersContextValue = [
  ethers.providers.Web3Provider | undefined,
  ethers.Signer | undefined,
  Connect | undefined,
];

const EthersContext = createContext<EthersContextValue>([
  undefined,
  undefined,
  undefined,
]);

export default function useEthers(): EthersContextValue {
  return useContext(EthersContext);
}

export type Props = {
  children: ReactNode;
};

export function EthersProvider({ children }: Props): ReactElement {
  const [web3Provider, connect] = useWeb3Provider();
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [signer, setSigner] = useState<ethers.Signer | undefined>();

  useEffect(() => {
    if (web3Provider) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const provider = new ethers.providers.Web3Provider(web3Provider, 'any');
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
    } else {
      setProvider(undefined);
      setSigner(undefined);
    }
  }, [web3Provider]);

  return (
    <EthersContext.Provider value={[provider, signer, connect]}>
      {children}
    </EthersContext.Provider>
  );
}
