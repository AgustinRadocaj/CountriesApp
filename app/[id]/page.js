'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from "next/link";
import Navbar from '../components/navbar/Navbar';

const Detail = () => {
    const [countrie, setCountrie] = useState({});
    const [borderCountries, setBorderCountries] = useState([]);
    const params = useParams();
    const id = params.id
    const names = []
    const allCurrencies = []
    const allLanguages = []
    
    useEffect(() => {
      const fetchData = async () => {
          await fetch('https://restcountries.com/v3.1/alpha/' + id)
              .then(response => response.json())
              .then(data => {
                  setCountrie(data[0]);
                  return data[0].borders;
              })
              .then(borders => {
                  if (borders) {
                      return Promise.all(borders.map(borderId =>
                          fetch('https://restcountries.com/v3.1/alpha/' + borderId)
                              .then(response => response.json())
                      ));
                  } else {
                      return [];
                  }
              })
              .then(borderData => {
                  setBorderCountries(borderData.map(country => ({
                      name: country[0].name.common,
                      code: country[0].cca3
                  })));
              });
      }
      fetchData();
  }, [id]);
   
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

    
    return (
      <>
      <Navbar></Navbar>
        <div className="grid grid-cols-2 gap-4 ">
          <div className='flex flex-col p-16'> 
            <Link href={'/'}><button className='hover:bg-slate-200 rounded-3xl h-10 w-16 text-lg'>Back</button></Link>
            <div className='h-80 w-11/12 mt-10'>
            <img src={countrie.flags?.svg} alt="flag" className="rounded-md content-baseline h-80 w-11/12 object-cover"></img>
            </div>
          </div>
          <div className='grid grid-rows-3 justify-center align-middle w-full '>
            <div className='flex justify-center items-center'>
              <div className='text-4xl'>{countrie.name?.common}</div>
            </div>
            <div className='grid grid-cols-2 gap-20 leading-10'>
              <div> 
                <div><b>Native names: </b>{ names.join(", ")}</div>
                <div><b>Population: </b>{countrie.population}</div>
                <div><b>Region: </b>{countrie.region}</div>
                <div><b>Subregion: </b>{countrie.subregion}</div>
              </div>
              <div>
                <div><b>Capital: </b>{countrie.capital}</div> 
                <div><b>Top Level Domain: </b>{countrie.tld}</div>
                <div><b>Currencies: </b>{allCurrencies.join(", ")}</div>
                <div><b>Languages: </b>{allLanguages.join(", ")}</div>
              </div>
            </div>
            <div className='w-11/12 flex flex-row gap-2 h-10 mt-8'>
            <b>Border countries: </b>{borderCountries.map(country => {
              return <Link key={country.code} href={`/${country.code}`}><div>{country.name}</div></Link>
            })}
            </div>
          </div>
        </div>
        </>
    );
};

export default Detail;
