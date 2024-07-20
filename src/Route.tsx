import { Box, CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

const ProductsManagerLazy = lazy( () => import( "./pages/ProductsManager" ) );
const ProductPageLazy = lazy( () => import( "./pages/ProductPage" ) )

const FullBack = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={ { height: '100vh', width: '100vw' } }>
      <CircularProgress />
    </Box>
  )
}

function AppRoute() {

  return (
    <Suspense fallback={ <FullBack /> }>
      <Routes>
        <Route path="/" element={ <ProductsManagerLazy /> } >
          <Route path="/:id" element={ <ProductPageLazy /> } />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoute;