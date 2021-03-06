import {
  ActionBugReport, NavigationMoreVert
} from 'material-ui/svg-icons';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import GithubIcon from '~/src/app/icons/GithubIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router';
import MenuItemExternal from '~/src/app/components/MenuItemExternal';
import MenuItemRoute from '~/src/app/components/MenuItemRoute';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import { getRouteList } from '~/src/app/routes';
import { openHeaderMenu } from '~/src/app/actions/headerMenuOpen';
import packageInfo from '~/package.json';

const author = packageInfo.author.name;
const githubUrl = `https://github.com/${author}/${packageInfo.name}/`;
const issuesUrl = `${packageInfo.bugs.url}`;

export class Header extends Component {
  render() {
    const { headerMenuOpen, onHeaderChange, routerPath } = this.props;
    const routes = getRouteList();
    const activeRoute = routes.find((r) => r.get('path') === routerPath);
    const height = 50;
    let icon;
    let title;
    if (activeRoute) {
      title = activeRoute.get('title');
      icon = React.cloneElement(activeRoute.get('icon'), {
        color: 'white',
        style: {
          height: height
        }
      });
    }
    const linkStyle = {
      textDecoration: 'none',
      color: 'white'
    };
    return (
      <header>
        <AppBar
          titleStyle={{ lineHeight: null, fontSize: null }}
          title={
            <div>
              <div style={{ float: 'left' }}>
                <h1 style={{ margin: 0, lineHeight: `${height}px` }}>
                  <Link to={`/${packageInfo.name}`} style={linkStyle}>
                    {packageInfo.name.toUpperCase()}
                  </Link>
                </h1>
              </div>
              <div style={{ float: 'right' }}>
                <div style={{ float: 'left', margin: '0px 15px' }}>
                  {icon}
                </div>
                <div style={{ float: 'left' }}>
                  <h1 style={{
                    lineHeight: `${height}px`,
                    fontSize: '15px',
                    margin: 0
                  }}>
                    {title}
                  </h1>
                </div>
              </div>
            </div>
          }
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              open={headerMenuOpen}
              onRequestChange={onHeaderChange}
              iconButtonElement={
                <IconButton>
                  <NavigationMoreVert />
                </IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <Subheader>Navigation</Subheader>
              {routes.filter((route) => route.get('key') !== 'notfound')
                .map((route) => <MenuItemRoute
                  key={route.get('key')} route={route} />)}
              <Divider />
              <Subheader>External Links</Subheader>
              <MenuItemExternal primaryText="Source Code"
                leftIcon={<GithubIcon />}
                url={githubUrl} />
              <MenuItemExternal primaryText="Report Bug"
                leftIcon={<ActionBugReport />}
                url={issuesUrl} />
            </IconMenu>
          }
        />
      </header>
    );
  }
}

Header.propTypes = {
  headerMenuOpen: React.PropTypes.bool.isRequired,
  onHeaderChange: React.PropTypes.func.isRequired,
  routerPath: React.PropTypes.string.isRequired
};

Header.contextTypes = {
  router: React.PropTypes.object
};

export function mapDispatchToProps(dispatch) {
  return {
    onHeaderChange: (open) => dispatch(openHeaderMenu(open))
  };
}

export default connect((state) => {
  return {
    headerMenuOpen: state.headerMenuOpen
  };
}, mapDispatchToProps)(Header);
