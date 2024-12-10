import { RootState } from './store';

const selectSongs = (state: RootState) => state.songs.songs;
const selectFilteredSongs = (state: RootState) => state.songs.filteredSongs;

export { selectFilteredSongs, selectSongs };
