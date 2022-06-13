import React, {useEffect, useState} from 'react';
import Close from "../assets/Icons/Close";
import styled, {keyframes} from "styled-components";
import {Input} from "../utils/Input";
import {ContactInputsWrapper, InputWrapper} from "../App";
import './checkbox.css'

const AdditionalContact = ({contactNumber, setCountContact, countContact, handleDeleteContact, item}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        body()
    }, [firstName, lastName, email, isChecked])
    const body = () => {
        const arr = countContact
        arr.filter((itemArr) => itemArr.id === item.id ? itemArr.firstName = firstName : '')
        setCountContact(arr);
    }
    const handleChangeFirstName = (e) => {
        const name = e.target.value

        setFirstName(name)
        // countContact[id][name] = name;
    }
    const handleChangeSecondName = (e) => {
        const lastName = e.target.value
        setLastName(lastName)
        // countContact[id][name] = name;
    }
    const handleChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
        // countContact[id][name] = name;
    }
    console.log(countContact, 'count')

    return (
        <Wrapper index={item.id} countContact={countContact} className={'item'}>
            <AdditionalContactWrapper>
                <IconWrapper onClick={() => handleDeleteContact(item.id)}>
                    <Close/>
                </IconWrapper>
            <Title>
                Additional Contacts {' '} {contactNumber}
            </Title>
            </AdditionalContactWrapper>
            <FormWrapp>
            <Name>
                Name
            </Name>
            <ContactInputsWrapper>
                <InputWrapper>
                    <Input
                        placeholder={'First'}
                        background={'#F5F2F2FF'}
                        additional={'#e9e7e7'}
                        index={item.id}
                        value={item.firstName}
                        countContact={countContact}
                        onChange={(e) => handleChangeFirstName(e)}
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper>
                    <Input
                        placeholder={'Last'}
                        additional={'#e9e7e7'}
                        background={'#F5F2F2FF'}
                        index={item.id}
                        countContact={countContact}
                        onChange={(e) => handleChangeSecondName(e.target.value)}
                    />
                </InputWrapper>
            </ContactInputsWrapper>
            <Subtitle>
                Email
            </Subtitle>
                <Input
                    additional={'#e9e7e7'}
                    background={'#F5F2F2FF'}
                    index={item.id}
                    countContact={countContact}
                    onChange={(e) => handleChangeEmail(e.target.value)}
                />
            </FormWrapp>
            <label className="container" onClick={() => setIsChecked(!isChecked)}>
                Include in billing emails
                <input type="checkbox"/>
                    <span className="checkmark"></span>
            </label>
        </Wrapper>
    );
};

export default AdditionalContact;



const rotate = keyframes`
  from {
  opacity: 1;
  }

  to {
opacity: 0;
  }
`;

const Wrapper = styled.div`
  padding: 25px 25px 30px 20px;
  background-color: ${props => props.index === props.countContact[0] ? '#F5F2F2FF' : '#fff'};
  margin-bottom: 15px;
  border: ${props => props.index === props.countContact[0] ? '1px solid #F5F2F2FF' : 'none'};};
`

const FormWrapp = styled.div`
  padding-left: 25px;
  
`

const Subtitle = styled.div`
  font-size: 12px;
  padding-top: 8px;
`

const AdditionalContactWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Space = styled.div`
  width: 40px;
`

const Name = styled.div`
  padding-top: 15px;
  font-size: 12px;
`

const Title = styled.div`
  font-size: 16px;
  color: #54565A;
  font-weight: bold;
  padding-left: 5px;
`

const IconWrapper = styled.div`
    cursor: pointer;
`