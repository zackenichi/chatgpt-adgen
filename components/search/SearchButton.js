import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = ({ handleSearch }) => {
  return (
    <Button variant="contained" endIcon={<SearchIcon />} onClick={handleSearch}>
      Search
    </Button>
  );
};

export default SearchButton;
