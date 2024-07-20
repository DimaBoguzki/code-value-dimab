import { memo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ProductType } from "../types/poduct";
import FakeImage from "./Image";

const Product = memo( ( props: {
  prodcut: ProductType,
  onClick: ( id: number ) => void,
  onDelete: ( id: number ) => void
} ) => {
  const { prodcut: { id, name, description }, onClick, onDelete } = props;

  return (
    <Box
      onClick={ () => onClick( id ) }
      sx={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        cursor: 'pointer',
        border: 1,
        borderRadius: 1,
      } }
    >
      <Box display='flex' alignSelf='center' columnGap={ 1 }>
        <FakeImage width={ 50 } height={ 50 } />
        <Stack>
          <Typography variant="body1">
            { name }
          </Typography>
          <Typography variant="subtitle1">
            { description }
          </Typography>
        </Stack>
      </Box>
      <Box sx={ { display: 'flex', alignSelf: 'flex-end' } }>
        <Button
          variant="contained"
          color='warning'
          size="small"
          onClick={ () => onDelete( id ) }
        >
          Delete
        </Button>
      </Box>
    </Box>
  )
}, ( p, n ) => (
  p.prodcut.id === n.prodcut.id &&
  p.prodcut.name === n.prodcut.name &&
  p.prodcut.description === n.prodcut.description
) );

export default Product;