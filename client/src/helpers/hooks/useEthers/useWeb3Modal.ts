import { useEffect, useState } from "react";
import Web3Modal, { IProviderOptions as ProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { NETWORK_NAME, INFURA_ID } from "env";

export default function useWeb3Modal(): Web3Modal | undefined {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>();

  useEffect(() => {
    async function instantiate() {
      // Torus is not compatible with Node, so we have to defer the import so it does
      // not get called on SSR.
      const providerOptions: ProviderOptions = {};

      // Torus is erroring out in local dev, even when it's loaded later like this
      try {
        const { default: Torus } = await import("@toruslabs/torus-embed");
        providerOptions.torus = { package: Torus };
      } catch (e) {
        // to log somewhere
      }

      if (INFURA_ID) {
        providerOptions.walletconnect = {
          package: WalletConnectProvider,
          options: { infuraId: INFURA_ID },
        };
      }

      const newWeb3modal = new Web3Modal({
        network: NETWORK_NAME,
        cacheProvider: true,
        providerOptions,
        theme: {
          background: "rgb(20, 20, 20)",
          main: "rgb(255, 255, 255)",
          secondary: "rgb(255, 255, 255, 0.6)",
          border: "rgba(195, 195, 195, 0)",
          hover: "rgb(255, 255, 255, 0.06)",
        },
      });
      setWeb3Modal(newWeb3modal);
    }
    void instantiate();
  }, []);

  return web3Modal;
}
