import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function useSolanaWallet() {
  const { wallet, connect, disconnect, connected, publicKey } = useWallet();
  const { connection } = useConnection();

  const solanaAddress = publicKey?.toString();

  return { solanaAddress, connect, disconnect, connected, WalletMultiButton };
}
