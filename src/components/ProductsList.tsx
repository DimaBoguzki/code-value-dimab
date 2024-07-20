import { Box, Stack } from "@mui/material";
import { ProductType } from "../types/poduct";
import Product from "./Product";

function ProductsList( props: {
  products: ProductType[],
  active?: number,
  onDelete: ( id: number ) => void
  onClick: ( id: number ) => void
} ) {
  const { products, active, onDelete, onClick } = props;
  return (
    <Stack rowGap={ 2 } sx={ { overflowY: 'auto' } }>
      { products.map( ( product ) => (
        <Box
          key={ product.id }
          sx={ {
            background: t => active === product.id ? t.palette.action.selected : 'transparent',
            ':hover': {
              background: t => t.palette.action.hover
            },
            transition: 'background 0.2s ease-in-out',
          } }
        >
          <Product
            prodcut={ product }
            onClick={ onClick }
            onDelete={ onDelete }
          />
        </Box>
      ) ) }
    </Stack>
  )
}

export default ProductsList