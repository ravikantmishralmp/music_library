import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addSong } from '../../state/songsSlice';

interface AddSongFormProps {
  open: boolean;
  onClose: () => void;
}

const AddSongForm: React.FC<AddSongFormProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.title && formData.artist && formData.album) {
      const newSong = {
        id: `song-${Date.now()}`,
        ...formData,
      };
      dispatch(addSong(newSong));
      onClose(); // Close the modal
      setFormData({ title: '', artist: '', album: '' }); // Reset form
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-song-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="add-song-modal" variant="h6" component="h2" mb={2}>
          Add New Song
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Album"
          name="album"
          value={formData.album}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddSongForm;
