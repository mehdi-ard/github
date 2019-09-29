import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// const options = [
//   'None',
//   'Atria',
//   'Callisto',
//   'Dione',
//   'Ganymede',
//   'Hangouts Call',
//   'Luna',
//   'Oberon',
//   'Phobos',
//   'Pyxis',
//   'Sedna',
//   'Titania',
//   'Triton',
//   'Umbriel'
// ];

const ITEM_HEIGHT = 30;

class LongMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    console.log('event', event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleChoice = key => () => {
    // console.log('handleChoice', this.props);
    this.setState({ anchorEl: null });
    this.props.onChange(key);
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { options, icon, selected, className, iconClass } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={iconClass}
        >
          {icon}
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          className={className}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 15,
              width: 200
            }
          }}
        >
          {options.map(
            ({ key, value, menuClass }, index) =>
              value && (
                <MenuItem
                  key={index}
                  selected={selected === key}
                  onClick={this.handleChoice(key)}
                  className={menuClass}
                >
                  {value}
                </MenuItem>
              )
          )}
        </Menu>
      </div>
    );
  }
}

export default LongMenu;
