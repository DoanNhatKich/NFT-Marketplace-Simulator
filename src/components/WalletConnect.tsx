import React from 'react';
import { useLucid } from '../context/LucidProvider';

import { WalletIcon } from '@heroicons/react/24/solid';

export const WalletConnect: React.FC = () => {
    const { connectWallet, address } = useLucid();

    return (
        <div className="flex items-center justify-end p-4">
            {address ? (
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl border-4 border-black pixel-border font-pixel text-sm text-accent-purple">
                    {address.slice(0, 8)}...{address.slice(-8)}
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="group relative px-6 py-3 font-pixel text-sm"
                >
                    <span className="absolute inset-0 bg-accent-yellow transform translate-x-1 translate-y-1 rounded-xl"></span>
                    <span className="absolute inset-0 bg-accent-pink rounded-xl pixel-border group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"></span>
                    <span className="relative flex items-center gap-2 text-white">
                        <WalletIcon className="w-5 h-5" />
                        Connect Nami
                    </span>
                </button>
            )}
        </div>
    );
};