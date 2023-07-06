import { Grid, Typography } from '@mui/material';
import ResultItem from './ResultItem';

const ResultsContainer = ({ url, results, generateNew, loading }) => {
  if (!url) {
    return <Typography>Start generating</Typography>;
  }

  if (loading) {
    return <Typography>Please wait...</Typography>;
  }

  if (results.length < 1 && !loading) {
    return <Typography sx={{ color: 'red' }}>Invalid URL</Typography>;
  }

  console.log(results);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography fontStyle="italic">Generated Headline for {url}</Typography>
      </Grid>
      <Grid item xs={12}>
        <ResultItem headlines={results} generateNew={generateNew} />
      </Grid>
    </Grid>
  );
};

export default ResultsContainer;
