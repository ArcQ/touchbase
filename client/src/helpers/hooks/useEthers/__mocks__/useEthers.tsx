import React, { ReactElement } from "react";
import type { Props, EthersContextValue } from "../useEthers";

export default function useEthers(): EthersContextValue {
  return [undefined, undefined, undefined];
}

export function EthersProvider({ children }: Props): ReactElement {
  return <>{children}</>;
}
