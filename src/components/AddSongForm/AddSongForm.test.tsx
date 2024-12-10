import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddSongForm from './AddSongForm';
import { addSong } from './../../state/songsSlice';

const mockStore = configureStore([]);

describe('AddSongForm Component', () => {
  let store: any;
  let onCloseMock: jest.Mock;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    onCloseMock = jest.fn();
  });

  it('renders the modal when open', () => {
    render(
      <Provider store={store}>
        <AddSongForm open={true} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByText(/Add New Song/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Artist/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Album/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('calls onClose when the cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <AddSongForm open={true} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('shows an alert if fields are empty when submitting', () => {
    window.alert = jest.fn(); // Mock window.alert

    render(
      <Provider store={store}>
        <AddSongForm open={true} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(window.alert).toHaveBeenCalledWith('Please fill out all fields.');
  });

  it('dispatches addSong action and resets form on successful submission', () => {
    render(
      <Provider store={store}>
        <AddSongForm open={true} onClose={onCloseMock} />
      </Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Test Song' },
    });
    fireEvent.change(screen.getByLabelText(/Artist/i), {
      target: { value: 'Test Artist' },
    });
    fireEvent.change(screen.getByLabelText(/Album/i), {
      target: { value: 'Test Album' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(store.dispatch).toHaveBeenCalledWith(
      addSong({
        id: expect.stringMatching(/song-\d+/),
        title: 'Test Song',
        artist: 'Test Artist',
        album: 'Test Album',
      })
    );

    expect(onCloseMock).toHaveBeenCalledTimes(1);

    // Ensure form fields are reset
    expect(screen.getByLabelText(/Title/i)).toHaveValue('');
    expect(screen.getByLabelText(/Artist/i)).toHaveValue('');
    expect(screen.getByLabelText(/Album/i)).toHaveValue('');
  });

  it('does not render modal content when not open', () => {
    render(
      <Provider store={store}>
        <AddSongForm open={false} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.queryByText(/Add New Song/i)).not.toBeInTheDocument();
  });
});
