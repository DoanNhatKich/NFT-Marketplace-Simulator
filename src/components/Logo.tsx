import React from 'react';

export const Logo: React.FC = () => {
    return (
        <div className="flex items-center justify-center gap-3">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-accent-purple rounded-lg transform rotate-45 animate-pulse-slow"></div>
                <div className="absolute inset-2 bg-accent-pink rounded-lg transform -rotate-45"></div>
                <div className="absolute inset-3 bg-accent-yellow rounded-lg pixel-border"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-pixel text-black">P</span>
                </div>
            </div>
            <span className="font-pixel text-xl text-white">PixelADA</span>
        </div>
    );
};