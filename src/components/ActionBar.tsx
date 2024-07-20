import { Box, Button } from "@mui/material";
import { AppTextField, SelectApp } from "./inputs";
import SearchIcon from '@mui/icons-material/Search';

function ActionBar( props: {
  onAdd: () => void;
  sort?: {
    value: string;
    options: string[];
    onChange: ( value: string ) => void;
  }
  search?: {
    value: string
    onChange: ( value: string ) => void
  }
} ) {
  const { onAdd, sort, search } = props
  return (
    <Box display='flex' alignItems='center' columnGap={ 2 }>
      <Button
        variant="contained"
        onClick={ onAdd }
      >
        Add
      </Button>
      { search ? (
        <AppTextField
          onChange={ ( val ) => search.onChange( val ) }
          placeholder="Search..."
          isSearch
          value={ search.value }
          icon={ <SearchIcon fontSize="small" /> }
        />
      ) : null }
      { sort ? (
        <SelectApp
          label="Sort by"
          options={ sort.options }
          onChange={ ( val ) => sort.onChange( val ) }
          value={ sort.value }
        />
      ) : null }
    </Box>
  )
}

export default ActionBar