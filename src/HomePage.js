import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {TitleBar} from 'react-desktop/windows';
import Paper from 'material-ui/Paper'
import ProfileForm from './ProfileForm';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { Provider } from 'react-redux';
import configureStore from './store';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import './styles/form.css';

const store = configureStore();


class HomePage extends Component {

  static defaultProps = {
    color: '#1A237E',
    theme: 'dark'
  };

  constructor(props){
    super(props);
    this.state = {
        open: true,
        onSettings: false,
        onServiceHistory: false,
        showProfileForm: false,
    };
  }
  
  handleDrawerItemClick = (e, item) => {
    if(item == 'MyCommunityService'){
      this.setState({onServiceHistory: true,
                    showProfileForm: false});
    }
    if(item == 'Profile'){
      this.setState({onServiceHistory: false,
                    showProfileForm: true});
    }
    if(item == 'Settings'){
      this.setState({onServiceHistory: false});
    }
  }

  render() {
  var table = this.state.onServiceHistory ?        
    <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn>John Smith</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>2</TableRowColumn>
        <TableRowColumn>Randal White</TableRowColumn>
        <TableRowColumn>Unemployed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>3</TableRowColumn>
        <TableRowColumn>Stephanie Sanders</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>4</TableRowColumn>
        <TableRowColumn>Steve Brown</TableRowColumn>
        <TableRowColumn>Employed</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>5</TableRowColumn>
        <TableRowColumn>Christopher Nolan</TableRowColumn>
        <TableRowColumn>Unemployed</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table> : <div></div>

  var profileForm = this.state.showProfileForm ? 
  <Provider store = {store}>
  <ProfileForm />
  </Provider>
  : <div></div>

    return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
        <Drawer open={this.state.open}>
          <MenuItem
          onClick = {(e) => this.handleDrawerItemClick(e,'Profile')}
          >Profile</MenuItem>
          <MenuItem 
          onClick = {(e) => this.handleDrawerItemClick(e,'MyCommunityService')}
          >MyCommunityService</MenuItem>
          <MenuItem
          onClick = {(e) => this.handleDrawerItemClick(e,'Settings')}
          >Settings</MenuItem>
        </Drawer>
        <Paper id = 'homePaper'>
        <div id = 'myCommunityServiceTable'>
          {table}
        </div>
        <div id = 'profileForm'>
          {profileForm}
        </div>
      </Paper>
      </div>
    </MuiThemeProvider>
    );
  }
} 

export default HomePage;

HomePage.propTypes = {
  color: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};

