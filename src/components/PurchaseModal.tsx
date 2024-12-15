import React, { useState } from 'react';
import { NFTListing, TokenListing } from '../types/marketplace';
import { mintNFT } from '../utils/minting';

import { Dialog } from '@headlessui/react';
import { StarIcon, XMarkIcon, CurrencyDollarIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useLucid } from '../context/LucidProvider';

interface PurchaseModalProps {
    listing: NFTListing | TokenListing;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
    listing,
    isOpen,
    onClose,
    onSuccess
}) => {
    const { lucid, address } = useLucid();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<string | null>(null);
    const [stage, setStage] = useState<'confirm' | 'processing' | 'success'>('confirm');

    const handlePurchase = async () => {
        if (!lucid || !address) {
            setError("Please connect your wallet first");
            return;
        }

        setIsLoading(true);
        setError(null);
        setStage('processing');

        try {
            const hash = await mintNFT(lucid, address, {
                name: listing.name,
                description: `NFT from auction purchase: ${listing.name}`,
                image: (listing as NFTListing).image,
                category: (listing as NFTListing).category,
                rarity: (listing as NFTListing).rarity
            });

            setTxHash(hash);
            setStage('success');
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to complete purchase");
            setStage('confirm');
        } finally {
            setIsLoading(false);
        }
    };

    const renderStage = () => {
        switch (stage) {
            case 'processing':
                return (
                    <div className="text-center py-8">
                        <div className="flex justify-center mb-6">
                            <ArrowPathIcon className="w-16 h-16 text-accent-purple animate-spin" />
                        </div>
                        <h3 className="text-xl font-pixel mb-4 text-accent-purple">Processing Transaction</h3>
                        <p className="text-gray-600 font-pixel text-sm">Please wait while we process your purchase...</p>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-center py-8">
                        <div className="relative w-24 h-24 mx-auto mb-6">
                            <div className="absolute inset-0 bg-accent-yellow rounded-full animate-pulse"></div>
                            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                <StarIcon className="w-12 h-12 text-accent-purple" />
                            </div>
                        </div>
                        <h3 className="text-xl font-pixel mb-4 text-accent-purple">Purchase Successful!</h3>
                        <p className="text-gray-600 font-pixel text-sm mb-4">Transaction Hash:</p>
                        <p className="bg-gray-100 p-3 rounded-lg text-xs font-mono break-all">{txHash}</p>
                    </div>
                );
            default:
                return (
                    <>
                        <div className="relative mb-6">
                            <img
                                src={(listing as NFTListing).image}
                                alt={listing.name}
                                className="w-full h-64 object-cover rounded-xl image-pixelated"
                            />
                            <div className="absolute top-4 right-4">
                                <div className={classNames(
                                    'px-4 py-2 rounded-full text-white text-sm font-pixel',
                                    {
                                        'bg-accent-yellow text-black': (listing as NFTListing).rarity === 'Legendary',
                                        'bg-accent-pink': (listing as NFTListing).rarity === 'Epic',
                                        'bg-accent-purple': (listing as NFTListing).rarity === 'Rare',
                                        'bg-secondary': (listing as NFTListing).rarity === 'Uncommon',
                                        'bg-accent-blue': (listing as NFTListing).rarity === 'Common',
                                    }
                                )}>
                                    {(listing as NFTListing).rarity}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-pixel text-accent-purple mb-2">{listing.name}</h3>
                                <p className="text-gray-600 font-pixel text-sm">{(listing as NFTListing).description}</p>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <span className="font-pixel text-sm text-gray-600">Price:</span>
                                    <div className="flex items-center gap-2">
                                        <CurrencyDollarIcon className="w-5 h-5 text-primary" />
                                        <span className="font-pixel text-lg text-primary">{listing.price} ADA</span>
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-100 text-red-700 p-4 rounded-xl font-pixel text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handlePurchase}
                                disabled={isLoading}
                                className="w-full bg-primary text-white py-4 rounded-xl font-pixel hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Purchase
                            </button>
                        </div>
                    </>
                );
        }
    };

    return (
        <Dialog open={isOpen} onClose={() => stage !== 'processing' && onClose()} className="relative z-50">
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="relative bg-white rounded-2xl max-w-lg w-full p-6 border-4 border-black pixel-border">
                    {stage !== 'processing' && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    )}

                    {renderStage()}
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};