import React from 'react';

import { useWeb3Context } from 'helpers/context/web3Context';

import Spinner from 'components/atoms/Icons';
import ButtonPrimary from './ButtonPrimary';

function ConnectWalletButton() {
  const { connect, currentAccountDisplayStr, loading, disconnect } = useWeb3Context({});
  return (
    <>
      {!loading && !currentAccountDisplayStr && (
        <ButtonPrimary type="button" onClick={connect} color="green">
          Connect wallet
        </ButtonPrimary>
      )}
      {loading && <Spinner />}
      {!loading && currentAccountDisplayStr && (
        <div className="relative p-3 text-lg font-medium bg-primary rounded-3xl">
          {currentAccountDisplayStr}
        </div>
      )}
    </>
  );
}

export default ConnectWalletButton;
