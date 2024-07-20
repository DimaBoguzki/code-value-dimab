import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const styleBitton: any = {
  display: 'flex',
  alignItems: 'center',
  textTransform: 'none !important',
  gap: 0.5
}

function Pagination( props: {
  current: number,
  total: number,
  onNext: () => void,
  onPrev: () => void
} ) {
  const { current, total, onNext, onPrev } = props;
  if ( !total ) {
    return null;
  }
  return (
    <Box
      display='grid'
      alignItems='center'
      gridTemplateColumns='repeat(3, 1fr)'
      gap={ 3 }
    >
      <Button
        variant="text"
        sx={ styleBitton }
        onClick={ onPrev }
        disabled={ current === 1 }
      >
        <ArrowBackIosIcon fontSize="small" />
        <Typography >
          Prev Page
        </Typography>
      </Button>
      <Typography variant="body1" textAlign='center' >
        { `${current} of ${total}` }
      </Typography>
      <Button
        variant="text"
        sx={ styleBitton }
        onClick={ onNext }
        disabled={ current === total }
      >
        <Typography >
          Next Page
        </Typography>
        <ArrowForwardIosIcon fontSize="small" />
      </Button>
    </Box>
  )
}

export default Pagination