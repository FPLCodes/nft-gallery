"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSolanaWallet } from "../app/hooks/useSolanaWallet";
import { Button } from "@/components/ui/button";
import { Wallet, Loader2 } from "lucide-react";

interface ConnectWalletProps {
  onEthereumConnect: (address: string) => void;
  onSolanaConnect: (address: string) => void;
}

export default function ConnectWallet({
  onEthereumConnect,
  onSolanaConnect,
}: ConnectWalletProps) {
  const [ethAddress, setEthAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { solanaAddress, connectWallet: connectSolanaWallet } =
    useSolanaWallet();

  const connectEthereumWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      setIsConnecting(true);
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      try {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setEthAddress(address);
        onEthereumConnect(address);
      } catch (error) {
        console.error("Ethereum wallet connection failed", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (solanaAddress) {
      onSolanaConnect(solanaAddress);
    }
  }, [solanaAddress, onSolanaConnect]);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
      <Button
        onClick={ethAddress ? undefined : connectEthereumWallet}
        disabled={isConnecting}
        className="w-48 h-10"
      >
        {isConnecting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : ethAddress ? (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            {ethAddress.slice(0, 6) + "..." + ethAddress.slice(-4)}
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Ethereum
          </>
        )}
      </Button>
      <Button
        onClick={solanaAddress ? undefined : connectSolanaWallet}
        className="w-48 h-10"
      >
        {solanaAddress ? (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            {solanaAddress.slice(0, 6) + "..." + solanaAddress.slice(-4)}
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Solana
          </>
        )}
      </Button>
    </div>
  );
}
