import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { ProductType } from '../types/poduct';
import productsLocalStorage from '../localStorage/products';

type ProductContextType = {
  products: ProductType[];
  addProduct: ( product: ProductType ) => void;
  updateProduct: ( product: ProductType ) => void;
  deleteProduct: ( id: number ) => void;
  getNextId: () => number;
  reset: () => void;
};
function randomBetween( min: number, max: number ) {
  const _min = Math.ceil( min );
  const _max = Math.floor( max );
  return Math.floor( Math.random() * ( _max - _min ) + _min );
}


const defaultProducts: ProductType[] = [];

for ( let i = 0; i < 10; i++ ) {
  defaultProducts.push( {
    id: i + 1,
    name: `Product ${i + 1}`,
    description: `Product description ${i + 1}`,
    price: randomBetween( 55, 1000 ),
    creationDate: new Date( `${randomBetween( 2010, 2024 )}-0${randomBetween( 1, 9 )}-0${randomBetween( 1, 9 )}` ),
  } )

}

const ProductsContext = createContext<ProductContextType | undefined>( undefined );

const useProducts = () => {
  const context = useContext( ProductsContext );
  if ( !context ) {
    throw new Error( 'useProducts must be used within a ProductsProvider' );
  }
  return context;
};

const ProductsProvider = ( { children }: { children: ReactNode } ) => {
  const [ products, setProducts ] = useState<ProductType[]>( [] );

  useEffect( () => {
    const _products = productsLocalStorage.getProducts() || defaultProducts
    setProducts( _products )
    productsLocalStorage.setProducts( _products )
  }, [] )

  const addProduct = useCallback( ( product: ProductType ) => {
    productsLocalStorage.addProduct( product );
    setProducts( p => [ product, ...p ] );
  }, [] )

  const updateProduct = useCallback( ( product: ProductType ) => {
    productsLocalStorage.updateProduct( product );
    setProducts( p => p.map( p => p.id === product.id ? product : p ) );
  }, [] )

  const deleteProduct = useCallback( ( id: number ) => {
    productsLocalStorage.removeItem( id );
    setProducts( p => p.filter( p => p.id !== id ) );
  }, [] )

  const getNextId = useCallback( () => {
    if ( !products?.length ) return 1
    const sorted = products.sort( ( a, b ) => a.id - b.id );
    return sorted[ sorted.length - 1 ].id + 1
  }, [ products ] );

  const reset = useCallback( () => {
    setProducts( [] )
    productsLocalStorage.setProducts( [] )
  }, [ setProducts ] );

  return (
    <ProductsContext.Provider
      value={ { products, addProduct, updateProduct, deleteProduct, getNextId, reset } }
    >
      { children }
    </ProductsContext.Provider>
  );
};


export default ProductsProvider;
export {
  useProducts
}