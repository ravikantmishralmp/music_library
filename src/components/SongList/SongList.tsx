import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch } from 'react-redux';
import { deleteSong, sortSongs } from '../../state/songsSlice';
import { Song } from '../../types';

interface SongListProps {
  songs: Song[];
  isAdmin: boolean;
}

const SongList: React.FC<SongListProps> = ({ songs, isAdmin }) => {
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof Song | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteSong(id));
  };

  const handleSort = (field: keyof Song) => {
    const newOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    dispatch(sortSongs({ field, order: newOrder }));
  };

  const getSortIcon = (field: keyof Song) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // Evenly space columns
          alignItems: 'center', // Align content vertically
          borderBottom: '1px solid #ccc',
          padding: 1,
          fontWeight: 'bold',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ flex: isAdmin ? 3 : 4, textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleSort('title')}
        >
          Title {getSortIcon('title')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ flex: isAdmin ? 3 : 4, textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleSort('artist')}
        >
          Artist {getSortIcon('artist')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ flex: isAdmin ? 3 : 4, textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleSort('album')}
        >
          Album {getSortIcon('album')}
        </Typography>
        {isAdmin && (
          <Typography
            variant="subtitle1"
            sx={{ flex: 4, textAlign: 'center' }}
          >
            Actions
          </Typography>
        )}
      </Box>

      {/* Scrollable Song List */}
      <Box
        sx={{
          maxHeight: '100%', // Set a fixed height for the list
          overflow: 'auto', // Enable scrolling for overflow content
          marginTop: 2, // Add spacing above the list
        }}
      >
        <List>
          {songs.map((song) => (
            <ListItem
              key={song.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between', // Evenly distribute columns
                alignItems: 'center', // Align items vertically
                borderBottom: '1px solid #eee',
                padding: 1,
              }}
            >
              <ListItemText
                primary={song.title}
                sx={{ flex: isAdmin ? 3 : 4, textAlign: 'center' }}
              />
              <ListItemText
                primary={song.artist}
                sx={{ flex: isAdmin ? 3 : 4, textAlign: 'center' }}
              />
              <ListItemText
                primary={song.album}
                sx={{ flex: isAdmin ? 3 : 4, textAlign: 'center' }}
              />
              {isAdmin && (
                <Box sx={{ flex: 4, display: 'flex', justifyContent: 'center' }}>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(song.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SongList;
