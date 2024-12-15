import { UTxO } from "lucid-cardano";

export type NFTCategory =
  | "Pixel Art"
  | "Game Assets"
  | "Collectibles"
  | "Virtual Land"
  | "Avatars";

export interface NFTListing {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  seller: string;
  category: NFTCategory;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  utxo: UTxO;
}

export interface TokenListing {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  seller: string;
  utxo: UTxO;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  category: NFTCategory;
  rarity: string;
}

export type ListingType = "NFT" | "Token";
