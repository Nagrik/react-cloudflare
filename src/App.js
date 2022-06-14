import styled, {keyframes} from "styled-components";
import logo from "./assets/images/logo.png";
import { Input } from "./utils/Input";
import AdditionalContact from "./Components/AdditionalContact";
import {useState} from "react";
import Button from "./utils/Button";
import {CSSTransition, Transition, TransitionGroup} from "react-transition-group";
import useOnClickOutside from "./utils/useOnClickOutside";
import SelectCountryPostal from "./Components/SelectCountryPostal";
import SelectCountryStreet from "./Components/SelectCountryStreet";
import {sort} from "./utils/sortUtils";
function App() {
    const [countContact, setCountContact] = useState([{firstName:'', lastName: '', email: '', includeEmails: false, id: 1}])
    const [countryOpen, setCountryOpen] = useState(false)
    const [countryStreetOpen, setCountryStreetOpen] = useState(false)
    const [sameAddress, setSameAddress] = useState(false)




    const handleAddContact = (arr) => {
        if(arr.length === 0){
            setCountContact([{firstName:'', lastName: '', email: '', includeEmails: false, id: 1}])
        }else{
            setCountContact([...countContact, {firstName:'', lastName: '', email: '', includeEmails: false, id: countContact[countContact.length -1].id + 1}])

        }
        console.log(arr, 'add')
    }


    const countryRef = useOnClickOutside(() => {
        if(countryOpen){
            setCountryOpen(false);
        }
    });

    const countryStreetRef = useOnClickOutside(() => {
        if(countryStreetOpen){
            setCountryStreetOpen(false);
        }
    });

    // const arr = Array(countContact.length).fill().map((x,i)=>i + 1)

    const calculateOrdinalNumber = countContact && countContact.map(
        (item, index) => ({ ...item, ordinalNumber: index + 1 }),
    );

    const withoutNone = [];
    calculateOrdinalNumber?.forEach((item) => {
        if (item) withoutNone.push(item);
    });
    const sorted = sort(withoutNone,
        ((item) => item), 'asc', 'number');

    const toggleAddress = () => {
        setSameAddress(!sameAddress)
    }

    const handleDeleteContact = (id) => {
        console.log(id)
        // const qwe = countContact.indexOf(index);
        // if (qwe > -1) {
        //     const abc = countContact.splice(qwe, 1);
        //     console.log(abc)
        // }
        // const newArray = countContact.filter(function (f) {
        //     return f.id !== id ;
        // });
        setCountContact(countContact => countContact.filter(item => item.id !== id));
        // console.log(newArray, 'new')
        // setCountContact(newArray)
    }
    return (
    <Wrapper>
      <LogoWrapper>
          <Logo src={logo} alt="logo" />
      </LogoWrapper>
        <WelcomeWrapper>
            <Title>
                Welcome to the onboarding platform for the Meshed Group.
            </Title>
            <Subtitle>
                Kindly enter all of your
                company and contact persons'
                billing details below. Once
                you are happy with the details,
                please submit to the Meshed Group for approval.
            </Subtitle>
        </WelcomeWrapper>
        <Title>
            Invoicing Details
        </Title>
        <Subtitle>
            Company Name
        </Subtitle>
        <Input/>
        <Title>
            Company Contact Persons
        </Title>
        <Title2>
            Primary Billing Contact
        </Title2>
        <Subtitle>
            Name
        </Subtitle>
        <ContactInputsWrapper>
            <InputWrapper>
                <Input placeholder={'First'}/>
            </InputWrapper>
            <Space/>
            <InputWrapper>
                <Input placeholder={'Last'}/>
            </InputWrapper>
        </ContactInputsWrapper>
        <SubtitleRequired>
            Email
        </SubtitleRequired>
        <Input required={true}/>
        <Title>
            Additional Contacts
        </Title>

        <TransitionGroup
            component={'div'}
        >
            {
                countContact.map((i , index) => (
                <CSSTransition
                    timeout={500}
                    classNames="item"
                    key={i.id}
                >
                    <div>
                            <AdditionalContact
                                contactNumber={index + 1}
                                key={index}
                                index={i.id}
                                item={i}
                                countContact={countContact}
                                handleDeleteContact={() => handleDeleteContact(i.id)}
                                setCountContact={setCountContact}
                            />
                    </div>
                </CSSTransition>
            ))
        }
        </TransitionGroup>
        <ButtonWrapper onClick={() => handleAddContact(countContact)}>
            <Button />
        </ButtonWrapper>
        <CompanyDetails>
        <Title>
            Company Contact Details
        </Title>
        <Subtitle>
            Mobile
        </Subtitle>
        <Input/>
        <Subtitle2>
            Website
        </Subtitle2>
        <Input/>
        </CompanyDetails>
        <Title>
            Company Addresses
        </Title>
        <Title2>
            Postal Address
        </Title2>
        <Subtitle>
            Attention
        </Subtitle>
        <Input/>
        <Subtitle2>
            Address
        </Subtitle2>
        <Input placeholder={'Address Line 1'}/>
        <Input placeholder={'Address Line 2'}/>
        <ContactInputsWrapper>
            <InputWrapper>
                <Input placeholder={'City'}/>
            </InputWrapper>
                <Space/>
            <InputWrapper>
                <Input placeholder={'State / Province / Region'}/>
            </InputWrapper>
            <Space/>
            <InputWrapper>
                <Input placeholder={'Portal / Zip Code'}/>
            </InputWrapper>
            <Space/>
            <InputWrapper ref={countryRef}>
                <SelectCountryPostal countryOpen={countryOpen} setCountryOpen={setCountryOpen}/>
            </InputWrapper>
        </ContactInputsWrapper>

        <Title>
            Street Address
        </Title>

        <label style={{display: 'flex', alignItems: 'center', width: '250px'}} onClick={toggleAddress}>
            <input type="checkbox"  name="same" value="no" style={{maxWidth: '100%', width: 'unset'}}/>
            <div style={{whiteSpace: 'nowrap', padding: '0px 10px', fontSize: '12px'}}>Same as postal address</div>
        </label><br/>

        <SameAddress sameAddress={sameAddress}>
        {
            sameAddress === false && (
                <>
                <Subtitle2>
                Address
            </Subtitle2>
            <Input placeholder={'Address Line 1'}/>
            <Input placeholder={'Address Line 2'}/>
            <ContactInputsWrapper>
            <InputWrapper>
            <Input placeholder={'City'}/>
            </InputWrapper>
            <Space/>
            <InputWrapper>
            <Input placeholder={'State / Province / Region'}/>
            </InputWrapper>
            <Space/>
            <InputWrapper>
            <Input placeholder={'Portal / Zip Code'}/>
            </InputWrapper>
            <Space/>
            <InputWrapper ref={countryStreetRef}>
            <SelectCountryStreet countryOpen={countryStreetOpen} setCountryOpen={setCountryStreetOpen}/>
            </InputWrapper>
            </ContactInputsWrapper>
                </>
            )
        }
        </SameAddress>

        <Title>
            Company Financial Details
        </Title>
        <Subtitle>
            VAT Number
        </Subtitle>
        <Input/>
        <Subtitle2>
            Business Registration Number
        </Subtitle2>
        <Input/>
        <SubtitleRequired>
            Would you be interested in paying by debit order?
        </SubtitleRequired>
        <RadioButtonsWrapp>
            <Label>
                <input style={{maxWidth: '100%'}} type="radio" name="order" value="yes" required/>
                   <div style={{padding: '0 5px'}}>No</div>
            </Label>
                <br/>
            <Label>
                <input type="radio" style={{maxWidth: '100%'}} name="order" value="no"/>
                <div style={{padding: '0 5px'}}>Yes</div>
            </Label><br/>
        </RadioButtonsWrapp>
        <ButtonsWrapper>
            <ButtonSubmit >
                Submit
            </ButtonSubmit>
            <ButtonSave >
                Save
            </ButtonSave>
        </ButtonsWrapper>
    </Wrapper>
  );
}

export default App;


const Wrapper = styled.div`
  margin-bottom: 30px;
  padding: 60px;
  background-color: #fff;
`

const rotate = keyframes`
  from {
  opacity: 1;
  }

  to {
opacity: 0;
  }
`;

const SameAddress = styled.div`
  //animation: ${props => props.sameAddress === false ? 'none' : rotate} 1s ease-in-out infinite;
`

const ButtonSubmit = styled.div`
  width: 80px;
  height: 33px;
  font-size: 12px;
  font-family: 'Verdana', sans-serif;
  background-color: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ButtonSave = styled.div`
  width: 80px;
  height: 33px;
  font-size: 12px;
  background-color: black;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-top: 75px;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  width: 55px;
  font-size: 12px;
`

const RadioButtonsWrapp = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  `

const Space = styled.div`
  width: 40px;
`

const Subtitle2 = styled.div`
  font-size: 12px;
  padding-top: 20px;
  padding-bottom: 10px;
`

const CompanyDetails = styled.div`
  padding: 20px 0;
`

const ButtonWrapper = styled.div`

`

const LogoWrapper = styled.div`
  
`

const Logo = styled.img`
max-width: 100%;
  object-fit: cover;
`

const WelcomeWrapper = styled.div`
  padding: 15px 0 ;
`

export const Title = styled.div`
  font-size: 16px;
  color: #54565A;
  font-weight: bold;
  padding-bottom: 14px;
  padding-top: 20px;
`

const Title2 = styled.div`
  font-size: 16px;
  color: #54565A;
  font-weight: bold;
  padding-bottom: 14px;
  padding-top: 6px;`

const Subtitle = styled.div`
  font-size: 12px;
`

const SubtitleRequired = styled.div`
  font-size: 12px;
  padding-top: 20px;
  &::after {
    content: '*';
    color: darkred;
    padding: 2px;
  }
`

export const ContactInputsWrapper = styled.div`
display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`

export const InputWrapper = styled.div`
  width: 100%;
`
