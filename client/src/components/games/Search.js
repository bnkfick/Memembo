import React from 'react'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import styled from 'styled-components';

const StyledInputGroup = styled(InputGroup) `
max-width: 40rem;
margin: 0 1rem;
`

const Search = () => {
    return (
        <>
            <StyledInputGroup>
                <Input />
                <InputGroupAddon addonType="append">
                <Button color="secondary">SEARCH</Button>
                </InputGroupAddon>
            </StyledInputGroup>
        </>
    )
}

export default Search;