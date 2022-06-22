import React, {useEffect} from 'react';
import styled from "styled-components";
import CloseIcon from "../assets/Icons/CloseIcon";
import {Input} from "../utils/Input";
import {InputWrapper} from "../App";
import useInput from "../utils/useInput";
import axios from "axios";

const SaveModal = ({value,location, toggleSended, setModal, id}) => {
    const [email, setEmail] = useInput(null)
    const [access_token, setAccessToken] = useInput(null)




    const refresh_token = '1//0cDMymqxuckObCgYIARAAGAwSNwF-L9IrN7QFXLmcAwIpLcJUhqOYcyr7xzYiBZtwxAe6EEWFyGQdrQ7yF7UJ_4QC1tzachpbxcw'
    const client_secret = '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'
    const client_id = '403335361412-ha6htstgp4b4ej3ramp8mcpfa85l0vk2.apps.googleusercontent.com'

    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refresh_token)
    params.append('client_secret', client_secret)
    params.append('client_id', client_id)

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const handleGetAccessToken = () => {
        axios.post('https://oauth2.googleapis.com/token', params, config).then(r => {
            setAccessToken(r.data.access_token)
        })
    }


    const text = `From: Roman Nahryshko <lunaxodd@gmail.com> 
To: <${email}> 
Subject: Saying Hello 
Date: Tue, 22 Jun 2022 13:40:00 -0200 
Message-ID: <1234@local.machine.example>

This is a link to continue filling out the form: https://react-cloudflare-4yy.pages.dev/${id}".
`
    const enctyptedText = window.btoa(text);



    useEffect(() => {
        handleGetAccessToken()
    }, [])

    console.log(access_token)

    const handleClickButton = () => {
            axios.post('https://gmail.googleapis.com/gmail/v1/users/lunaxodd%40gmail.com/messages/send?key=AIzaSyAtPoCSY-ZLzE66L_-5USYOmVHs8Rl2t_o', {
                "raw": enctyptedText
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + access_token
                }
            })
        setModal(false)
        toggleSended(true)
    }

    return (
            <div >
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
            </div>
    );
};

export default SaveModal;



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

