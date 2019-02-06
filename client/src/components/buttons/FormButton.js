import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';

  const StyledFormButton =  styled(Container)`
  background-color: rgba(95, 5, 250, 0.50);
  backdrop-filter: blur(5px);   
  -webkit-backdrop-filter: blur(5px); 
  border: 1px solid rgb(25, 9, 45);
  border-radius: 5px;
  font-size: 1.5rem;
  height: 4rem;
  letter-spacing: 0.3rem;
  margin-left: -1rem;
  padding-top: 0.75rem;
  text-align: center;
  width: calc(100% + 2rem);
  
  &:hover{
      background-color: rgba(95, 5, 250, 0.75);
      backdrop-filter: blur(5px);   
      -webkit-backdrop-filter: blur(5px);
      border: 1px solid white;
      cursor: pointer;
  }
      
`

const FormButton = () => {
  return (
    <StyledFormButton>
          
    </StyledFormButton>
  );
};

export default FormButton;