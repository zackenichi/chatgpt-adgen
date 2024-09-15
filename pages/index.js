import ResultsContainer from '@/components/Results';
import SearchContainer from '@/components/search';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { addHttpToUrl, isValidUrl } from '@/helpers/input-utils';
import { Grid } from '@mui/material';
import axios from 'axios'; // Import axios
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

        // const response = await axios.post(
        //   `${process.env.NEXT_PUBLIC_GENERATE_FUNCTION_URL}${encodedUrl}`
        // );

        const response = await axios.post(
          `/api/generate?baseUrl=${encodedUrl}`
        );

        setHeadlines(response.data);
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
