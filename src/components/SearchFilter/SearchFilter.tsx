import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filterSongs } from '../../state/songsSlice';

const SearchFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    dispatch(filterSongs(value)); // Dispatch filter action
  };

  return (
    <Box sx={{ marginBottom: 2, width: '100%' }}>
      <TextField
        label="Search Songs"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by title, artist, or album"
      />
    </Box>
  );
};

export default SearchFilter;
