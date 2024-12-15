import React from 'react';
import { ViewColumnsIcon, TableCellsIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface ViewToggleProps {
    view: 'grid' | 'table';
    onViewChange: (view: 'grid' | 'table') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
    return (
        <div className="flex gap-2 bg-white/20 backdrop-blur-sm p-1 rounded-xl border-4 border-black pixel-border">
            <button
                onClick={() => onViewChange('grid')}
                className={classNames(
                    'p-2 rounded-lg transition-colors',
                    view === 'grid' ? 'bg-accent-yellow text-black' : 'text-white hover:bg-white/20'
                )}
            >
                <ViewColumnsIcon className="w-6 h-6" />
            </button>
            <button
                onClick={() => onViewChange('table')}
                className={classNames(
                    'p-2 rounded-lg transition-colors',
                    view === 'table' ? 'bg-accent-yellow text-black' : 'text-white hover:bg-white/20'
                )}
            >
                <TableCellsIcon className="w-6 h-6" />
            </button>
        </div>
    );
};