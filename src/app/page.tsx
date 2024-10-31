"use client";

import { useState } from "react";
import NFTGallery from "@/components/NFTGallery";
import ConnectWallet from "@/components/ConnectWallet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [ethAddress, setEthAddress] = useState<string | null>(null);
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);

  const handleEthereumConnected = (address: string) => setEthAddress(address);
  const handleSolanaConnected = (address: string) => setSolanaAddress(address);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Cross-Chain NFT Gallery
        </h1>
        <ConnectWallet
          onEthereumConnect={handleEthereumConnected}
          onSolanaConnect={handleSolanaConnected}
        />
        <Tabs defaultValue="ethereum" className="mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="ethereum">Ethereum NFTs</TabsTrigger>
            <TabsTrigger value="solana">Solana NFTs</TabsTrigger>
          </TabsList>
          <TabsContent value="ethereum">
            <NFTGallery chain="ethereum" address={ethAddress} />
          </TabsContent>
          <TabsContent value="solana">
            <NFTGallery chain="solana" address={solanaAddress} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
