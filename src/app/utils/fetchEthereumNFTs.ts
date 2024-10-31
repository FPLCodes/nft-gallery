import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
});

export async function fetchEthereumNFTs(walletAddress: string) {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
    return nfts.ownedNfts;
  } catch (error) {
    console.error("Failed to fetch Ethereum NFTs:", error);
    return [];
  }
}
