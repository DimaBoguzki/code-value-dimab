
import { Button, AppBar as MuiAppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useProducts } from '../../context/products';
import { useFilters } from '../../context/filters';
import { useNavigate } from 'react-router-dom';

function AppBar() {
  const { reset: resetProduct } = useProducts();
  const { reset: resetFilter } = useFilters();
  const navigate = useNavigate();
  return (
    <MuiAppBar position='static'>
      <Toolbar>
        <Typography variant="h6" sx={ { color: t => t.palette.common.white, flexGrow: 1 } }>
          My Store
        </Typography>
        <Button
          variant='text'
          color='inherit'
          onClick={ () => {
            navigate( '/new' )
            resetProduct();
            resetFilter()
          } }
        >
          <Typography>
            Reset
          </Typography>
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar