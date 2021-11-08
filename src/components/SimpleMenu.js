import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const styles = {
    color: "black",
  };

  return (
    <div style={{ marginRight: "1rem" }}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link style={styles} to="/scale-calculator">
          <MenuItem onClick={handleClose}>Scale Calculator</MenuItem>
        </Link>
        <Link style={styles} to="/interval-calculator">
          <MenuItem onClick={handleClose}>Interval Calculator</MenuItem>
        </Link>
        <Link style={styles} to="/chord-calculator">
          <MenuItem onClick={handleClose}>Chord Calculator</MenuItem>
        </Link>
        <Link style={styles} to="/note-id">
          <MenuItem onClick={handleClose}>Note Identification</MenuItem>
        </Link>
        <Link style={styles} to="/interval-eartraining">
          <MenuItem onClick={handleClose}>Interval Eartraining</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
