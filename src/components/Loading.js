import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "rgba(0,0,0,0.5)",
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
