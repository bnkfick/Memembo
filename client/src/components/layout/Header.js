import React, { Component } from 'react';
import Search from '../games/Search';
import { Link }       from 'react-router-dom'
import SignedInLinks  from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

//https://github.com/reactstrap/reactstrap
// https://reactstrap.github.io/components/navbar/

import { Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';

const StyledRow = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
// const NavbarSearch = styled.div `
// margin:0 1rem !important;
// `

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <>
        <Navbar color="dark" dark>
          <StyledRow>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
             
            {/* <NavbarSearch> */}
              <Search />
            {/* </NavbarSearch> */}
             
           
             <NavbarBrand href="/" className="text-right">MEMEMBO</NavbarBrand>
          </StyledRow>

            
              
            
            
         

          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="#">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create">Create Game</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">LogIn/LogOut</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Profile Settings</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}