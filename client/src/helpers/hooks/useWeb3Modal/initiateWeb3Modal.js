import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
// import Torus from '@toruslabs/torus-embed';
import Portis from '@portis/web3';
import Authereum from 'authereum';

import { getCurrentChain } from 'utils/chainUtils';

const initiateWeb3Modal = async () => {
  if (typeof window !== 'undefined') {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: process.env.NEXT_PUBLIC_FORTMATIC_KEY,
        },
        // torus: {
        //   package: Torus,
        // },
        portis: {
          package: Portis,
          options: {
            id: process.env.NEXT_PUBLIC_PORTIS_ID,
          },
          authereum: {
            package: Authereum,
          },
        },
      },
    };
    window.web3Modal = new Web3Modal({
      network: getCurrentChain().network,
      cacheProvider: true,
      providerOptions,
      disableInjectedProvider: false,
      theme: 'dark',
    });
  }
};

export default initiateWeb3Modal;
