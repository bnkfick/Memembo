import React from 'react';
import { Card, CardBody, FormGroup, Input, } from 'reactstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
        background-color: rgb(25, 9, 45);
        border: 1px solid white;

`


const CardForm = (props) => {
  return (
      <StyledCard>
        <CardBody>
            <FormGroup row>
                <Input  type="text" 
                        name="src" 
                        id="src" 
                        placeholder="Image URL"
                        
                />
            </FormGroup>
            
            <FormGroup row>
                <Input  type="text" 
                        name="cardName" 
                        id="cardName" 
                        placeholder="Item Name"
                />
            </FormGroup>
            
            <FormGroup row>
                <Input  type="text" 
                        name="details" 
                        id="details" 
                        placeholder="Details"
                />
            </FormGroup>

            <FormGroup row>
                <Input  type="select" 
                        name="category" 
                        id="category" 
                        placeholder="category"
                >
                    <option>[gameCategories-1]</option>
                    <option>[gameCategories-2]</option>
                    <option>[gameCategories-3]</option>
                    <option>[gameCategories-4]</option>
                </Input>
            </FormGroup>
        </CardBody>
      </StyledCard>
  );
};

export default CardForm;