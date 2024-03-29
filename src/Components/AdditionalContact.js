import React from 'react';
import Close from "../assets/Icons/Close";
import styled from "styled-components";
import {Input} from "../utils/Input";
import {ContactInputsWrapper, InputWrapper} from "../App";
import './checkbox.css'

const AdditionalContact = ({contactNumber, setCountContact, countContact, handleDeleteContact, item}) => {

    // console.log(includeEmails)
    const handleChangeFirstName = (e, id) => {
        const newName = e.target.value
        const lastArr = countContact.map((i)=> i.id === id ? {...i, FirstName: newName} : i)
        setCountContact(lastArr);
    }
    const handleChangeSecondName = (e, id) => {
        const newName = e.target.value
        const lastArr = countContact.map((i)=> i.id === id ? {...i, LastName: newName} : i)
        setCountContact(lastArr);
        // countContact[id][name] = name;
    }
    const handleChangeEmail = (e, id) => {
        const newName = e.target.value
        const lastArr = countContact.map((i)=> i.id === id ? {...i, EmailAddress: newName} : i)
        setCountContact(lastArr);
    }

    const handleChangeCheckBox = (e, id) => {
        const newName = e.target.checked
        const lastArr = countContact.map((i)=> i.id === id ? {...i, IncludeInEmails: newName} : i)
        setCountContact(lastArr);
    }

    return (
        <Wrapper index={item.id} countContact={countContact} className={'item'}>
            <AdditionalContactWrapper>
                <IconWrapper className='hidden' onClick={() => handleDeleteContact(item.id)}>
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
                        additional={'#e9e7e7'}
                        index={item.id}
                        value={item.FirstName}
                        countContact={countContact}
                        onChange={(e) => handleChangeFirstName(e, item.id)}
                    />
                </InputWrapper>
                <Space/>
                <InputWrapper>
                    <Input
                        placeholder={'Last'}
                        additional={'#e9e7e7'}
                        index={item.id}
                        value={item.LastName}
                        countContact={countContact}
                        onChange={(e) => handleChangeSecondName(e, item.id)}
                    />
                </InputWrapper>
            </ContactInputsWrapper>
            <Subtitle>
                Email
            </Subtitle>
                <Input
                    additional={'#e9e7e7'}
                    index={item.id}
                    value={item.EmailAddress}
                    countContact={countContact}
                    onChange={(e) => handleChangeEmail(e, item.id)}
                />
            </FormWrapp>
            <label className="container additional-contact-checkbox" style={{fontFamily: 'Verdana, sans-serif', fontSize: '12px'}}>
                <span>Include in billing emails</span>
                <input type="checkbox" checked={item.IncludeInEmails}  onChange={(e) => handleChangeCheckBox(e, item.id)}/>
                    <span className="checkmark"></span>
            </label>
        </Wrapper>
    );
};

export default AdditionalContact;


const Wrapper = styled.div`
  padding: 25px 25px 30px 20px;
  background-color: ${props => props.index === props.countContact[0].id ? '#F5F2F2FF' : '#fff'};
  margin-bottom: 15px;
  border: ${props => props.index === props.countContact[0].id ? '1px solid #F5F2F2FF' : 'none'};};
`

const FormWrapp = styled.div`
  padding-left: 25px;
  
`

const Subtitle = styled.div`
  font-size: 12px;
  font-family: 'Verdana', sans-serif;
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
  font-family: 'Verdana', sans-serif;
`

const Title = styled.div`
  font-size: 16px;
  font-family: 'Verdana', sans-serif;
  color: #54565A;
  font-weight: bold;
  padding-left: 5px;
`

const IconWrapper = styled.div`
    cursor: pointer;
`