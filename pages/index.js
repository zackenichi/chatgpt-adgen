import ResultsContainer from '@/components/Results';
import SearchContainer from '@/components/search';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { addHttpToUrl, isValidUrl } from '@/helpers/input-utils';
import { Grid } from '@mui/material';
import axios from 'axios';
import { Fragment, useRef, useState } from 'react';

export default function HomePage() {
  const urlRef = useRef();
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchClick = async () => {
    const urlInput = urlRef.current.value;
    setLoading(true);

    if (isValidUrl(urlInput)) {
      try {
        const baseUrl = addHttpToUrl(urlInput);

        const encodedUrl = encodeURIComponent(baseUrl);

        // const headlinesResponse = await axios.post(
        //   `/api/generate?baseUrl=${encodedUrl}`
        // );

        // Call the Cloud Function using axios
        const headlinesResponse = await axios.post(
          `https://generate-cvvtxzln5a-uc.a.run.app?baseUrl=${encodedUrl}`
        );

        setHeadlines(headlinesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error: ', error.message);
        setLoading(false);
      }
    } else {
      console.log('Invalid URL');
      setHeadlines([]);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchContainer urlRef={urlRef} onSearchClick={handleSearchClick} />
        </Grid>
        <Grid item xs={12}>
          <ResultsContainer
            url={urlRef.current ? urlRef.current.value : ''}
            results={headlines}
            generateNew={handleSearchClick}
            loading={loading}
          />
        </Grid>
      </Grid>
      {loading && <LoadingSpinner />}
    </Fragment>
  );
}
