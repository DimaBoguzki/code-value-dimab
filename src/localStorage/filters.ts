const SERACH = "search";
const SORT = "sort";

const setSearch = ( value: string ): void => {
  window.localStorage.setItem( SERACH, value );
}
const getSearch = (): string => {
  return window.localStorage.getItem( SERACH ) || '';
}


const setSort = ( value: string ): void => {
  window.localStorage.setItem( SORT, value );
}
const getSort = (): string => {
  return window.localStorage.getItem( SORT ) || '';
}

const filtersLocalStorage = {
  setSearch,
  getSearch,
  setSort,
  getSort
}

export default filtersLocalStorage;