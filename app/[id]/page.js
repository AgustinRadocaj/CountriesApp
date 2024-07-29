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
        <div className="grid grid-cols-2 gap-4">
          <div className='flex flex-col p-16'> 
            <button className='border-2 border-red-500 h-7 w-7'>Home</button>
            <div className='border-2 border-red-500 h-80 w-96 mt-10'>{countrie.flag}</div>
          </div>
          <div className='grid grid-rows-3 justify-center align-middle w-full border-2 border-red-500 '>
            <div className='border-2 border-red-500'>
              <div className='border-2 border-red-500'>{countrie.name?.common}</div>
            </div>
            <div className='grid grid-cols-2 gap-12'>
              <div> 
                { names.map(name => <div>{name}</div>)}
                <div>{countrie.population}</div>
                <div>{countrie.region}</div>
                <div>{countrie.subregion}</div>
              </div>
              <div>
                <div>{countrie.capital}</div> 
                <div>{countrie.tld}</div>
                { allCurrencies.map(currency => <div>{currency}</div>)}
                { allLanguages.map(language => <div>{language}</div>)}
              </div>
            </div>
            <div className='border-2 border-red-500 w-11/12'>
            Border countries:{ countrie.borders?.map(border => <a href={`/${border}`}><div>{border}</div></a>)}
            </div>
          </div>
        </div>
    );
};

export default Detail;
