'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../components/navbar/Navbar';
import { useRouter } from 'next/navigation';

const Detail = () => {
    const [countrie, setCountrie] = useState({});
    const [borderCountries, setBorderCountries] = useState([]);
    const params = useParams();
    const id = params.id
    const names = []
    const allCurrencies = []
    const allLanguages = []
    const router = useRouter()
    
    
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

  const randomCountrie = async () => {
    const idArray = [];
    await fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
          data.forEach((countrie) => idArray.push(countrie.cca3))
        })

    const randomId = idArray[Math.floor(Math.random() * idArray.length)]

    router.push('/' + randomId)
  }
            
   
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
            <div className='flex gap-7'> 
            <button data-test='home-button' onClick={() => router.push("/")} className='border-2 rounded-lg p-2 hover:bg-slate-800 hover:text-white'>Home</button>
            <button data-test='back-button' onClick={() => router.back()} className='border-2 rounded-lg p-2 hover:bg-slate-800 hover:text-white'>Back</button>
            <button data-test='random-button' onClick={() => randomCountrie()} className='border-2 rounded-lg p-2 hover:bg-slate-800 hover:text-white'>Random</button>
            </div>          
            <div className='h-80 w-11/12 mt-10'>
            <img src={countrie.flags?.svg} alt="flag" className="rounded-md content-baseline h-80 w-11/12 object-contain"></img>
            </div>
          </div>
          <div className='grid grid-rows-3 justify-center align-middle w-full '>
            <div className='flex  items-center'>
              <div className='text-4xl uppercase'>{countrie.name?.common}</div>
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
            <div data-test='border-buttons' className='w-11/12 flex flex-col items-center gap-2 h-auto'>
              <b>Border countries:</b>
              <div className='w-11/12'>{borderCountries.map(country => {
              return  <button data-test={`countrie-${country.code}`} onClick={() => router.push("/" + country.code)} className='border-2 rounded-lg p-2 mx-2 my-2 hover:bg-slate-800 hover:text-white'>{country.name}</button>
              })}
              </div>
            </div>
          </div>
        </div>
        </>
    );
};

export default Detail;
