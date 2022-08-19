import styled from "styled-components";
import {Input} from "./utils/Input";
import AdditionalContact from "./Components/AdditionalContact";
import {useEffect, useState} from "react";
import './Components/checkbox.css'
import Button from "./utils/Button";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import useOnClickOutside from "./utils/useOnClickOutside";
import SelectCountryPostal from "./Components/SelectCountryPostal";
import SelectCountryStreet from "./Components/SelectCountryStreet";
import Logo from './Components/Logo'
import useInput from "./utils/useInput";
import Settings from "./assets/Icons/Settings";
import axios from "axios";
import MyToast from "./Components/Toast";
import useToggle from "./utils/useToggle";
import SaveModal from "./Components/SaveModal";

function App() {
    function getHTML(userId, radioState) {
        const allCSS = [...document.styleSheets]
  .map((styleSheet) => {
    try {
      return [...styleSheet.cssRules]
        .map((rule) => rule.cssText)
        .join('');
    } catch (e) {
      console.log('Access to stylesheet %s is denied. Ignoring…', styleSheet.href);
    }
  })
  .filter(Boolean)
  .join('\n');
  const copyHTML = document.createElement('html');
          const copyHead = document.createElement('head');
          const copyStyles = document.createElement('style');
          copyStyles.textContent = allCSS;
          copyHead.appendChild(copyStyles);
          copyHTML.appendChild(copyHead);
          const copyBody = document.createElement('body');
          copyBody.innerHTML = document.getElementById('root').innerHTML
          copyHTML.appendChild(copyBody);
          copyBody.querySelector('.radiobuttons').innerHTML = `<div>${radioState}</div>`;
          const hiddenElements = copyBody.querySelectorAll('.hidden');
          hiddenElements.forEach(element => {
              element.remove();
          })
          const additionalContacts = copyBody.querySelectorAll('.additional-contact-checkbox');
          additionalContacts.forEach((element, index) => {
              element.innerHTML = `<div>Include in billing emails: ${countContact[index].IncludeInEmails ? 'Yes' : 'No'}</div>`;
              element.className = '';
              element.style.margin = '35px 0 0 25px';
              element.style.display = 'block';
          })
          const sameAddressNode = copyBody.querySelector('.same-address');
          sameAddressNode.innerHTML = `<div>Same as postal address: ${sameAddress ? 'Yes' : 'No'}</div>`;
          sameAddressNode.style = 'white-space: nowrap; font-size: 12px; padding-left:0; font-family: Verdana, sans-serif;'
          const value = copyHTML.outerHTML;
          const formData = new FormData();
                formData.append('html', value);
                formData.append('ContactId',  userId);
                axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/createPdf', formData
                    , {
                        responseType: 'arraybuffer',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'application/pdf'
                        }
                    })
    }

    const [countContact, setCountContact] = useState([{
        FirstName: '',
        LastName: '',
        EmailAddress: '',
        IncludeInEmails: false,
        id: 1
    }])
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
    const [attention, setAttention] = useInput('')
    const [addressLine1, setAddressLine1] = useInput('')
    const [addressLine2, setAddressLine2] = useInput('')
    const [city, setCity] = useInput('')
    const [state, setState] = useInput('')
    const [portal, setPortal] = useInput('')
    const [selectedCountryPostal, setSelectedCountryPostal] = useState('')

    //Street Address
    const [attentionStreet, setAttentionStreet] = useInput('')
    const [addressLineStreet1, setAddressLineStreet1] = useInput('')
    const [addressLineStreet2, setAddressLineStreet2] = useInput('')
    const [cityStreet, setCityStreet] = useInput('')
    const [stateStreet, setStateStreet] = useInput('')
    const [portalStreet, setPortalStreet] = useInput('')
    const [selectedCountryStreet, setSelectedCountryStreet] = useState('')

    //Company Financial Details
    const [VATNumber, setVATNumber] = useInput(null)
    const [registrationNumber, setRegistrationNumber] = useInput(null)

    const [sendSuccess, toggleIsSendSuccess] = useToggle(false);
    const [warningSend, toggleWarning] = useToggle(false);
    const [sended, toggleSended] = useToggle(false);


    const [modal, setModal] = useState(false)
    const [idResponse, setIdResponse] = useState()
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    const [location, setLocation] = useState('')
    const [responseById, setResponseById] = useState()

    useEffect(() => {
        setLocation(window.location.href.split('/')[3])
        if (location !== '') {
            axios.get(`https://worker-typescript-template.nahryshko.workers.dev/api/form/${location}`).then((response) => {
                setResponseById(response.data)
            })
        }
    }, [location])

    useEffect(() => {
        if (responseById) {

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
            setSameAddress(responseById.StreetAddress.SameAsPostalAddress ? responseById.StreetAddress.SameAsPostalAddress : false)
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
        form: {
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
            CompanyFinancialDetails: {
                VATNumber: VATNumber,
                RegistrationNumber: registrationNumber,
                DebitOrder: radio
            }
        }
    }

    const bodyXero = {
        "Contacts": [
            {
                "Name": companyName,
                "Phones": [
                    {
                        "PhoneType": "MOBILE",
                        "PhoneNumber": mobile,
                    }
                ],
                "FirstName": firstName,
                "LastName": lastName,
                "EmailAddress": email,
                "ContactPersons": countContact,
                "Addresses": [
                    {
                        "AddressLine 1": addressLine1,
                        "AddressLine 2": addressLine2,
                        "AddressType": "POBOX",
                        "City": city,
                        "Region": state,
                        "PostalCode": portal,
                        'AttentionTo': attention,
                        'Country': selectedCountryPostal
                    },
                    {
                        "AddressType": "STREET",
                        'AttentionTo': `${sameAddress ? attention : attentionStreet}`,
                        'AddressLine 1': `${sameAddress ? addressLine1 : addressLineStreet1}`,
                        'AddressLine 2': `${sameAddress ? addressLine2 : addressLineStreet2}`,
                        'City': `${sameAddress ? city : cityStreet}`,
                        'Region': `${sameAddress ? state : stateStreet}`,
                        'PostalCode': `${sameAddress ? portal : portalStreet}`,
                        'Country': `${sameAddress ? selectedCountryPostal : selectedCountryStreet}`,
                    }
                ],
                'TaxNumber': VATNumber,
                "CompanyNumber": registrationNumber,
            }
        ]
    }

    useEffect(() => {
        axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/refresh').catch(err => {
            console.log(err);
        })
    }, [])


    const handleSubmit = async () => {
        const token = window.localStorage.getItem('access_token')


        const bodyContact = {
            bodyXero, token
        }
        setSumbitPressed(true)
        if (!email || !radio) {
            setIsError(true)
            toggleWarning(true)
        } else if (location === '') {
            setIsLoadingSubmit(true)
            axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/form', body).then((response) => {
                setIsLoadingSubmit(false)
                toggleIsSendSuccess(true)
            })
            await axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/contact', bodyContact, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Accept": "application/json"
                }
            }).then(res => {
                getHTML(res.data.Contacts[0].ContactID, radio);

            })
            setIsError(false)
        } else {
            setIsLoadingSubmit(true)
            axios.post(`https://worker-typescript-template.nahryshko.workers.dev/api/form/${location}`, body).then((response) => {
                setIsLoadingSubmit(false)
                toggleIsSendSuccess(true)
            })
            await axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/contact', bodyContact, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Accept": "application/json"
                }
            }).then(res => {
                getHTML(res.data.Contacts[0].ContactID, radio);

            })
            setIsError(false)
        }
    }


    const handleAddContact = (arr) => {
        if (arr.length === 0) {
            setCountContact([{FirstName: '', LastName: '', EmailAddress: '', IncludeInEmails: false, id: 1}])
        } else {
            setCountContact([...countContact, {
                FirstName: '',
                LastName: '',
                EmailAddress: '',
                IncludeInEmails: false,
                id: countContact[countContact.length - 1].id + 1
            }])

        }
    }


    const countryRef = useOnClickOutside(() => {
        if (countryOpen) {
            setCountryOpen(false);
        }
    });

    const countryStreetRef = useOnClickOutside(() => {
        if (countryStreetOpen) {
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
        setRadio(value)
    }

    const handleSaveProgress = () => {
        setIsLoadingSave(true)
        if (location === '') {
            axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/form', body).then((response) => {
                setIdResponse(response.data.id)
                setIsLoadingSave(false)
                setModal(true)
            })
        } else {
            axios.post(`https://worker-typescript-template.nahryshko.workers.dev/api/form/${location}`, body).then((response) => {
                setIdResponse(response.data.id)
                setIsLoadingSave(false)
                setModal(true)
            })
        }
    }


    const modalRef = useOnClickOutside(() => {
        setModal(false);
    });

    return (

        <Wrapper>
            <LogoWrapper>
                <Logo/>
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
                <Input required={true} value={email} email={email} onChange={setEmail}
                       background={!email ? 'rgba(255,203,218,-0.53)' : '#fff'}/>

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
                    countContact.map((i, index) => (
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
            <ButtonWrapper className="hidden" onClick={() => handleAddContact(countContact)}>
                <Button/>
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
                    <SelectCountryPostal countryOpen={countryOpen} selectedCountryPostal={selectedCountryPostal}
                                         setCountryOpen={setCountryOpen}
                                         setSelectedCountryPostal={setSelectedCountryPostal}/>
                </InputWrapper>
            </ContactInputsWrapper>

            <Title>
                Street Address
            </Title>


            <label className="container same-address"
                   style={{fontFamily: 'Verdana, sans-serif', fontSize: '12px', paddingLeft: '25px'}}
                   onClick={() => {
                       setTimeout(() => {
                           toggleAddress()
                       }, 0.1);
                   }}>

                <span>Same as postal address</span>
                <input type="checkbox" checked={sameAddress}/>
                <span className="checkmark" style={{left: '0px'}}></span>
            </label>


            <br/>

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
                                    <Input placeholder={'Address Line 1'} onChange={setAddressLineStreet1}
                                           value={addressLineStreet1}/>
                                    <Input placeholder={'Address Line 2'} onChange={setAddressLineStreet2}
                                           value={addressLineStreet2}/>
                                    <ContactInputsWrapper>
                                        <InputWrapper>
                                            <Input placeholder={'City'} onChange={setCityStreet} value={cityStreet}/>
                                        </InputWrapper>
                                        <Space/>
                                        <InputWrapper>
                                            <Input placeholder={'State / Province / Region'} onChange={setStateStreet}
                                                   value={stateStreet}/>
                                        </InputWrapper>
                                        <Space/>
                                        <InputWrapper>
                                            <Input placeholder={'Portal / Zip Code'} onChange={setPortalStreet}
                                                   value={portalStreet}/>
                                        </InputWrapper>
                                        <Space/>
                                        <InputWrapper ref={countryStreetRef}>
                                            <SelectCountryStreet countryOpen={countryStreetOpen}
                                                                 selectedCountryStreet={selectedCountryStreet}
                                                                 setCountryOpen={setCountryStreetOpen}
                                                                 setSelectedCountryStreet={setSelectedCountryStreet}/>
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

            <RequiredButtons radio={Boolean(!radio && submitPressed)}>
                <SubtitleRequired>
                    Would you be interested in paying by debit order?
                </SubtitleRequired>
                <RadioButtonsWrapp className="radiobuttons">
                    <Label>
                        <input style={{width: 'unset'}} type="radio" name="order" checked={radio === 'No'}
                               onChange={(e) => handleChangeRadio(e, 'No')}/>
                        <div style={{padding: '0 7px'}}>No</div>
                    </Label>
                    <br/>
                    <Label>
                        <input type="radio" style={{width: 'unset'}} name="order" checked={radio === 'Yes'}
                               onChange={(e) => handleChangeRadio(e, 'Yes')}/>
                        <div style={{padding: '0 7px'}}>Yes</div>
                    </Label><br/>
                </RadioButtonsWrapp>
            </RequiredButtons>
            {
                !radio && submitPressed && (
                    <WarningEmail>
                        <WarningText>
                            This choose is required
                        </WarningText>
                    </WarningEmail>
                )
            }

            <ButtonsWrapper className="hidden">
                <ButtonSubmit onClick={handleSubmit}>
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
                <ButtonSave onClick={handleSaveProgress}>
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

            <MyToast
                isActive={sended}
                text={'The form was successfully sent!'}
                style={{
                    maxWidth: '520px',
                    width: 'calc(100% - 32px)',
                    position: 'fixed',
                }}
                bottom={86}
                padding={16}
                autoClose={2000}
                hide={toggleSended}
            />
            {
                modal && (
                    <GlobalWrapper>
                        <WrapperModal ref={modalRef}>
                            <SaveModal
                                location={location}
                                id={idResponse}
                                value={`https://react-cloudflare-4yy.pages.dev/${idResponse || location}`}
                                setModal={setModal}
                                sended={sended}
                                toggleSended={toggleSended}
                            />
                        </WrapperModal>
                    </GlobalWrapper>
                )
            }

        </Wrapper>

    );
}

export default App;


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

const WrapperModal = styled.div`
  max-width: 467px;
  height: 267px;
  background-color: white;
  position: relative;
  padding: 0px 37px 37px 37px;
`

const Wrapper = styled.div`
  margin-bottom: 30px;
  padding: 60px;
  background-color: #fff;
`
const EmailRequired = styled.div`
  padding: ${props => props.email ? '10px 10px 0 10px' : 'unset'};
  background-color: ${props => props.email ? 'rgba(255,203,218,0.53)' : 'unset'};
`

const RequiredButtons = styled.div`
  padding: ${props => props.radio ? '10px 10px 10px 10px' : 'unset'};
  background-color: ${props => props.radio ? 'rgba(255,203,218,0.53)' : 'unset'};

`

const SameAddress = styled.div`
`

const WarningEmail = styled.div`
  padding: 10px;
  background-color: hsl(2, 70%, 47%);
  font-size: 10px;
  font-family: 'Verdana', sans-serif;
`

const Save = styled.div`
  font-family: 'Verdana', sans-serif;
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

const WelcomeWrapper = styled.div`
  padding: 15px 0;
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
