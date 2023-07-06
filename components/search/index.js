import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import SearchField from './SearchField';
import SearchButton from './SearchButton';

const SearchContainer = ({ urlRef, onSearchClick }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={9} xs={12}>
        <SearchField urlRef={urlRef} />
      </Grid>
      <Grid item md={3} xs={12}>
        <SearchButton handleSearch={onSearchClick} />
      </Grid>
    </Grid>
  );
};

export default SearchContainer;
