import styled from "styled-components";


export const Input = ({placeholder, value, required, additional, background, index, countContact, onChange, email}) => {
    return (
        <InputWrapper>
            <InputElement
                placeholder={placeholder}
                required={required}
                additional={additional}
                background={background}
                index={index}
                value={value}
                countContact={countContact}
                onChange={onChange}
                email={email}
            />
        </InputWrapper>
    );
};


const InputWrapper = styled.div`
  width: 100%;
  padding: 6px 0;
`

const InputElement = styled.input`
  border: none;
  border-bottom: 2px dashed #cccccc;
  width: 100%;
  padding: 8px 10px;
  outline: none;
  background-color: ${props => props.countContact && props.index === props.countContact[0].id  ? "#F5F2F2FF " : props.background ? props.background : "#fff"};

  &::placeholder {
    color: #c4c4c4;
  }

  &:focus {
    border-bottom:${props => props.email === null ?'2px dashed hsl(2, 70%, 47%)' : '2px dashed hsl(207, 85%, 60%)'} ;
    background-color:${props =>props.countContact &&  props.index === props.countContact[0].id ? "#e9e7e7" :  '#F5F2F2FF' };
  }
`