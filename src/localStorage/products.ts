import { ProductType } from "../types/poduct";

const NAME_ITEM = "products";

const setProducts = ( products: ProductType[] ): void => {
  window.localStorage.setItem( NAME_ITEM, JSON.stringify( products ) );
}
const getProducts = (): ProductType[] => {
  let items = window.localStorage.getItem( NAME_ITEM );
  return items ? JSON.parse( items )
    .map( ( x: ProductType ) => ( { ...x, creationDate: new Date( x.creationDate ) } ) ) : undefined;
}
const addProduct = ( item: ProductType ) => {
  const data = getProducts() || [];
  if ( !data )
    window.localStorage.setItem( NAME_ITEM, JSON.stringify( [ item ] ) );
  else {
    data.push( item )
    window.localStorage.setItem( NAME_ITEM, JSON.stringify( data ) );
  }
}
const removeItem = ( id: number ): void => {
  let items: ProductType[] = getProducts() || [];
  const newItems = items.filter( x => x.id !== id );
  window.localStorage.setItem( NAME_ITEM, JSON.stringify( newItems ) );
}
const updateProduct = ( item: ProductType ) => {
  let items = getProducts() || [];
  for ( let i = 0; i < items.length; i++ ) {
    if ( items[ i ].id == item.id ) {
      items[ i ] = { ...item };
      break;
    }
  }
  window.localStorage.setItem( NAME_ITEM, JSON.stringify( items ) );
}
const clearProducts = (): void => {
  window.localStorage.removeItem( NAME_ITEM );
}

const productsLocalStorage = {
  setProducts,
  getProducts,
  addProduct,
  removeItem,
  updateProduct,
  clearProducts
}

export default productsLocalStorage;