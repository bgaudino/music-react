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

export function FormItem(props) {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box
      style={{
        padding: isMobile ? 0 : "0 0.5rem",
        gridColumn: isMobile ? "span 3" : "span 1",
      }}
    >
      {props.children}
    </Box>
  );
}
