import React from 'react';
import { NFTListing, TokenListing, ListingType } from '../types/marketplace';
import { StarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

interface ListingCardProps {
    listing: NFTListing | TokenListing;
    type: ListingType;
    onPurchase: () => void;
}

const RarityBadge: React.FC<{ rarity: string }> = ({ rarity }) => {
    const rarityColors = {
        Common: 'bg-accent-blue',
        Uncommon: 'bg-secondary',
        Rare: 'bg-accent-purple',
        Epic: 'bg-accent-pink',
        Legendary: 'bg-accent-yellow text-black',
    };

    return (
        <div className={classNames(
            'flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs animate-pulse-slow',
            rarityColors[rarity as keyof typeof rarityColors]
        )}>
            <StarIcon className="w-4 h-4" />
            {rarity}
        </div>
    );
};

export const ListingCard: React.FC<ListingCardProps> = ({ listing, type, onPurchase }) => {
    const nftListing = listing as NFTListing;

    return (
        <div className="bg-white border-4 border-black rounded-xl p-4 transform hover:scale-105 transition-all duration-200 pixel-border">
            {type === 'NFT' && (
                <>
                    <div className="relative">
                        <img
                            src={nftListing.image}
                            alt={listing.name}
                            className="w-full h-48 object-cover rounded-lg mb-4 image-pixelated"
                        />
                        <div className="absolute top-2 right-2">
                            <RarityBadge rarity={nftListing.rarity} />
                        </div>
                    </div>
                    <div className="bg-accent-yellow text-black px-3 py-1.5 rounded-full text-sm font-pixel mb-3 text-center">
                        {nftListing.category}
                    </div>
                </>
            )}
            <h3 className="text-lg font-pixel mb-3 text-accent-purple">{listing.name}</h3>
            {type === 'Token' && (
                <p className="text-sm text-gray-600 mb-2">
                    Amount: {(listing as TokenListing).amount} {(listing as TokenListing).symbol}
                </p>
            )}
            <div className="flex items-center gap-2 mb-4">
                <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                <span className="font-pixel text-lg text-primary">{listing.price} ADA</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">Seller: {listing.seller.slice(0, 8)}...</p>
            <button
                onClick={onPurchase}
                className="w-full bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-hover transition-colors font-pixel animate-bounce-slow"
            >
                Purchase
            </button>
        </div>
    );
};