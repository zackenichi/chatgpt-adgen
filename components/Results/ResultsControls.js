import { Button, Grid } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

const ResultsControls = ({ onGenerate }) => {
  return (
    <Grid container spacing={1}>
      <Grid item md={6} xs={12} textAlign={{ md: 'right', xs: 'center' }}>
        <Button
          // onClick={onApprove}
          sx={{
            width: '150px',
            background: '#621984',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '20px',
            '&:hover': {
              color: '#FFFFFF',
              backgroundColor: '#81479C',
              border: 'none',
            },
          }}
          variant="outlined"
          startIcon={<ThumbUpOutlinedIcon sx={{ color: '#FFFFFF' }} />}
        >
          Approve
        </Button>
      </Grid>
      <Grid item md={6} xs={12} textAlign={{ md: 'left', xs: 'center' }}>
        <Button
          onClick={onGenerate}
          sx={{
            // width: '150px',
            background: '#FFFFFF',
            textTransform: 'capitalize',
            color: '#621984',
            border: '1px #621984 solid',
            borderRadius: '20px',
            '&:hover': {
              color: '#621984',
              backgroundColor: '#FFFFFF',
              border: '1px #621984 dashed',
            },
          }}
          variant="outlined"
          startIcon={<RefreshIcon />}
        >
          Generate New
        </Button>
      </Grid>
    </Grid>
  );
};

export default ResultsControls;
