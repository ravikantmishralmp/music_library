import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import LibraryApp from './LibraryApp';
import { selectFilteredSongs } from './state/selectors';

jest.mock('./state/selectors', () => ({
  selectFilteredSongs: jest.fn(),
}));

const mockStore = configureStore([]);

describe('LibraryApp Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      songs: [], // Initial mock state
    });

    (selectFilteredSongs as jest.Mock).mockReturnValue([
      { id: '1', title: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
      { id: '2', title: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    ]);
  });

  it('renders the component correctly with SearchFilter and SongList', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LibraryApp isAdmin={false} />
        </MemoryRouter>
      </Provider>
    );

    // Check for search filter
    expect(screen.getByPlaceholderText(/search by title, artist, or album/i)).toBeInTheDocument();

    // Check for song list
    expect(screen.getByText(/song 1/i)).toBeInTheDocument();
    expect(screen.getByText(/artist 1/i)).toBeInTheDocument();
    expect(screen.getByText(/album 1/i)).toBeInTheDocument();
  });

  it('renders the Add Song button only when isAdmin is true', () => {
    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LibraryApp isAdmin={false} />
        </MemoryRouter>
      </Provider>
    );

    // Add button should not exist when isAdmin is false
    expect(screen.queryByText(/add song/i)).not.toBeInTheDocument();

    // Rerender with isAdmin set to true
    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <LibraryApp isAdmin={true} />
        </MemoryRouter>
      </Provider>
    );

    // Add button should now exist
    expect(screen.getByText(/add song/i)).toBeInTheDocument();
  });

  it('opens and closes the AddSongForm modal when isAdmin is true', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LibraryApp isAdmin={true} />
        </MemoryRouter>
      </Provider>
    );

    // Check that Add Song button exists
    const addButton = screen.getByText(/add song/i);
    expect(addButton).toBeInTheDocument();

    // Click the Add Song button
    fireEvent.click(addButton);

    // Modal should open
    expect(screen.getByText(/add new song/i)).toBeInTheDocument();

    // Click the Cancel button in the modal
    fireEvent.click(screen.getByText(/cancel/i));

    // Modal should close
    expect(screen.queryByText(/add new song/i)).not.toBeInTheDocument();
  });

  it('does not render Add Song button when isAdmin is false', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LibraryApp isAdmin={false} />
        </MemoryRouter>
      </Provider>
    );

    // Ensure Add Song button is not rendered
    expect(screen.queryByText(/add song/i)).not.toBeInTheDocument();
  });

  it('renders the SongList with the correct songs', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LibraryApp isAdmin={false} />
        </MemoryRouter>
      </Provider>
    );

    // Check for the song titles in the list
    expect(screen.getByText(/song 1/i)).toBeInTheDocument();
    expect(screen.getByText(/song 2/i)).toBeInTheDocument();
  });
});
