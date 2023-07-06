import { TextField } from '@mui/material';

const SearchField = (props) => {
  return (
    <TextField
      inputRef={props.urlRef}
      fullWidth
      variant="outlined"
      label="Enter website"
      id="website-search"
      error={props.hasError}
      helperText={props.hasError && 'Invalid url'}
    />
  );
};

export default SearchField;
