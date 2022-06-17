import styled, {keyframes} from "styled-components";
import logo from "./assets/images/logo.png";
import { Input } from "./utils/Input";
import AdditionalContact from "./Components/AdditionalContact";
import {useEffect, useState} from "react";
import './Components/checkbox.css'
import Button from "./utils/Button";
import {CSSTransition, Transition, TransitionGroup} from "react-transition-group";
import useOnClickOutside from "./utils/useOnClickOutside";
import SelectCountryPostal from "./Components/SelectCountryPostal";
import SelectCountryStreet from "./Components/SelectCountryStreet";
import useInput from "./utils/useInput";
import Settings from "./assets/Icons/Settings";
import axios from "axios";
import MyToast from "./Components/Toast";
import useToggle from "./utils/useToggle";
import SaveModal from "./Components/SaveModal";
function App() {
    const [countContact, setCountContact] = useState([{firstName:'', lastName: '', email: '', includeEmails: false, id: 1}])
    const [countryOpen, setCountryOpen] = useState(false)

    const [isError, setIsError] = useState(false)
    const [countryStreetOpen, setCountryStreetOpen] = useState(false)
    const [sameAddress, setSameAddress] = useState(false)

    const [submitPressed, setSumbitPressed] = useState(false)
    const [email, setEmail] = useInput(null)
    const [radio, setRadio] = useInput(null)

    const [companyName, setCompanyName] = useInput(null)
    //Primary Billing Contact
    const [firstName, setFirstName] = useInput(null)
    const [lastName, setLastName] = useInput(null)

    //Company Contact Details
    const [mobile, setMobile] = useInput(null)
    const [website, setWebsite] = useInput(null)

    //Postal Address
    const [attention, setAttention] = useInput(null)
    const [addressLine1, setAddressLine1] = useInput(null)
    const [addressLine2, setAddressLine2] = useInput(null)
    const [city, setCity] = useInput(null)
    const [state, setState] = useInput(null)
    const [portal, setPortal] = useInput(null)
    const [selectedCountryPostal, setSelectedCountryPostal] = useState(null)

    //Street Address
    const [attentionStreet, setAttentionStreet] = useInput(null)
    const [addressLineStreet1, setAddressLineStreet1] = useInput(null)
    const [addressLineStreet2, setAddressLineStreet2] = useInput(null)
    const [cityStreet, setCityStreet] = useInput(null)
    const [stateStreet, setStateStreet] = useInput(null)
    const [portalStreet, setPortalStreet] = useInput(null)
    const [selectedCountryStreet, setSelectedCountryStreet] = useState(null)

    //Company Financial Details
    const [VATNumber, setVATNumber] = useInput(null)
    const [registrationNumber, setRegistrationNumber] = useInput(null)

    const [sendSuccess, toggleIsSendSuccess] = useToggle(false);
    const [warningSend, toggleWarning] = useToggle(false);

    const [modal, setModal] = useState(false)
    const [idResponse, setIdResponse] = useState()
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    const [location, setLocation] = useState('')
    const [responseById, setResponseById] = useState()



    useEffect(() => {
        setLocation(window.location.href.split('/')[3])
        if(location !== ''){
            axios.get(`https://worker-typescript-template.nahryshko.workers.dev/api/form/${location}`).then((response) => {
                setResponseById(response.data)
            })
        }
    }, [location])

    useEffect(() => {
        console.log(responseById)
        if(responseById){

            //PrimaryBillingContact
            setFirstName(responseById.PrimaryBillingContact.FirstName ? responseById.PrimaryBillingContact.FirstName : '')
            setLastName(responseById.PrimaryBillingContact.LastName ? responseById.PrimaryBillingContact.LastName : '')
            setEmail(responseById.PrimaryBillingContact.Email ? responseById.PrimaryBillingContact.Email : '')

            setCompanyName(responseById.CompanyName ? responseById.CompanyName : '')

            //CompanyContactDetails
            setMobile(responseById.CompanyContactDetails.Mobile ? responseById.CompanyContactDetails.Mobile : '')
            setWebsite(responseById.CompanyContactDetails.Website ? responseById.CompanyContactDetails.Website : '')

            //PostalAddress
            setAttention(responseById.PostalAddress.Attention ? responseById.PostalAddress.Attention : '')
            setAddressLine1(responseById.PostalAddress.AddressLine1 ? responseById.PostalAddress.AddressLine1 : '')
            setAddressLine2(responseById.PostalAddress.AddressLine2 ? responseById.PostalAddress.AddressLine2 : '')
            setCity(responseById.PostalAddress.City ? responseById.PostalAddress.City : '')
            setState(responseById.PostalAddress.State ? responseById.PostalAddress.State : '')
            setPortal(responseById.PostalAddress.Portal ? responseById.PostalAddress.Portal : '')
            setSelectedCountryPostal(responseById.PostalAddress.Country ? responseById.PostalAddress.Country : '')

            //StreetAddress
            setAttentionStreet(responseById.StreetAddress.Attention ? responseById.StreetAddress.Attention : '')
            setAddressLineStreet1(responseById.StreetAddress.AddressLine1 ? responseById.StreetAddress.AddressLine1 : '')
            setAddressLineStreet2(responseById.StreetAddress.AddressLine2 ? responseById.StreetAddress.AddressLine2 : '')
            setCityStreet(responseById.StreetAddress.City ? responseById.StreetAddress.City : '')
            setStateStreet(responseById.StreetAddress.State ? responseById.StreetAddress.State : '')
            setPortalStreet(responseById.StreetAddress.Portal ? responseById.StreetAddress.Portal : '')
            setSelectedCountryStreet(responseById.StreetAddress.Country ? responseById.StreetAddress.Country : '')

            //CompanyFinancialDetails
            setVATNumber(responseById.CompanyFinancialDetails.VATNumber ? responseById.CompanyFinancialDetails.VATNumber : '')
            setRegistrationNumber(responseById.CompanyFinancialDetails.RegistrationNumber ? responseById.CompanyFinancialDetails.RegistrationNumber : '')
            setRadio(responseById.CompanyFinancialDetails.DebitOrder ? responseById.CompanyFinancialDetails.DebitOrder : '')

            //Count contact
            setCountContact(responseById.AdditionalContacts.countContact ? responseById.AdditionalContacts.countContact : countContact)
        }
    }, [responseById])

    const body = {
        form:{
            CompanyName: companyName,
            PrimaryBillingContact: {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
            },
            AdditionalContacts: {
                countContact,
            },
            CompanyContactDetails: {
                Mobile: mobile,
                Website: website,
            },
            PostalAddress: {
                Attention: attention,
                AddressLine1: addressLine1,
                AddressLine2: addressLine2,
                City: city,
                State: state,
                Portal: portal,
                Country: selectedCountryPostal,
            },
            StreetAddress: {
                SameAsPostalAddress: sameAddress,
                Attention: `${sameAddress ? attention : attentionStreet}`,
                AddressLine1: `${sameAddress ? addressLine1 : addressLineStreet1}`,
                AddressLine2: `${sameAddress ? addressLine2 : addressLineStreet2}`,
                City: `${sameAddress ? city : cityStreet}`,
                State: `${sameAddress ? state : stateStreet}`,
                Portal: `${sameAddress ? portal : portalStreet}`,
                Country: `${sameAddress ? selectedCountryPostal : selectedCountryStreet}`,
            },
            CompanyFinancialDetails:{
                VATNumber: VATNumber,
                RegistrationNumber: registrationNumber,
                DebitOrder: radio
            }
        }
    }



    const handleSubmit =  () => {
        setSumbitPressed(true)
        if(!email || !radio){
        setIsError(true)
        toggleWarning(true)
        }else{
            setIsLoadingSubmit(true)
           axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/form', body).then((response) => {
               setIsLoadingSubmit(false)
               toggleIsSendSuccess(true)
           })
           setIsError(false)
        }
    }



    const handleAddContact = (arr) => {
        if(arr.length === 0){
            setCountContact([{firstName:'', lastName: '', email: '', includeEmails: false, id: 1}])
        }else{
            setCountContact([...countContact, {firstName:'', lastName: '', email: '', includeEmails: false, id: countContact[countContact.length -1].id + 1}])

        }
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

    const toggleAddress = () => {
        setSameAddress(!sameAddress)
    }

    const handleDeleteContact = (id) => {
        setCountContact(countContact => countContact.filter(item => item.id !== id));
    }

    const handleChangeRadio = (e, value) => {
        setRadio(e.target.value)
    }

    const handleSaveProgress = () => {
        setIsLoadingSave(true)
        axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/form', body).then((response) => {
            setIdResponse(response.data.id)
            setIsLoadingSave(false)
            setModal(true)
        })
    }



    const modalRef = useOnClickOutside(() => {
        setModal(false);
    });



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
        <Input onChange={setCompanyName} value={companyName}/>
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
                <Input placeholder={'First'} value={firstName} onChange={setFirstName}/>
            </InputWrapper>
            <Space/>
            <InputWrapper>
                <Input placeholder={'Last'} value={lastName} onChange={setLastName}/>
            </InputWrapper>
        </ContactInputsWrapper>
                <EmailRequired email={!email && submitPressed}>
                    <SubtitleRequired>
                        Email
                    </SubtitleRequired>
                    <Input required={true} value={email} email={email} onChange={setEmail} background={!email ? 'rgba(255,203,218,-0.53)' : '#fff'} />

                </EmailRequired>
        {
            !email && submitPressed && (
                <WarningEmail>
                    <WarningText>
                        Email is required
                    </WarningText>
                </WarningEmail>
            )
        }
        <Title>
            Additional Contacts
        </Title>

        <TransitionGroup
            component={'div'}
        >
            {
                countContact.map((i , index) => (
                <CSSTransition
                    timeout={300}
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
        <Input onChange={setMobile} value={mobile}/>
        <Subtitle2>
            Website
        </Subtitle2>
        <Input onChange={setWebsite} value={website}/>
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
        <Input onChange={setAttention} value={attention}/>
        <Subtitle2>
            Address
        </Subtitle2>
        <Input placeholder={'Address Line 1'} onChange={setAddressLine1} value={addressLine1}/>
        <Input placeholder={'Address Line 2'} onChange={setAddressLine2} value={addressLine2}/>
        <ContactInputsWrapper>
            <InputWrapper>
                <Input placeholder={'City'} onChange={setCity} value={city}/>
            </InputWrapper>
                <Space/>
            <InputWrapper>
                <Input placeholder={'State / Province / Region'} onChange={setState} value={state}/>
            </InputWrapper>
            <Space/>
            <InputWrapper>
                <Input placeholder={'Portal / Zip Code'} onChange={setPortal} value={portal}/>
            </InputWrapper>
            <Space/>
            <InputWrapper ref={countryRef}>
                <SelectCountryPostal countryOpen={countryOpen} selectedCountryPostal={selectedCountryPostal} setCountryOpen={setCountryOpen} setSelectedCountryPostal={setSelectedCountryPostal}/>
            </InputWrapper>
        </ContactInputsWrapper>

        <Title>
            Street Address
        </Title>

        <div style={{display: 'flex', alignItems: 'center', width: '250px'}}  onClick={toggleAddress}>
            <input type="checkbox" id={'checkbox'} checked={sameAddress}   name="same"  style={{maxWidth: '100%', width: 'unset'}}/>
            <div style={{whiteSpace: 'nowrap', padding: '0px 10px', fontSize: '12px', fontFamily: 'Verdana, sans-serif'}} >Same as postal address</div>
        </div><br/>

        <TransitionGroup>
            <CSSTransition
                timeout={300}
                classNames="item"
            >

        <SameAddress sameAddress={sameAddress}>
        {
            sameAddress === false && (
                <>
                    <Subtitle>
                        Attention
                    </Subtitle>
                    <Input onChange={setAttentionStreet} value={attentionStreet}/>
                <Subtitle2>
                Address
            </Subtitle2>
            <Input placeholder={'Address Line 1'} onChange={setAddressLineStreet1} value={addressLineStreet1}/>
            <Input placeholder={'Address Line 2'} onChange={setAddressLineStreet2} value={addressLineStreet2}/>
            <ContactInputsWrapper>
            <InputWrapper>
            <Input placeholder={'City'} onChange={setCityStreet} value={cityStreet}/>
            </InputWrapper>
            <Space/>
            <InputWrapper>
            <Input placeholder={'State / Province / Region'} onChange={setStateStreet} value={stateStreet}/>
            </InputWrapper>
            <Space/>
            <InputWrapper>
            <Input placeholder={'Portal / Zip Code'} onChange={setPortalStreet} value={portalStreet}/>
            </InputWrapper>
            <Space/>
            <InputWrapper ref={countryStreetRef}>
            <SelectCountryStreet countryOpen={countryStreetOpen} selectedCountryStreet={selectedCountryStreet} setCountryOpen={setCountryStreetOpen} setSelectedCountryStreet={setSelectedCountryStreet}/>
            </InputWrapper>
            </ContactInputsWrapper>
                </>
            )
        }
        </SameAddress>
            </CSSTransition>
        </TransitionGroup>

        <Title>
            Company Financial Details
        </Title>
        <Subtitle>
            VAT Number
        </Subtitle>
        <Input onChange={setVATNumber} value={VATNumber}/>
        <div style={{paddingBottom: '20px'}}>
        <Subtitle2>
            Business Registration Number
        </Subtitle2>
        <Input onChange={setRegistrationNumber} value={registrationNumber}/>
        </div>

    <RequiredButtons  radio={Boolean(!radio && submitPressed)}>
    <SubtitleRequired>
            Would you be interested in paying by debit order?
        </SubtitleRequired>
        <RadioButtonsWrapp>
            <Label>
                <input style={{width: 'unset'}} type="radio" name="order" checked={radio === 'no'} value={radio} onChange={(e) => handleChangeRadio(e, 'No')}/>
                   <div style={{padding: '0 7px'}}>No</div>
            </Label>
                <br/>
            <Label>
                <input type="radio" style={{width: 'unset'}} name="order" checked={radio === 'yes'} value={radio}  onChange={(e) => handleChangeRadio(e, 'Yes')}/>
                <div style={{padding: '0 7px'}}>Yes</div>
            </Label><br/>
    </RadioButtonsWrapp>
    </RequiredButtons>
        {
            !radio && submitPressed &&  (
                <WarningEmail>
                    <WarningText>
                       This choose is required
                    </WarningText>
                </WarningEmail>
            )
        }

        <ButtonsWrapper>
            <ButtonSubmit onClick={handleSubmit} >
                {
                    isLoadingSubmit ? (
                        <CSSTransition
                            classNames="settings"
                            timeout={300}
                        >
                            <div className='settings-active' style={{height: '15px'}}>
                                <Settings/>
                            </div>
                        </CSSTransition>
                    ) : (
                        <Save>
                            Submit
                        </Save>
                    )
                }
            </ButtonSubmit>
            <ButtonSave onClick={handleSaveProgress} >
                {
                    isLoadingSave ? (
                        <CSSTransition
                            classNames="settings"
                            timeout={300}
                        >
                            <div className='settings-active' style={{height: '15px'}}>
                                <Settings/>
                            </div>
                        </CSSTransition>
                    ) : (
                        <Save>
                            Save
                        </Save>
                    )
                }
            </ButtonSave>
        </ButtonsWrapper>
        <MyToast
            isActive={sendSuccess}
            text={'Data was saved successfully'}
            style={{
                maxWidth: '520px',
                width: 'calc(100% - 32px)',
                position: 'fixed',
            }}
            bottom={86}
            padding={16}
            autoClose={2000}
            hide={toggleIsSendSuccess}
        />
        <MyToast
            isActive={warningSend}
            text={'Please fill required fields'}
            style={{
                maxWidth: '520px',
                width: 'calc(100% - 32px)',
                position: 'fixed',
            }}
            bottom={86}
            padding={16}
            error={isError}
            autoClose={2000}
            hide={toggleWarning}
        />
        {
            modal && ( <SaveModal modalRef={modalRef} value={`https://react-cloudflare-4yy.pages.dev/${idResponse}`}  setModal={setModal}/>)
        }
    </Wrapper>
  );
}

export default App;


const Wrapper = styled.div`
  margin-bottom: 30px;
  padding: 60px;
  background-color: #fff;
`
const EmailRequired = styled.div`
  padding: ${props => props.email ? '10px 10px 0 10px' : 'unset'  } ;
  background-color: ${props => props.email ? 'rgba(255,203,218,0.53)' :  'unset' };
`

const RequiredButtons = styled.div`
  padding: ${props => props.radio ?'10px 10px 10px 10px' :  'unset'} ;
  background-color: ${props => props.radio ? 'rgba(255,203,218,0.53)' :'unset' };

`

const SameAddress = styled.div`
`

const WarningEmail = styled.div`
  padding: 10px;
  background-color: hsl(2, 70%, 47%);
  font-size: 10px;
  font-family: 'Verdana',sans-serif;
`

const Save = styled.div`
  font-family: 'Verdana',sans-serif;
  font-size: 12px;
`

const WarningText = styled.div`
color: white;
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
  font-family: 'Verdana', sans-serif;
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
  font-family: 'Verdana', sans-serif;
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
  font-family: 'Verdana', sans-serif;
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
  font-family: 'Verdana', sans-serif;
  color: #54565A;
  font-weight: bold;
  padding-bottom: 14px;
  padding-top: 20px;
`

const Title2 = styled.div`
  font-size: 16px;
  font-family: 'Verdana', sans-serif;
  color: #54565A;
  font-weight: bold;
  padding-bottom: 14px;
  padding-top: 6px;`

const Subtitle = styled.div`
  font-size: 12px;
  font-family: 'Verdana', sans-serif;
`

const SubtitleRequired = styled.div`
  font-size: 12px;
  font-family: 'Verdana', sans-serif;
  &::after {
    content: '*';
    color: darkred;
    padding: 2px;
  }
`

export const ContactInputsWrapper = styled.div`
display: flex;
  justify-content: space-between;
  padding-bottom: 35px;
`

export const InputWrapper = styled.div`
  width: 100%;
`
