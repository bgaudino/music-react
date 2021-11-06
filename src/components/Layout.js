import { Box, Container, useMediaQuery } from "@material-ui/core";

export default function Layout(props) {
  return (
    <Container maxWidth="md">
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {props.children}
      </Box>
    </Container>
  );
}

export function FormItem(props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box
      style={{
        padding: "1rem",
        gridColumn: isMobile ? "span 3" : "span 1",
      }}
    >
      {props.children}
    </Box>
  );
}
