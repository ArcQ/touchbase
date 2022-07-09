import NetworkId from 'data/enums/Chains';
import type Network from 'data/types/Network';

export const SupportedChains: Record<NetworkId, Network> = {
  [NetworkId.EthereumMainnet]: {
    chainName: 'Ethereum',
    chainId: 1,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: ['https://etherscan.io/#/'],
  },
  [NetworkId.TestnetRinkeby]: {
    chainName: 'Rinkeby Testnet',
    chainId: 4,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: ['https://rinkeby.etherscan.io/#/'],
  },
  [NetworkId.TestnetKovan]: {
    chainName: 'Kovan Testnet',
    chainId: 42,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [''],
    blockExplorerUrls: ['https://kovan.etherscan.io/#/'],
  },
};
