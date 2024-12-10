import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import SearchFilter from './SearchFilter';
import { filterSongs } from '../../state/songsSlice';

// Mock the `filterSongs` action
jest.mock('../../state/songsSlice', () => ({
  filterSongs: jest.fn(),
}));

describe('SearchFilter Component', () => {
  const mockStore = configureStore([]);
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    // Create a new mock store for each test
    store = mockStore({});
    store.dispatch = jest.fn();
  });

  it('renders the SearchFilter component', () => {
    render(
      <Provider store={store}>
        <SearchFilter />
      </Provider>
    );

    // Check if the text field is rendered
    expect(screen.getByPlaceholderText(/search by title, artist, or album/i)).toBeInTheDocument();
  });

  it('dispatches filterSongs action when the input changes', () => {
    render(
      <Provider store={store}>
        <SearchFilter />
      </Provider>
    );

    // Simulate typing into the search input
    const input = screen.getByPlaceholderText(/search by title, artist, or album/i);
    fireEvent.change(input, { target: { value: 'rock' } });

    // Verify the filterSongs action is dispatched with the correct payload
    expect(store.dispatch).toHaveBeenCalledWith(filterSongs('rock'));
  });

  it('updates the input value as the user types', () => {
    render(
      <Provider store={store}>
        <SearchFilter />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/search by title, artist, or album/i);

    // Simulate typing into the search input
    fireEvent.change(input, { target: { value: 'jazz' } });

    // Check if the input value is updated
    expect(input).toHaveValue('jazz');
  });

  it('dispatches filterSongs with an empty string when the input is cleared', () => {
    render(
      <Provider store={store}>
        <SearchFilter />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText(/search by title, artist, or album/i);
  
    // Simulate typing into the input
    fireEvent.change(input, { target: { value: 'rock' } });
  
    // Simulate clearing the input
    fireEvent.change(input, { target: { value: '' } });
  
    // Verify the filterSongs action is dispatched with an empty string
    expect(store.dispatch).toHaveBeenCalledWith(filterSongs(''));
  });
  
});
