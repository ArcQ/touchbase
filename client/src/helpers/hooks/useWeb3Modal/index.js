import { useCallback, useEffect, useReducer, useState } from 'react';
import { providers } from 'ethers';

import ensService from 'services/ensService';
import initiateWeb3Modal from 'helpers/hooks/useWeb3Modal/initiateWeb3Modal';
import { toastError } from 'utils/appToast';

const initialState = {
  provider: null,
  web3Provider: null,
  account: null,
  chainId: null,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CONNECT_START':
      return {
        ...state,
        loading: true,
      };
    case 'CONNECT_SUCCESS':
      return {
        ...state,
        loading: false,
        provider: action.provider,
        web3Provider: action.web3Provider,
        currentAccount: action.currentAccount,
        chainId: action.chainId,
      };
    case 'CONNECT_ERROR':
      return {
        ...state,
        loading: false,
      };
    case 'ACCOUNT_CHANGED':
      return {
        ...state,
        currentAccount: action.currentAccount,
      };
    case 'CHAIN_CHANGED':
      return {
        ...state,
        chainId: action.chainId,
      };
    case 'RESET':
      return initialState;
    default:
      throw new Error();
  }
}

const useEnsMappings = () => {
  const [ensMappings, setEnsMappings] = useState({});
  // const updateEnsMappings = async accounts => {
  //   const newEnsKvPairs = await ensService.bulkLookupAddress(accounts);
  //   const newMappings = newEnsKvPairs.reduce(
  //     (prev, newEnvKeyPair) => ({
  //       ...prev,
  //       [newEnvKeyPair.address]: newEnvKeyPair.ensAddress,
  //     }),
  //     ensMappings,
  //   );
  //   setEnsMappings(newMappings);
  // };
  const updateEnsMappings = async () => {};

  return { ensMappings, updateEnsMappings };
};

const getConnectWeb3Modal = (dispatch, updateEnsMappings) => async () => {
  const _provider = await window.web3Modal.connect();

  const _web3Provider = new providers.Web3Provider(_provider);
  try {
    const signer = _web3Provider.getSigner();
    const _account = await signer.getAddress();
    const network = await _web3Provider.getNetwork();
    if (!_account) {
      toastError('Could not activate properly.');
      throw new Error('no metamask');
    }

    ensService.init(_provider);
    updateEnsMappings([_account]);

    dispatch({
      type: 'CONNECT_SUCCESS',
      provider: _provider,
      web3Provider: _web3Provider,
      currentAccount: _account,
      chainId: network.chainId,
    });
  } catch (e) {
    dispatch({
      type: 'CONNECT_ERROR',
    });
    window.web3Modal.clearCachedProvider();
  }
};

const formatAccountStr = (account, ensMappings) => {
  const address = ensMappings?.[account] || account;
  const shortAddress =
    address && address.length > 20
      ? ''.concat(address.slice(0, 4), '...', address.slice(-4))
      : address;
  return shortAddress;
};

const eagerConnect = connect => {
  useEffect(() => {
    if (window?.web3Modal?.cachedProvider) {
      connect();
    }
  }, [connect]);
};

const useWatchWeb3Events = (provider, onDisconnect, dispatch, updateEnsMappings) => {
  const disconnect = useCallback(async () => {
    window.web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }
    if (onDisconnect) {
      onDisconnect();
    }
    dispatch({
      type: 'RESET',
    });
  }, [provider, onDisconnect]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = accounts => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          updateEnsMappings(accounts[0]);
          dispatch({
            type: 'ACCOUNT_CHANGED',
            currentAccount: accounts[0],
          });
        }
      };

      const handleChainChanged = _chainId => {
        dispatch({
          type: 'CHAIN_CHANGED',
          chainId: parseInt(_chainId, 16),
        });
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
    return () => {};
  }, [provider, disconnect]);
};

const useWeb3Modal = ({ onDisconnect, onConnect, onConnectFail }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, provider, web3Provider, currentAccount, chainId } = state;

  useEffect(() => {
    if (window) {
      initiateWeb3Modal();
    }
  }, []);

  useEffect(() => {
    if (provider) {
      ensService.init(provider);
    }
  }, [provider]);

  const { ensMappings, updateEnsMappings } = useEnsMappings();

  const connect = useCallback(getConnectWeb3Modal(dispatch, updateEnsMappings), []);

  eagerConnect(connect);

  useEffect(() => {
    if (web3Provider && onConnect) {
      onConnect();
    } else if (onConnectFail) {
      onConnectFail();
    }
  }, [web3Provider, onConnect, onConnectFail]);

  useWatchWeb3Events(provider, onDisconnect, dispatch, updateEnsMappings);

  return {
    connect,
    chainId,
    currentAccount,
    currentAccountDisplayStr: formatAccountStr(currentAccount, ensMappings),
    web3Provider,
    loading,
  };
};

export default useWeb3Modal;
