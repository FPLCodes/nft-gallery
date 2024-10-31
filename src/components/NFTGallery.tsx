"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchEthereumNFTs } from "../app/utils/fetchEthereumNFTs";
import { fetchSolanaNFTs } from "../app/utils/fetchSolanaNFTs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NFT {
  id: string;
  title: string;
  image: string;
  description?: string;
}

export default function NFTGallery({ chain, address }) {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadNFTs() {
      setIsLoading(true);
      if (address) {
        let fetchedNFTs: NFT[] = [];
        if (chain === "ethereum") {
          const ethNFTs = await fetchEthereumNFTs(address);
          fetchedNFTs = ethNFTs.map((nft) => ({
            id: nft.id.tokenId,
            title: nft.title || "Unnamed NFT",
            image: nft.media[0]?.gateway || "/placeholder.jpg",
            description: nft.description,
          }));
        } else if (chain === "solana") {
          const solanaNFTs = await fetchSolanaNFTs(address);
          fetchedNFTs = solanaNFTs.map((nft) => ({
            id: nft.mintAddress,
            title: nft.name || "Unnamed NFT",
            image: nft.metadata?.image || "/placeholder.jpg",
            description: nft.metadata?.description,
          }));
        }
        setNFTs(fetchedNFTs);
      }
      setIsLoading(false);
    }
    loadNFTs();
  }, [address, chain]);

  if (!address) {
    return (
      <div className="text-center text-gray-500 mt-8">
        Please connect your {chain === "ethereum" ? "Ethereum" : "Solana"}{" "}
        wallet to view your NFTs.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {[...Array(8)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {nfts.map((nft) => (
        <Card
          key={nft.id}
          className="overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div className="relative h-48 w-full">
            <Image
              src={nft.image}
              alt={nft.title}
              layout="fill"
              objectFit="cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.jpg";
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2 truncate">{nft.title}</h3>
            {nft.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {nft.description}
              </p>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50 p-2">
            <p className="text-xs text-gray-500">ID: {nft.id.slice(0, 8)}...</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
