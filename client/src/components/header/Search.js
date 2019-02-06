import React from 'react'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import styled from 'styled-components';

const StyledInputGroup = styled(InputGroup)`
max-width: 40rem;
margin: 0 1rem;
`
const SearchButton = styled(Button)`
    width: 3.5rem;
    
    background-color: rgb(94, 39, 163);
    border: 1px solid rgb(25, 9, 45);
    font-size: 1.5rem;
    /* margin-left: 0 !important;
    padding-left: 0 !important; */

    &:hover{
        background-color: rgb(25, 9, 45);
        border: 1px solid white;
        /* transform: scale(1.12); */
    };
`

const SearchInput = styled(Input)`
    height: 3.65rem;
    font-size: 1.5rem;
    background-color: rgb(232, 216, 255);
`

const Search = (props) => {
    return (
        <>
            <StyledInputGroup>
                <SearchInput
                    onChange={props.onChange}
                    placeholder="Search Games"
                />
                <InputGroupAddon addonType="append">
                    <SearchButton ><i className="fa fa-search" aria-hidden="true"></i></SearchButton>
                </InputGroupAddon>
            </StyledInputGroup>
        </>
    )
}


              
export default Search;


// function Search(props) {
//     return (
//       <form className="search">
//                     <div className="form-group">
//                         <label htmlFor="breed">Breed Name:</label>
//                         <input
//                             value={props.search}
//                             onChange={props.handleInputChange}
//                             name="breed"
//                             list="breeds"
//                             type="text"
//                             className="form-control"
//                             placeholder="Type in a dog breed to begin"
//                             id="breed"
//                         />
//                         <datalist id="breeds">
//                             {props.breeds.map(breed => (
//                                 <option value={breed} key={breed} />
//                             ))}
//                         </datalist>
//                         <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
//                             Search
//           </button>
//                     </div>
//                 </form>
                
             