import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

const Header = () => {
  const mystyle = {
    color: "Orange",
  };
  return(
    <Menu style={{marginTop: '10px'}}>
      <Link route = "/">
        <a style={mystyle} className="item">
        India Voting System
        </a>
      </Link>

      <Menu.Menu position='right'>
        <Link route = "/">
          <a style={mystyle} className="item">
          Voting System Details
          </a>
        </Link>
        <Link route = "/votings/new">
          <a style={mystyle}  className="item">
          +
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
