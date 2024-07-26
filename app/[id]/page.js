'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const Detail = () => {
    const [countrie, setCountrie] = useState({});
    const params = useParams();
    const id = params.id
    const names = []
    const allCurrencies = []
    const allLanguages = []
    
      useEffect(() => {
        const fetchData = async () => {
           await fetch('https://restcountries.com/v3.1/alpha/' + id)
           .then(response => response.json())
           .then(data => setCountrie(data[0]))
       }
        fetchData()
   }, [id])
   
    const nativeNames = countrie.name?.nativeName
    for (const key in nativeNames) {
        names.push(nativeNames[key].common)
    }

    const currencies = countrie.currencies
    for (const key in currencies) {
        allCurrencies.push(currencies[key].name)
    }

    const languages = countrie.languages
    for (const key in languages) {
        allLanguages.push(languages[key])
    }

    console.log(allLanguages)
    console.log(countrie.borders)
    
    return (
        <div>
          <div> 
            <div>{countrie.flag}</div>
          </div>
          <div>
            <div>{countrie.name?.common}</div>
            { names.map(name => <div>{name}</div>)}
            <div>{countrie.population}</div>
            <div>{countrie.region}</div>
            <div>{countrie.subregion}</div>
            <div>{countrie.capital}</div> 
            <div>{countrie.tld}</div>
            { allCurrencies.map(currency => <div>{currency}</div>)}
            { allLanguages.map(language => <div>{language}</div>)}
            { countrie.borders?.map(border => <a href={`/${border}`}><div>{border}</div></a>)}
          </div>
        </div>
    );
};

export default Detail;
