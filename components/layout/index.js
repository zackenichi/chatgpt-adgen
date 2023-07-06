import { Container, Grid } from '@mui/material';
import AppTitle from '../AppTitle';

const Layout = (props) => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppTitle />
        </Grid>

        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
