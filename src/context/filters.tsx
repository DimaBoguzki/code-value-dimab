import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import filtersLocalStorage from '../localStorage/filters';


const SORT_BY_NAME = 'Name';
const SORT_BY_PRICE = 'Price';
const SORT_BY_RECENTLY_ADDED = 'Recently Added';

const SortOptions: readonly string[] = [ SORT_BY_NAME, SORT_BY_PRICE, SORT_BY_RECENTLY_ADDED ] as const;


type FiltertContextType = {
  search: string;
  sortBy: string;
  onSeach: ( val: string ) => void;
  onSort: ( val: string ) => void;
  reset: () => void;
};


const FiltersContext = createContext<FiltertContextType | undefined>( undefined );

const useFilters = () => {
  const context = useContext( FiltersContext );
  if ( !context ) {
    throw new Error( 'useFilters must be used within a FilterssProvider' );
  }
  return context;
};

const FilterssProvider = ( { children }: { children: ReactNode } ) => {
  const [ search, setSearch ] = useState<string>( filtersLocalStorage.getSearch() || '' )
  const [ sortBy, setSortBy ] = useState<string>( filtersLocalStorage.getSort() || SORT_BY_NAME )

  const onSeach = useCallback( ( val: string ) => {
    filtersLocalStorage.setSearch( val )
    setSearch( val )
  }, [] )

  const onSort = useCallback( ( val: string ) => {
    filtersLocalStorage.setSort( val )
    setSortBy( val )
  }, [] )

  const reset = useCallback( () => {
    setSearch( '' )
    setSortBy( SORT_BY_NAME )
    filtersLocalStorage.setSearch( '' )
    filtersLocalStorage.setSort( SORT_BY_NAME )
  }, [ setSearch, setSortBy ] );

  return (
    <FiltersContext.Provider
      value={ { search, sortBy, onSeach, onSort, reset } }
    >
      { children }
    </FiltersContext.Provider>
  );
};


export default FilterssProvider;
export {
  useFilters,
  SortOptions,
  SORT_BY_NAME,
  SORT_BY_PRICE,
  SORT_BY_RECENTLY_ADDED
}