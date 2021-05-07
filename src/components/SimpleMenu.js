import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    props.onClick(e);
  };

  return (
    <div id="mobile">
      <Button style={{color: 'white'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Scale Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Interval Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Chord Calculator</MenuItem>
        <MenuItem onClick={handleClose}>Note Identification</MenuItem>
        <MenuItem onClick={handleClose}>Interval Eartraining</MenuItem>
        <MenuItem onClick={handleClose}>Leaderboard</MenuItem>
      </Menu>
    </div>
  );
}
