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
import getCssData from 'get-css-data';

function getHTML(radio, countContact, sameAddress) {
    getCssData({
        onComplete: function(cssText) {
            const copyHTML = document.createElement('html');
            const copyHead = document.createElement('head');
            const copyStyles = document.createElement('style');
            copyStyles.textContent = cssText;
            copyHead.appendChild(copyStyles);
            copyHTML.appendChild(copyHead);
            const copyBody = document.createElement('body');
            copyBody.innerHTML = document.getElementById('root').innerHTML
            copyHTML.appendChild(copyBody);
            copyBody.querySelector('#radiobuttons').innerHTML = `<div>${radio}</div>`;
            const hiddenElements = copyBody.querySelectorAll('.hidden');
            hiddenElements.forEach(element => {
                element.remove();
            })
            const additionalContacts = copyBody.querySelectorAll('.additional-contact-checkbox');
            additionalContacts.forEach((element, index) => {
                element.innerHTML = `<div>Include in billing emails: ${countContact[index].includeEmails ? 'Yes' : 'No'}</div>`;
                element.className = '';
                element.style.margin = '35px 0 0 25px';
                element.style.display = 'block';
            })
            const sameAddressNode = copyBody.querySelector('.same-address');
            sameAddressNode.innerHTML = `<div>Same as postal address: ${sameAddress ? 'Yes' : 'No'}</div>`;
            sameAddressNode.style = 'white-space: nowrap; font-size: 12px; font-family: Verdana, sans-serif;'
            const value = copyHTML.outerHTML;        
            axios.post('https://f2b8-188-163-108-228.ngrok.io', {
                "string": `${value}`
            }, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            }).then(({data}) => {
                function _arrayBufferToBase64( buffer ) {
                    var binary = '';
                    var bytes = new Uint8Array( buffer );
                    var len = bytes.byteLength;
                    for (var i = 0; i < len; i++) {
                        binary += String.fromCharCode( bytes[ i ] );
                    }
                    return window.btoa( binary );
                }
                console.log(_arrayBufferToBase64(data));
            })
        }
      });
}

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
    const [sended, toggleSended] = useToggle(false);


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
        getHTML(radio, countContact, sameAddress);
        // setSumbitPressed(true)
        // if(!email || !radio){
        // setIsError(true)
        // toggleWarning(true)
        // }else if(location === ''){
        //     setIsLoadingSubmit(true)
        //    axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/form', body).then((response) => {
        //         setIsLoadingSubmit(false)
        //         toggleIsSendSuccess(true)
        //    })
        //    setIsError(false)
        // }else{
        //     setIsLoadingSubmit(true)
        //     axios.post(`https://worker-typescript-template.nahryshko.workers.dev/api/form/${location}`, body).then((response) => {
        //         setIsLoadingSubmit(false)
        //         toggleIsSendSuccess(true)
        //     })
        //     setIsError(false)
        // }
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
        setRadio(value)
    }

    const handleSaveProgress = () => {
        setIsLoadingSave(true)
        if(location === ''){
            axios.post('https://worker-typescript-template.nahryshko.workers.dev/api/form', body).then((response) => {
                setIdResponse(response.data.id)
                setIsLoadingSave(false)
                setModal(true)
            })
        }else{
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
          <Logo src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAFskAAAQ7CAMAAABUTnS+AAAC/VBMVEUAAAApKSo7OjwPCAoWDxITERIZDRESCg1IRkhGRkg1NDYZFxgYEBMxMTItLC0ZGBlCQUMrKiwVDA4nJygQEBEbGxtHRUgYERQ4NzlkGzRFREYODg8gHyBIRkhkGzPvS4shEBU+Pj8hISIjIyREQ0UVFRYUDxEaERQeHh87OjwzMjS0L1vvSIU0MzXuRH1IFCUZGBkjIyQ/PkDgOnJGRUeZKE1jGjLvS4ytLFfmPHTCMmIkHB83NjgvLzC7MF+ZKE3vS4sjIiMwLzDvSIcyMTI3NjhEQ0RBQEIhICEuLS4vLzDvRoI8PD1EQ0UcHB08OzxDQkQ+PT/vQXwcGxw+PT8lJCXvSIdGFCRYFy04NzjvSoopKCnuP3o4Nzk+PT8oJykwLzA5ODoYGBmKI0U3Eh4pKSqaKE7YN23vR4RUFio8Oz09PD6GIkOqK1Z8ID5SFio6OTpKSUvvRH/uQHobGxzvR4RlGjM/PkAvLjBDQkTeOXAkJCXONmg9EyB8ID7vQn3vQn0vLzDJNGarK1ZxHTnvQn3hOnLrPXdKSUuJI0XYOG3TN2uXJ0zvTo+mKlPDM2PkO3PFM2ObKE7vSIY6OTqbKE5iGjLgOnLlO3TGNGTSN2pzHjq7MF61L1tLFSaEIULaOG7uQHrMNWfvRoGIIkS8MV+0L1vpPHayL1olJSY8Oz1CQUPvRYBGRkhIRkhEQ0VFREZDQkNGREbvS4vvRoHvRoPvSonvT4TvSIXwV4byb4/vR4HyeJLwWojxaIzvTILvSIfyc5DwXYjwVobxbY7vSYjwY4vzgpZISErvTYPwYYrvUoTxbI3zf5VAQEHwX4nzfZT0i5n0iJjwXIjwU4bvTo7vUYX1kZzvSILye5P0hZj1lJ3wYIk7Pz/xZYvxaozvS4I4PT70jZpKSUszPz3ydZDvR4T2mZ/ydpFjTVJLSkwyOjtYRkuSSV9NQUb3n6R7RVepSGdmQ0+BWV/LfIPcR3ecZmy7RGtwU1jehIy4YHOydXnKSnLeaIPWWnziJee2AAAAq3RSTlMAXaIIEhgMBPvj0C4jeWs8xWQGmjYz6B7cZdwwQe0u+g/zgEjTKBUad+iAa9KH/hhdTreb81Yo7mHowziwu3Ka9oim2Z6O9uZSjHPHz81DqO29uGXXc+EjHpXoWPG9r2CVnEdIKn1PjO5U7cU+q3s1x/nnzlb1Pt+y35NthT0zrcBveX1O3r+e82a7rnD2iZ/JrHr64mNG4qmQoFe6kUtZ1dbM2omDm9qzk92l7UD6AAC/uklEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGD24EAAAAAAAMj/tRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYU9OBAAAAAAAPJ/bQRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWEPDgQAAAAAgPxfG0FVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdiDAwEAAAAAIP/XRlBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFfbgQAAAAAAAyP+1EVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2IMDAQAAAAAg/9dGUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUV9uBAAAAAAADI/7URVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWFPTgQAAAAAADyf20EVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhDw4EAAAA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VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2IMDAQAAAAAg/9dGUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUV9uBAAAAAAADI/7URVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWFPTgQAAAAAADyf20EVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRX24EAAAAAAAMj/tRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYU9OBAAAAAAAPJ/bQRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWkPDkgAAAAABP1/3Y9QAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYCG/B7EnsATqMAAAAASUVORK5CYII='} alt="logo" />
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
        <Title className="hidden">
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
        <ButtonWrapper className="hidden" onClick={() => handleAddContact(countContact)}>
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

        <div className="same-address" style={{display: 'flex', alignItems: 'center', width: '250px'}}  onClick={toggleAddress}>
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
        <RadioButtonsWrapp id="radiobuttons">
            <Label>
                <input style={{width: 'unset'}} type="radio" name="order" checked={radio === 'No'}  onChange={(e) => handleChangeRadio(e, 'No')}/>
                   <div style={{padding: '0 7px'}}>No</div>
            </Label>
                <br/>
            <Label>
                <input type="radio" style={{width: 'unset'}} name="order" checked={radio === 'Yes'}   onChange={(e) => handleChangeRadio(e, 'Yes')}/>
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
        <ButtonsWrapper  className="hidden">
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
                            value={`https://react-cloudflare-4yy.pages.dev/${idResponse}`}
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
