import React, { Component } from 'react';
import Search from './Search';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  overflow: hidden;
  position: fixed; 
  top: 0; 
  width: 100%; 
  z-index: 1000;
`
const StyledRow = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const StyledNavbarBrand = styled.a`
  /* color: rgba(95, 5, 250, 1); */
  font-family: 'Fredericka the Great', cursive;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 0.35rem;
  /* margin-right: 3rem; */
  padding: 0;

`

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
      
        <StyledNavbar color="dark" dark>
        <Container>
          <StyledRow>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            {/* <NavbarSearch> */}
              {/* <Search /> */}
            {/* </NavbarSearch> */}
             <StyledNavbarBrand href="/">M&#477;&#8901;mem&#8901;bo&#772;</StyledNavbarBrand>
          </StyledRow>

          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create-game">Create Game</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">LogIn/LogOut</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile">Profile Settings</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </Container>
        </StyledNavbar>
      
    
    );
  }
}