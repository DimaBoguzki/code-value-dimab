import { Container, Stack } from "@mui/material"
import AppBar from "./components/layout/AppBar"
import FilterssProvider from "./context/filters"
import ProductsProvider from "./context/products"
import AppRoute from "./Route"


function App() {
  return (
    <ProductsProvider>
      <FilterssProvider>
        <Stack flexGrow={ 1 } sx={ { height: '100vh', overflowY: 'hidden' } }  >
          <AppBar />
          <Container
            sx={ {
              pt: 2,
              pb: 7,
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              overflowY: 'hidden',
            } }
          >
            <AppRoute />
          </Container>
        </Stack>
      </FilterssProvider>
    </ProductsProvider>

  )
}

export default App
