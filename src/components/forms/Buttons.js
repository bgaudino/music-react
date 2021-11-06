import { Button, Grid } from "@material-ui/core";

export default function Buttons(props) {
  const { isMobile, onPlay, onClear, onCalculate, playDisabled, clearDisabled} = props;
  return (
    <>
      {!isMobile && (
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={onClear}
            disabled={clearDisabled}
          >
            Clear
          </Button>
        </Grid>
      )}
      <Grid item xs={12} sm={4}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onCalculate}
        >
          Calculate
        </Button>
      </Grid>
      {!isMobile && (
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            disabled={playDisabled}
            variant="contained"
            color="secondary"
            onClick={onPlay}
          >
            Play
          </Button>
        </Grid>
      )}
    </>
  );
}
