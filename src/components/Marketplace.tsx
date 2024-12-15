import React, { useState, useEffect } from 'react';

import { ListingCard } from './ListingCard';
import { NFTListing, TokenListing, NFTCategory } from '../types/marketplace';
import { WalletConnect } from './WalletConnect';
import { PurchaseModal } from './PurchaseModal';
import { CategoryFilter } from './CategoryFilter';
import { ViewToggle } from './ViewToggle';
import { TableView } from './TableView';
import { Logo } from './Logo';
import { useLucid } from '../context/LucidProvider';

export const Marketplace: React.FC = () => {
    const { lucid, address } = useLucid();
    const [listings, setListings] = useState<(NFTListing | TokenListing)[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState<NFTListing | TokenListing | null>(null);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<NFTCategory | null>(null);
    const [view, setView] = useState<'grid' | 'table'>('grid');

    const fetchListings = async () => {
        if (!lucid || !address) return;

        try {
            const mockListings: NFTListing[] = [
                {
                    id: '1',
                    name: 'Pixel Warrior',
                    description: 'A legendary pixel warrior NFT',
                    image: 'https://picsum.photos/seed/warrior/200/300',
                    price: 50,
                    seller: address,
                    category: 'Game Assets',
                    rarity: 'Legendary',
                    utxo: {} as any
                },
                {
                    id: '2',
                    name: 'Crypto Land Plot',
                    description: 'Virtual land in the metaverse',
                    image: 'https://picsum.photos/seed/land/200/300',
                    price: 75,
                    seller: address,
                    category: 'Virtual Land',
                    rarity: 'Rare',
                    utxo: {} as any
                },
                {
                    id: '3',
                    name: 'Pixel Avatar',
                    description: 'Unique pixel art avatar',
                    image: 'https://picsum.photos/seed/avatar/200/300',
                    price: 30,
                    seller: address,
                    category: 'Avatars',
                    rarity: 'Epic',
                    utxo: {} as any
                },
                {
                    id: '4',
                    name: 'Retro Landscape',
                    description: 'Beautiful pixel art landscape',
                    image: 'https://picsum.photos/seed/landscape/200/300',
                    price: 45,
                    seller: address,
                    category: 'Pixel Art',
                    rarity: 'Uncommon',
                    utxo: {} as any
                },
                {
                    id: '5',
                    name: 'Pixel Pet',
                    description: 'Adorable virtual pet companion',
                    image: 'https://picsum.photos/seed/pet/200/300',
                    price: 25,
                    seller: address,
                    category: 'Game Assets',
                    rarity: 'Common',
                    utxo: {} as any
                },
                {
                    id: '6',
                    name: 'Crypto Castle',
                    description: 'Majestic virtual castle',
                    image: 'https://picsum.photos/seed/castle/200/300',
                    price: 120,
                    seller: address,
                    category: 'Virtual Land',
                    rarity: 'Epic',
                    utxo: {} as any
                },
                {
                    id: '7',
                    name: 'Retro Hero',
                    description: '8-bit hero character',
                    image: 'https://picsum.photos/seed/hero/200/300',
                    price: 60,
                    seller: address,
                    category: 'Collectibles',
                    rarity: 'Rare',
                    utxo: {} as any
                },
                {
                    id: '8',
                    name: 'Pixel Dragon',
                    description: 'Mythical pixel dragon',
                    image: 'https://picsum.photos/seed/dragon/200/300',
                    price: 90,
                    seller: address,
                    category: 'Game Assets',
                    rarity: 'Legendary',
                    utxo: {} as any
                }
            ];

            setListings(mockListings);
        } catch (error) {
            console.error("Error fetching listings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, [lucid, address]);

    const handlePurchase = (listing: NFTListing | TokenListing) => {
        setSelectedListing(listing);
        setShowPurchaseModal(true);
    };

    const handlePurchaseSuccess = () => {
        fetchListings();
    };

    const filteredListings = selectedCategory
        ? listings.filter((listing) =>
            'category' in listing && listing.category === selectedCategory
        )
        : listings;

    return (
        <div className="min-h-screen bg-gradient-to-br from-accent-purple via-accent-pink to-accent-yellow relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHptMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz4KPC9zdmc+')] opacity-20"></div>

            <div className="relative">
                <header className="bg-black/20 backdrop-blur-sm">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <Logo />
                        <WalletConnect />
                    </div>
                </header>

                <main className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-pixel text-center mb-12 rainbow-text">
                        NFT Marketplace
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <CategoryFilter
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                        <ViewToggle view={view} onViewChange={setView} />
                    </div>

                    {loading ? (
                        <div className="text-center font-pixel text-white animate-bounce">
                            Please connect wallet to view listings...
                        </div>
                    ) : view === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredListings.map((listing) => (
                                <ListingCard
                                    key={listing.id}
                                    listing={listing}
                                    type="NFT"
                                    onPurchase={() => handlePurchase(listing)}
                                />
                            ))}
                        </div>
                    ) : (
                        <TableView
                            listings={filteredListings}
                            onPurchase={handlePurchase}
                        />
                    )}

                    {selectedListing && (
                        <PurchaseModal
                            listing={selectedListing}
                            isOpen={showPurchaseModal}
                            onClose={() => setShowPurchaseModal(false)}
                            onSuccess={handlePurchaseSuccess}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};