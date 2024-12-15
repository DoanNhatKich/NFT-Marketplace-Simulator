import React from 'react';
import { Logo } from './Logo';
import { WalletConnect } from './WalletConnect';

import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { useLucid } from '../context/LucidProvider';

interface LandingProps {
    onEnterMarketplace: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnterMarketplace }) => {
    const { address } = useLucid();

    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDBoMzB2MzBIMHptMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz4KPC9zdmc+')] opacity-20"></div>

            <header className="bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Logo />
                    <WalletConnect />
                </div>
            </header>

            <main className="container mx-auto px-4 py-16 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-6xl font-pixel mb-8 rainbow-text">
                        Welcome to PixelADA
                    </h1>

                    <p className="text-xl font-pixel text-white mb-12 leading-relaxed">
                        Discover, collect, and trade unique pixel art NFTs on Cardano
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: <SparklesIcon className="w-12 h-12 text-accent-yellow" />,
                                title: "Unique NFTs",
                                description: "Discover rare pixel art collectibles"
                            },
                            {
                                icon: <SparklesIcon className="w-12 h-12 text-accent-pink" />,
                                title: "Secure Trading",
                                description: "Built on Cardano blockchain"
                            },
                            {
                                icon: <SparklesIcon className="w-12 h-12 text-accent-purple" />,
                                title: "Community",
                                description: "Join the pixel art revolution"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border-4 border-black pixel-border transform hover:scale-105 transition-transform"
                            >
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="font-pixel text-white mb-2">{feature.title}</h3>
                                <p className="text-white/80">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onEnterMarketplace}
                        className="group relative px-8 py-4 font-pixel text-lg inline-flex items-center gap-3"
                    >
                        <span className="absolute inset-0 bg-accent-yellow transform translate-x-1 translate-y-1 rounded-xl"></span>
                        <span className="absolute inset-0 bg-accent-pink rounded-xl pixel-border group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"></span>
                        <span className="relative text-white">
                            Enter Marketplace
                            <ArrowRightIcon className="w-6 h-6 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    {!address && (
                        <p className="mt-4 text-white/80 font-pixel text-sm">
                            Connect your wallet to start trading
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};