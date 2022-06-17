import React from 'react';
import styled from "styled-components";
import CloseIcon from "../assets/Icons/CloseIcon";
import {Input} from "../utils/Input";
import {InputWrapper} from "../App";
import useInput from "../utils/useInput";

const SaveModal = ({value, modalRef, setModal}) => {

    const handleClickButton = () => {
        console.log('123')
    }

    const [email, setEmail] = useInput(null)
    return (
        <GlobalWrapper>
            <Wrapper >
                <CloseIconWrapper onClick={() => setModal(false)}>
                    <CloseIcon/>
                </CloseIconWrapper>
                <Title>
                    Your progress has been saved
                </Title>
                <Subtitle>
                    Copy or email the link below and return to your form to complete your submission.
                </Subtitle>
                <SubtitleCopy>
                    Copy your form link:
                </SubtitleCopy>
                <InputWrapper>
                    <Input value={value}/>
                </InputWrapper>
                <SubtitleEmail>
                    Email me my link:
                </SubtitleEmail>
                <InputWithButton>
                <InputWrapper>
                    <Input onChange={setEmail}/>
                </InputWrapper>
                <Button disabled={!email} email={email} onClick={handleClickButton}>
                    Send
                </Button>
                </InputWithButton>
            </Wrapper>
        </GlobalWrapper>
    );
};

export default SaveModal;

const Wrapper = styled.div`
  max-width: 467px;
  height: 267px;
  background-color: white;
  position: relative;
  padding: 0px 37px 37px 37px;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color:${props => props.email !== null ? '#000' : '#cccc'};
  padding: 7px;
  font-size: 12px;
  font-family: 'Verdana',sans-serif;
  cursor: pointer;
  background-color: #eeeeee;
  width: 63px;
  height: 35px;
  margin-left: 10px;
  outline: none;
  border: none;
`

const InputWithButton = styled.div`
  display: flex;
  align-items: center;
`


const Title = styled.div`
  color: #54565A;
  font-size: 16px;
  font-family: 'Verdana',sans-serif;
  font-weight: 600 ;
  margin-top: 20px;
  padding: 15px 0;
`

const Subtitle = styled.div`
  font-family: 'Verdana',sans-serif;
  font-size: 12px;
  padding-right: 45px;
`

const SubtitleCopy = styled.div`
  font-family: 'Verdana',sans-serif;
  font-size: 12px;
  padding-right: 45px;
  padding-top: 50px;
`

const SubtitleEmail = styled.div`
  font-family: 'Verdana',sans-serif;
  font-size: 12px;
  padding-right: 45px;
  padding-top: 20px;
`


const CloseIconWrapper = styled.div`
  position: absolute; 
  top: 7px;
  right: 7px;
  cursor: pointer;
`

const GlobalWrapper = styled.div`
  min-height: 100%;
  min-width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`