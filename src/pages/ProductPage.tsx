import { Box, Button, Stack } from "@mui/material";
import { TextFieldControl } from "../components/inputs";
import { useForm } from "react-hook-form";
import FakeImage from "../components/Image";
import { ProductType } from "../types/poduct";
import { useEffect } from "react";
import { useProducts } from "../context/products";
import { useParams } from "react-router-dom";
import NumericTextFieldControl from "../components/inputs/NumericFieldControl";

type ProductFoemType = Omit<ProductType, 'id'>;

const defaultProduct: Omit<ProductFoemType, 'creationDate'> = {
  name: '',
  description: '',
  price: 0
}

function ProductPage() {
  const form = useForm<ProductFoemType>( {
    defaultValues: defaultProduct
  } );
  const { products, addProduct, updateProduct, getNextId } = useProducts();
  const { id } = useParams();

  useEffect( () => {
    const _product = !!id && id !== 'new' ? products.find( product => product.id === Number( id ) ) : undefined
    if ( _product ) {
      form.reset( _product )
    }
  }, [ products, id ] );

  const handleOnSubmit = ( product: ProductFoemType ) => {
    if ( id === 'new' ) {
      const newId = getNextId();
      addProduct( { ...product, id: newId, creationDate: new Date() } )
      form.reset( defaultProduct );
    }
    else {
      updateProduct( {
        id: Number( id ), ...product
      } )
    }
  }

  if ( !id ) return null

  return (
    <Stack
      p={ 2 }
      border={ 1 }
      borderRadius={ 1 }
      justifyContent='space-between'
      flexGrow={ 1 }
      sx={ { overflowY: 'hidden' } }
      component='form'
      onSubmit={ form.handleSubmit( handleOnSubmit ) }
    >
      <Stack rowGap={ 2 }>
        <FakeImage width={ 100 } height={ 80 } />
        <TextFieldControl
          control={ form.control }
          controlName="name"
          placeholder="Product Name"
          label='Name'
          required
          validateFunction={ value => value.length > 30 ? 'Name must be at least 30 characters' : true }
        />
        <TextFieldControl
          control={ form.control }
          controlName="description"
          placeholder="Product Description"
          label='Description'
          validateFunction={ value => value.length > 200 ? 'Description must be at least 200 characters' : true }
          rows={ 3 }
        />
        <Box sx={ { maxWidth: '20%' } }>
          <NumericTextFieldControl
            prefix="$"
            control={ form.control }
            placeholder="Price"
            controlName="price"
            label='Price'
            required
            validateFunction={ value => Number( value ) > 0 ? true : 'Price must be greater than 0' }
          />
        </Box>
      </Stack>
      <Box sx={ { display: 'flex', alignSelf: 'flex-end' } } >
        <Button
          type="submit"
          variant='contained'
          color='success'
        >
          Save
        </Button>
      </Box>
    </Stack>
  )
}

export default ProductPage;