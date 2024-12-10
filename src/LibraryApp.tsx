import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredSongs } from './state/selectors';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import SongList from './components/SongList/SongList';
import AddSongForm from './components/AddSongForm/AddSongForm';
import SearchFilter from './components/SearchFilter/SearchFilter';

const generateClassName = createGenerateClassName({
  productionPrefix: 'so',
});

interface LibraryAppProps {
  isSignedIn?:boolean;
  isAdmin:boolean;
}

const LibraryApp: React.FC<LibraryAppProps> = ({isSignedIn, isAdmin}) => {
  const songs = useSelector(selectFilteredSongs);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  return (
    <div style={{ height: '10%', overflow: 'hidden' }}>
      <StylesProvider generateClassName={generateClassName}>
          <Routes>
            <Route
              path="/"
              element={
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '20%',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      margin: '0 auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      boxShadow: isSmallScreen
                        ? 'none'
                        : '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      borderRadius: 2,
                      
                    }}
                  >
                    {/* Header with Search Filter and Add Button */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between', // Space between Add Button and Search Box
                        alignItems: 'center',
                        width: '100%', // Full-width container
                        padding: 2,
                      }}
                    >
                      {/* Add Button on the Left */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          width: '40%', // 50% width for Add Button
                        }}
                      >
                        {isAdmin && !isSmallScreen && (
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon sx={{ fontSize: 30 }} />}
                            onClick={handleOpenForm}
                          >
                            Add Song
                          </Button>
                        )}
                        {isAdmin && isSmallScreen && (
                          <Tooltip title="Add a new song">
                            <IconButton
                              color="primary"
                              onClick={handleOpenForm}
                            >
                              <AddIcon sx={{ fontSize: 40 }} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>

                      {/* Search Box on the Right */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          width: '60%', // 50% width for Search Box
                        }}
                      >
                        {!isSmallScreen && (
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              marginRight: 1, // Spacing between text and filter
                            }}
                          >
                            Search:
                          </Typography>
                        )}
                        <Box
                          sx={{ width: '100%', paddingRight: 4, paddingTop: 1 }}
                        >
                          <SearchFilter />
                        </Box>
                      </Box>
                    </Box>

                    {/* Song List */}
                    <Box
                      sx={{
                        flex: 1,
                        marginTop: 2,
                      }}
                    >
                      <SongList songs={songs} isAdmin={isAdmin}/>
                    </Box>
                  </Box>

                  {/* Add Song Form */}
                  <AddSongForm open={isFormOpen} onClose={handleCloseForm} />
                </Box>
              }
            />
          </Routes>
      </StylesProvider>
    </div>
  );
};

export default LibraryApp;
