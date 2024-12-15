import React from 'react';
import { NFTListing, TokenListing } from '../types/marketplace';
import { StarIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

interface TableViewProps {
    listings: (NFTListing | TokenListing)[];
    onPurchase: (listing: NFTListing | TokenListing) => void;
}

export const TableView: React.FC<TableViewProps> = ({ listings, onPurchase }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white/90 backdrop-blur-sm rounded-xl border-4 border-black pixel-border">
                <thead>
                    <tr className="border-b-4 border-black">
                        <th className="p-4 text-left font-pixel">Preview</th>
                        <th className="p-4 text-left font-pixel">Name</th>
                        <th className="p-4 text-left font-pixel">Category</th>
                        <th className="p-4 text-left font-pixel">Rarity</th>
                        <th className="p-4 text-left font-pixel">Price</th>
                        <th className="p-4 text-left font-pixel">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((listing) => {
                        const nftListing = listing as NFTListing;
                        const rarityColors = {
                            Common: 'bg-accent-blue',
                            Uncommon: 'bg-secondary',
                            Rare: 'bg-accent-purple',
                            Epic: 'bg-accent-pink',
                            Legendary: 'bg-accent-yellow text-black',
                        };

                        return (
                            <tr key={listing.id} className="border-b border-black/10 hover:bg-black/5">
                                <td className="p-4">
                                    <img
                                        src={nftListing.image}
                                        alt={listing.name}
                                        className="w-16 h-16 rounded-lg object-cover image-pixelated"
                                    />
                                </td>
                                <td className="p-4 font-pixel text-sm">{listing.name}</td>
                                <td className="p-4">
                                    <span className="bg-accent-yellow text-black px-3 py-1.5 rounded-full text-xs font-pixel">
                                        {nftListing.category}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={classNames(
                                        'flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs w-fit',
                                        rarityColors[nftListing.rarity as keyof typeof rarityColors]
                                    )}>
                                        <StarIcon className="w-4 h-4" />
                                        {nftListing.rarity}
                                    </span>
                                </td>
                                <td className="p-4 font-pixel text-primary">{listing.price} ADA</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => onPurchase(listing)}
                                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors font-pixel text-sm"
                                    >
                                        Purchase
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};