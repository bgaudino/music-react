import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    props.onClick(e);
  };

  const styles = {
    color: "black",
  };

  return (
    <div id="mobile">
      <Button
        style={{ color: "white" }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link style={styles} to="/scale-calculator">
            Scale Calculator
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link style={styles} to="/interval-calculator">
            Interval Calculator
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link style={styles} to="/chord-calculator">
            Chord Calculator
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link style={styles} to="/note-id">
            Note Identification
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link style={styles} to="/interval-eartraining">
            Interval Eartraining
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link style={styles} to="/leaderboard">
            Leaderboard
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
