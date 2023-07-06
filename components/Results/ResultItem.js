import { Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import ResultsControls from './ResultsControls';

const ResultItem = ({ headlines, generateNew }) => {
  const [shownHeadline, setShownHeadline] = useState(0);

  const handleGenerate = async () => {
    if (headlines && headlines.length > 0) {
      if (shownHeadline < headlines.length - 1) {
        setShownHeadline(shownHeadline + 1);
      } else {
        await generateNew();
        setShownHeadline(0);
      }
    }
  };

  useEffect(() => {
    // Reset shownHeadline to 0 when headlines change to avoid inconsistencies
    setShownHeadline(0);
  }, [headlines]);

  if (!headlines || headlines.length === 0) {
    return null; // Handle the case when headlines array is empty or undefined
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography fontWeight="bold">Headline:</Typography>
      </Grid>
      <Grid item xs={12}>
        {headlines[shownHeadline] && (
          <Typography>{headlines[shownHeadline].headline}</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography fontWeight="bold">Copy:</Typography>
      </Grid>
      <Grid item xs={12}>
        {headlines[shownHeadline] && (
          <Typography>{headlines[shownHeadline].copy}</Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <ResultsControls onGenerate={handleGenerate} />
      </Grid>
    </Grid>
  );
};

export default ResultItem;
