import SearchContainer from '@/components/search';
import { Grid } from '@mui/material';
import { Fragment, useRef } from 'react';

export default function HomePage() {
  const urlRef = useRef();

  const handleSearchClick = async () => {
    const urlInput = urlRef.current.value;

    console.log(urlInput);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchContainer urlRef={urlRef} onSearchClick={handleSearchClick} />
        </Grid>
      </Grid>
    </Fragment>
  );
}
