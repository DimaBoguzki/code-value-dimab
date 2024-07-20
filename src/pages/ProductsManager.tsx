import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Box, Stack } from "@mui/material";
import { useProducts } from "../context/products"
import ProductsList from "../components/ProductsList"
import ActionBar from "../components/ActionBar";
import {
  SortOptions,
  useFilters,
  SORT_BY_NAME,
  SORT_BY_PRICE,
  SORT_BY_RECENTLY_ADDED
} from "../context/filters";
import TwoColsContainer from '../components/layout/TwoColsContainer';
import Pagination from '../components/Pagination';

const MAX_LIST = 8;

function ProductsManager() {
  const { id } = useParams()
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();
  const { search, sortBy, onSeach, onSort } = useFilters();
  const [ page, setPage ] = useState<number>( 1 )
  const deferredSortBy = useDeferredValue( sortBy );
  const deferredSearch = useDeferredValue( search );

  const _sorted = useMemo( () => {

    switch ( deferredSortBy ) {
      case SORT_BY_NAME:
        return products.sort( ( a, b ) => ( a || '' ).name.localeCompare( ( b || '' ).name ) )
      case SORT_BY_PRICE:
        return products.sort( ( a, b ) => ( a.price || 0 ) - ( b.price || 0 ) )
      case SORT_BY_RECENTLY_ADDED:
        return products.sort( ( a, b ) => a.creationDate.getTime() - b.creationDate.getTime() )
      default:
        return products
    }
  }, [ products, deferredSortBy ] )

  const _products = useMemo( () => {
    if ( !deferredSearch ) {
      return _sorted;
    }
    const look = deferredSearch.toLocaleLowerCase();
    return _sorted.filter( product => (
      ( product?.name || '' ).toLocaleLowerCase().includes( look ) ||
      ( product?.description || '' ).toLocaleLowerCase().includes( look )
    ) )
  }, [ _sorted, deferredSearch, page ] )

  const searchProps = useMemo( () => {
    return {
      value: search,
      onChange: onSeach
    }
  }, [ search, onSeach ] )

  const sortProps = useMemo( () => {
    return {
      value: sortBy,
      options: SortOptions as string[],
      onChange: onSort
    }
  }, [ sortBy, onSort ] )

  const goToProduct = useCallback( ( id: number ) => navigate( `/${id}` ), [ navigate ] );
  const goToNew = useCallback( () => navigate( `/new` ), [ navigate ] );

  const handleNext = useCallback( () => {
    setPage( p => Math.ceil( _products.length / MAX_LIST ) >= ( p + 1 ) ? ( p + 1 ) : p );
  }, [ _products ] )
  const handlePrev = useCallback( () => {
    setPage( p => p > 0 ? p - 1 : p );
  }, [] )

  return (
    <Stack flexGrow={ 1 } rowGap={ 2 } sx={ { overflowY: 'hidden' } }>
      <TwoColsContainer>
        <Box py={ 1 }>
          <ActionBar
            onAdd={ goToNew }
            search={ searchProps }
            sort={ sortProps }
          />
        </Box>
      </TwoColsContainer>
      <TwoColsContainer fullHeight>
        <ProductsList
          products={ _products.slice( ( page - 1 ) * MAX_LIST, page * MAX_LIST ) }
          onDelete={ deleteProduct }
          onClick={ goToProduct }
          active={ !!id && id !== 'new' ? Number( id ) : undefined }
        />
        <Outlet />
      </TwoColsContainer>
      <TwoColsContainer>
        <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
          <Pagination
            current={ page }
            total={ Math.ceil( _products.length / MAX_LIST ) }
            onNext={ handleNext }
            onPrev={ handlePrev }
          />
        </Box>
      </TwoColsContainer>
    </Stack>
  )
}

export default ProductsManager;