import { Song } from '../types';

export type Action =
  | { type: 'ADD_SONG'; payload: Song }
  | { type: 'DELETE_SONG'; payload: string } // song ID
  | { type: 'SORT_SONGS'; payload: keyof Song } // category (e.g., title, artist, album)
  | { type: 'FILTER_SONGS'; payload: { category: keyof Song; value: string } }
  | { type: 'RESET_SONGS' };
