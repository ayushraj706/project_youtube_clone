import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Paper
      component='form'
      onSubmit={onHandleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
        display: 'flex',
        alignItems: 'center',
        width: { xs: '200px', sm: '350px' }, // Mobile me chota aur PC me bada
        background: '#1e1e1e', // Dark mode background
      }}
    >
      <input
        className='search-bar'
        placeholder='Search videos...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ 
          border: 'none', 
          outline: 'none', 
          background: 'transparent', 
          color: 'white',
          width: '100%'
        }}
      />
      <IconButton type='submit' sx={{ p: '10px', color: '#FC1503' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
