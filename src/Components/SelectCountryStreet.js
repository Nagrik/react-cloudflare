import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import countryList from "react-select-country-list";
import ArrowUpIcon from "../assets/Icons/ArrowUpIcon";
import ArrowDownIcon from "../assets/Icons/ArrowDownIcon";
import useOnClickOutside from "../utils/useOnClickOutside";
import search from "../utils/search";

const SelectCountryStreet = ({countryOpen, setCountryOpen}) => {
    const [country, setCountry] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(false)
    const [inputActive, setInputActive] = useState(false)

    const searchItems = search(countryList().data, inputValue, ({ label }) => label);

    const handleOpenCountry = () => {
        setCountryOpen(!countryOpen)
    }

    const inputRef = useOnClickOutside(() => {
        setInputActive(false)
    });





    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
    }, [])

    const regex = /^[A-Za-z]+$/;
    const handleKeyDown = (event) => {
    }
    const handleCountryChange = (country) => {
        setCountry(country.label)
        setCountryOpen(false)
        setInputValue('')
    }

    const handleOpenPopup = () => {
        if(!inputValue){
            setCountryOpen(true)
        }
        setInputActive(true)
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
        if( regex.test(event.key) && countryOpen ) {
            setCountryOpen(false)
        }
        setCountry(null)
    }

    const abc = countryList().data.filter((item) => {
        if(item.label === country){
            // return console.log(country)
        }else{
            return null
        }
    })

    useEffect(() => {
        if(country){
            setSelectedCountry(true)
        }else{
            setSelectedCountry(false)
        }
    }, [country])

    return (
        <InputWrapper
        >
            <div ref={inputRef} style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <div onClick={handleOpenPopup} style={{width: '100%'}}>
                    <SelectElement
                        placeholder={country ? country : 'Cоuntry'}
                        onChange={(e) => handleInputChange(e)}
                        value={inputValue}
                        type={'text'}
                        selectedCountry={selectedCountry}
                    />
                </div>
                {
                    countryOpen ?(
                        <ArrowUpWrapper onClick={handleOpenCountry}>
                            <ArrowUpIcon/>
                        </ArrowUpWrapper>
                    ) : (
                        <ArrowUpWrapper onClick={handleOpenCountry}>
                            <ArrowDownIcon/>
                        </ArrowUpWrapper>
                    )
                }
            </div>
            {
                countryOpen && (
                    <CountryListWrapper>
                        {
                            countryList().data.map((country, index) => (
                                <CountryList key={index} onClick={() => handleCountryChange(country)}>
                                    {country.label}
                                </CountryList>
                            ))
                        }
                        <CountryList>
                        </CountryList>
                    </CountryListWrapper>
                )
            }
            {
                inputValue && !country && (
                    <SearchWrapper>
                        {
                            searchItems.map((country) => (
                                <SearchWrapperItem onClick={() => handleCountryChange(country)}>
                                    {country.label}
                                </SearchWrapperItem>
                            ))
                        }
                        {
                            searchItems.length === 0 && (
                                <SearchWrapperItemNone >
                                    No matching options
                                </SearchWrapperItemNone>
                            )
                        }

                    </SearchWrapper>
                )
            }

        </InputWrapper>
    );
};

export default SelectCountryStreet;


const InputWrapper = styled.div`
  width: 100%;
  padding: 6px 0;
  display: flex;
  align-items: center;
  position: relative;
`

const SearchWrapper = styled.div`
  background-color: #fff;
  max-height: 300px;
  width: 228px;
  border: 2px solid #cccc;
  position: absolute;
  top: 40px;
  z-index: 1;
  left: 0px;
  overflow-y: scroll;
`

const Country = styled.div`
  font-size: 12px;
  position: absolute;
  left: 10px;
`


const CountryListWrapper = styled.div`
  background-color: #fff;
  height: 350px;
  width: 340px;
  border: 2px solid #cccc;
  position: absolute;
  top: 40px;
  z-index: 1;
  left: -20px;
  overflow-y: scroll;
`

const CountryList = styled.div`
  height: 34px;
  display: flex;
  align-items: center;
  padding: 3px 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #F5F2F2FF;
  }
`

const SearchWrapperItem = styled.div`
  height: 39px;
  display: flex;
  align-items: center;
  padding: 3px 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: #F5F2F2FF;
  }
`

const SearchWrapperItemNone = styled.div`
  height: 39px;
  display: flex;
  align-items: center;
  padding: 3px 5px;
  font-size: 12px;
  cursor: pointer;
  justify-content: center;
  &:hover {
    background-color: #F5F2F2FF;
  }
`

const ArrowUpWrapper = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
`

const SelectElement = styled.input`
  border: none;
  border-bottom: 2px dashed #cccccc;
  width: 100%;
  padding: 8px 10px;
  outline: none;
  background-color: ${props => props.countContact && props.index === props.countContact[0]  ? "#F5F2F2FF ": "#fff"};

  &::placeholder {
    color: ${props => props.selectedCountry ? props.selectedCountry : '#c4c4c4'};
  }

  &:focus {
    border-bottom: 2px dashed hsl(207, 85%, 60%);
    background-color:${props =>props.countContact &&  props.index === props.countContact[0] ? "#e9e7e7" :  '#F5F2F2FF' };
  }
`