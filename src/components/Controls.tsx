import React from 'react';
import { Song } from '../types';

interface ControlsProps {
  onSort: (category: keyof Song) => void;
  onFilter: (category: keyof Song, value: string) => void;
  onGroup: (category: keyof Song) => void;
}

const Controls: React.FC<ControlsProps> = ({ onSort, onFilter, onGroup }) => {
  const categories: (keyof Song)[] = ['title', 'artist', 'album'];

  return (
    <div>
      <h2>Controls</h2>
      <div>
        <h3>Sort</h3>
        {categories.map((category) => (
          <button key={category} onClick={() => onSort(category)}>
            Sort by {category}
          </button>
        ))}
      </div>
      <div>
        <h3>Filter</h3>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilter(category, 'Some Value')}
          >
            Filter by {category}
          </button>
        ))}
      </div>
      <div>
        <h3>Group</h3>
        {categories.map((category) => (
          <button key={category} onClick={() => onGroup(category)}>
            Group by {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
