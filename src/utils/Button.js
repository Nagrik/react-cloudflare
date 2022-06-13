import styled from "styled-components";
import React from 'react';

const Button = () => {
    return (
        <Wrapper>
            <Plus>+</Plus>
            <ButtonText>Add Additional Contact</ButtonText>
        </Wrapper>
    );
};

export default Button;


const Wrapper = styled.div`
  height: 30px;
  background-color: #333333;
  width: 170px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: white;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
`

const Plus = styled.div`
    font-size: 16px;
  padding-bottom: 2px;
`

const ButtonText = styled.div`
  padding-left: 5px;
`