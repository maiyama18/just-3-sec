import React from 'react';
import { connect } from "react-redux";
import { Menu, Button } from 'semantic-ui-react';

import { newGame } from "../actions";

const Header = ({ handleClick }) => (
    <Menu borderless style={{marginBottom: '2rem'}}>
      <Menu.Item header content='JUST 3 SEC'/>
      <Menu.Item position='right'>
        <Button color='teal' onClick={() => handleClick()}>new game</Button>
      </Menu.Item>
    </Menu>
);

export default connect(
    _ => ({}),
    dispatch => ({ handleClick: () => dispatch(newGame()) })
)(Header);