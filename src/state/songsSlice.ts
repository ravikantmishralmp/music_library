import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import songsData from '../data/songs';
import { Song } from '../types';

interface SongsState {
  songs: Song[];
  filteredSongs: Song[]; // Initially, all songs are shown
}

const initialState: SongsState = {
  songs: songsData, // Load initial songs from data
  filteredSongs: songsData, // Initially, all songs are shown
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSong(state, action: PayloadAction<Song>) {
      console.log(`Add song ${action.payload.title}`);
      state.songs.push(action.payload);
      state.filteredSongs = [...state.songs];
    },
    deleteSong(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      state.filteredSongs = [...state.songs];
    },
    sortSongs(
      state,
      action: PayloadAction<{ field: keyof Song; order: 'asc' | 'desc' }>,
    ) {
      const { field, order } = action.payload;
      state.filteredSongs = [...state.songs].sort((a, b) => {
        if (order === 'asc') return a[field].localeCompare(b[field]);
        return b[field].localeCompare(a[field]);
      });
    },
    filterSongs(state, action: PayloadAction<string>) {
      const searchTerm = action.payload.toLowerCase();
      state.filteredSongs = state.songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm) ||
          song.artist.toLowerCase().includes(searchTerm) ||
          song.album.toLowerCase().includes(searchTerm),
      );
    },
  },
});

export const { addSong, deleteSong, sortSongs, filterSongs } =
  songsSlice.actions;
export default songsSlice.reducer;
