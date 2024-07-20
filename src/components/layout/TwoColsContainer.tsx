import { Box } from "@mui/material";

function TwoColsContainer( { children, fullHeight }: { children: React.ReactNode, fullHeight?: boolean } ) {
  return (
    <Box
      sx={ {
        gap: 3,
        display: 'grid',
        height: fullHeight ? '100%' : undefined,
        overflow: 'hidden',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr',
          md: '1fr 1fr',
          lg: '1fr 1fr',
          xl: '1fr 1fr'
        },
      } }
    >
      { children }
    </Box >
  )
}

export default TwoColsContainer;
