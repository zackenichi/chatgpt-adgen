import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = ({ handleSearch }) => {
  return (
    <Button variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}>
      Generate
    </Button>
  );
};

export default SearchButton;
