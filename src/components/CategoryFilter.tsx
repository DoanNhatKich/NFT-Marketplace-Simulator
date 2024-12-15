import React from 'react';
import { NFTCategory } from '../types/marketplace';
import { SparklesIcon, HomeIcon, UserIcon, PhotoIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface CategoryFilterProps {
    selectedCategory: NFTCategory | null;
    onSelectCategory: (category: NFTCategory | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    selectedCategory,
    onSelectCategory,
}) => {
    const categories: { label: NFTCategory; icon: React.ReactNode; color: string }[] = [
        { label: 'Game Assets', icon: <SparklesIcon className="w-6 h-6" />, color: 'accent-yellow' },
        { label: 'Virtual Land', icon: <HomeIcon className="w-6 h-6" />, color: 'accent-blue' },
        { label: 'Avatars', icon: <UserIcon className="w-6 h-6" />, color: 'accent-purple' },
        { label: 'Pixel Art', icon: <PhotoIcon className="w-6 h-6" />, color: 'accent-pink' },
        { label: 'Collectibles', icon: <SquaresPlusIcon className="w-6 h-6" />, color: 'primary' },
    ];

    return (
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <button
                onClick={() => onSelectCategory(null)}
                className={classNames(
                    'px-4 py-2 rounded-xl border-4 border-black transition-all duration-200 font-pixel',
                    selectedCategory === null
                        ? 'bg-primary text-white pixel-border'
                        : 'bg-white hover:bg-primary hover:text-white'
                )}
            >
                All
            </button>
            {categories.map(({ label, icon, color }) => (
                <button
                    key={label}
                    onClick={() => onSelectCategory(label)}
                    className={classNames(
                        'px-4 py-2 rounded-xl border-4 border-black transition-all duration-200 flex items-center gap-2 font-pixel',
                        selectedCategory === label
                            ? `bg-${color} text-white pixel-border`
                            : `bg-white hover:bg-${color} hover:text-white`
                    )}
                >
                    {icon}
                    {label}
                </button>
            ))}
        </div>
    );
};