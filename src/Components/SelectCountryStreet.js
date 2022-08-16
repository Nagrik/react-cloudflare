import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import countryList from "react-select-country-list";
import ArrowUpIcon from "../assets/Icons/ArrowUpIcon";
import ArrowDownIcon from "../assets/Icons/ArrowDownIcon";
import search from "../utils/search";
import {Input} from "../utils/Input";

const SelectCountryStreet = ({countryOpen, setCountryOpen,selectedCountryStreet, setSelectedCountryStreet}) => {
    const [country, setCountry] = useState(null)
    const [searchOpen, setSearchOpen] = useState(false)

    const searchItems = search(countryList().data, country, ({ label }) => label);

    const handleOpenCountry = () => {
        setCountryOpen(!countryOpen)
    }



    const handleCountryChange = (country) => {
        setCountryOpen(false)
        setSelectedCountryStreet(country.label)
        setSearchOpen(false)
    }
    const handleOpenPopup = () => {
        setSelectedCountryStreet(null)
        setCountry('')
        setCountryOpen(true)
    }

useEffect(() => {
    if(country){
        setCountryOpen(false)
        setSearchOpen(true)
    }
}, [country])



    return (
        <InputWrapper
        >
            <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <div onClick={handleOpenPopup} style={{width: '100%'}}>
                    <Input
                        placeholder={selectedCountryStreet ? selectedCountryStreet : 'Cоuntry'}
                        onChange={(e) => setCountry(e.target.value)}
                        type={'text'}
                        value={selectedCountryStreet ? selectedCountryStreet : country}
                        selectedCountry={selectedCountryStreet}
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
                searchOpen && (
                    <SearchWrapper>
                        {
                            searchItems.map((country, i) => (
                                <SearchWrapperItem onClick={() => handleCountryChange(country)} key={i}>
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
  font-family: 'Verdana', sans-serif;
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
  font-family: 'Verdana', sans-serif;
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
  font-family: 'Verdana', sans-serif;
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
