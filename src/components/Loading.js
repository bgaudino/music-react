import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
  },
};
export default function Loading() {
  return (
    <div style={styles.container}>
      <CircularProgress />
    </div>
  );
}
