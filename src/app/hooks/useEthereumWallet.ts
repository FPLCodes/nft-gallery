import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export function useEthereumWallet() {
  const { activate, account, deactivate } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error("Ethereum wallet connection failed", error);
    }
  };

  const disconnect = () => deactivate();

  return { account, connect, disconnect };
}
