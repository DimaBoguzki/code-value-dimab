import { Box } from "@mui/material";

function FakeImage( { width, height }: { width: number, height: number } ) {
  return (
    <Box
      width={ width } height={ height }
      sx={ { background: '#dddddd' } }
      borderRadius={ 1 }
    />
  )
}

export default FakeImage;