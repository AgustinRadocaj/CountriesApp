'use client';

import { useEffect, useState } from "react";
import Card from "../card/Card"
const cardDisplay = () => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
         const fetchData = async () => {
            await fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => setCountries(data))
        }
         fetchData()
    }, [])
    return (
        <>
        <div className="flex justify-between h-20 mb-9 p-5">
            <input type="text"placeholder="Search for a country..." />
        <select>
            <option value="Africa">Africa</option>
            <option value="Antartic">Antartic</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
        </div>
        <div className=" w-full h-auto px-10 grid grid-cols-4 gap-y-16 justify-items-center items-center">
        {countries.slice(0, 8).map((countrie, index) => 
                    <Card 
                    key={index}
                    id={countrie.cca3}
                    flag={countrie.flags.svg}
                    name={countrie.name.common}
                    population={countrie.population}
                    region={countrie.region}
                    capital={countrie.capital} 
                     /> 
                )}
        </div>
        </>
    )
}

export default cardDisplay;