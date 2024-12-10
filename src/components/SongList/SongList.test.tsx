import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SongList from './SongList';
import { deleteSong, sortSongs } from '../../state/songsSlice';
import { Song } from '../../types';

// Mock Redux store
const mockStore = configureStore([]);
const initialState = {
  songs: {
    songs: [
      { id: '1', title: 'Song A', artist: 'Artist A', album: 'Album A' },
      { id: '2', title: 'Song B', artist: 'Artist B', album: 'Album B' },
    ],
  },
};

describe('SongList Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders the song list with correct data', () => {
    render(
      <Provider store={store}>
        <SongList songs={initialState.songs.songs} isAdmin={true} />
      </Provider>
    );

    // Check if songs are rendered
    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.getByText('Artist A')).toBeInTheDocument();
    expect(screen.getByText('Album A')).toBeInTheDocument();

    expect(screen.getByText('Song B')).toBeInTheDocument();
    expect(screen.getByText('Artist B')).toBeInTheDocument();
    expect(screen.getByText('Album B')).toBeInTheDocument();
  });

  it('does not render "Actions" column when isAdmin is false', () => {
    render(
      <Provider store={store}>
        <SongList songs={initialState.songs.songs} isAdmin={false} />
      </Provider>
    );

    // Check that "Actions" column is not rendered
    expect(screen.queryByText('Actions')).not.toBeInTheDocument();

    // Check that the delete button is not visible
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });

  it('renders "Actions" column and delete button when isAdmin is true', () => {
    render(
      <Provider store={store}>
        <SongList songs={initialState.songs.songs} isAdmin={true} />
      </Provider>
    );

    // Check that "Actions" column is rendered
    expect(screen.getByText('Actions')).toBeInTheDocument();

    // Check that the delete button is visible
    expect(screen.getAllByRole('button', { name: /delete/i }).length).toBe(2);
  });

  it('dispatches deleteSong when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <SongList songs={initialState.songs.songs} isAdmin={true} />
      </Provider>
    );

    // Click the delete button for the first song
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    // Verify the deleteSong action is dispatched
    expect(store.dispatch).toHaveBeenCalledWith(deleteSong('1'));
  });

  it('dispatches sortSongs with correct arguments when sorting headers are clicked', () => {
    render(
      <Provider store={store}>
        <SongList songs={initialState.songs.songs} isAdmin={true} />
      </Provider>
    );

    // Click the "Title" header to sort by title
    fireEvent.click(screen.getByText('Title'));

    // Verify the sortSongs action is dispatched with correct arguments
    expect(store.dispatch).toHaveBeenCalledWith(sortSongs({ field: 'title', order: 'asc' }));

    // Click again to toggle the sort order
    fireEvent.click(screen.getByText('Title'));
    expect(store.dispatch).toHaveBeenCalledWith(sortSongs({ field: 'title', order: 'desc' }));
  });
});
