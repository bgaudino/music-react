import { Box, Container, useMediaQuery } from "@material-ui/core";

export default function Layout(props) {
  return (
    <Container maxWidth="md">
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        {props.children}
      </Box>
    </Container>
  );
}

