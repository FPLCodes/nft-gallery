import { useState, useEffect } from "react";
import { fetchEthereumNFTs } from "../utils/fetchEthereumNFTs";
import { fetchSolanaNFTs } from "../utils/fetchSolanaNFTs";

export default function NFTGallery({ ethAddress, solanaAddress }) {
  const [ethNFTs, setEthNFTs] = useState([]);
  const [solanaNFTs, setSolanaNFTs] = useState([]);

  useEffect(() => {
    async function loadNFTs() {
      if (ethAddress) {
        const nfts = await fetchEthereumNFTs(ethAddress);
        setEthNFTs(nfts);
      }
      if (solanaAddress) {
        const nfts = await fetchSolanaNFTs(solanaAddress);
        console.log(nfts);
        setSolanaNFTs(nfts);
      }
    }
    loadNFTs();
  }, [ethAddress, solanaAddress]);

  return (
    <div>
      <h2>Ethereum NFTs</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {ethNFTs.map((nft, index) => (
          <div
            key={index}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <img
              src={nft.media[0]?.gateway || "/placeholder.png"}
              alt={nft.title}
              style={{ width: "100%" }}
            />
            <h3>{nft.title || "Unnamed NFT"}</h3>
          </div>
        ))}
      </div>

      <h2>Solana NFTs</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {solanaNFTs.map((nft, index) => (
          <div
            key={index}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <img
              src={nft.metadata?.image || "/placeholder.png"}
              alt={nft.name}
              style={{ width: "100%" }}
            />
            <h3>{nft.name || "Unnamed NFT"}</h3>
            <p>Mint: {nft.mintAddress}</p>
            <p>
              Description:{" "}
              {nft.metadata?.description || "No description available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
