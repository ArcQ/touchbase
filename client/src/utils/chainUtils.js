import supportedChains from 'constants/supportedChains';

export function getChainData(chainId) {
  if (!chainId) {
    return {
      name: 'null',
      short_name: 'null',
      chain: 'null',
      network: 'null',
      chain_id: 0,
      network_id: 0,
      rpc_url: 'null',
      native_currency: {
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: '18',
        contractAddress: '',
        balance: '',
      },
    };
  }
  const chainData = supportedChains.filter(chain => chain.chain_id === chainId)[0];

  if (!chainData) {
    throw new Error('ChainId missing or not supported');
  }

  const API_KEY = process.env.NEXT_PUBLIC_INFURA_ID;

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export function ellipseAddress(address = '', width = 10) {
  if (!address) {
    return '';
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function isProd() {
  if (typeof window !== 'undefined') {
    return window.location.host === 'ndfstarter.io';
  }
}

export const getCurrentChain = () => getChainData(parseInt(137, 10));
