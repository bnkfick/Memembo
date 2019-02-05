import ButtonManager from './ButtonManager';

export default ButtonManager;

// import React, { Component } from "react";

// class Nav extends Component { 
//     state = {
//         searchTxt: ""
//     }
//     searchFunction = () => {
//         //API call to search for it
//     }

//     handleInputChange = ({target:{value:searchTxt}}) => {
//         //We would setState, which causes re render and changes the view
//         this.setState({searchTxt});
//     }
//     render(){
//         return (
//             <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//               <a className="navbar-brand" href="/">
//                 React Reading List
//               </a>

//               <input onChange={this.handleInputChange} value={this.state.searchTxt} /> // fill this
//               <button onClick ={this.searchFunction}></button>
//             </nav>
//           );
//     }
  
// }

// export default Nav;