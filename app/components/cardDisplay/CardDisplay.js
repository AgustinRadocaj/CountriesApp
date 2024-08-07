'use client';

import { useEffect, useState } from "react";
import Card from "../card/Card"
const cardDisplay = () => {

    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("All");
    const [alfa, setAlfa] = useState("S");

    const searchHandler = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);
        const filtered = countries.filter((country) => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    const regionHandler = (event) => {
        const selectedRegion = event.target.value;
        setRegion(event.target.value);
        if (selectedRegion === "All") {
            setFilteredCountries(countries);
        } else {
            const filtered = countries.filter((country) => country.region === selectedRegion);
            setFilteredCountries(filtered);
        }
    };

    
    const alfaHandle = (event) => {
        const alfaValue = event.target.value;
        setAlfa(alfaValue);

        if (alfaValue === "S") setFilteredCountries(countries);
        if (alfaValue === "A") setFilteredCountries(countries.sort((a, b) => a.name.common.localeCompare(b.name.common)));
        if (alfaValue === "D") setFilteredCountries(countries.sort((a, b) => b.name.common.localeCompare(a.name.common)));
    }


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            setCountries(data);
            setFilteredCountries(data);
        };
        fetchData();
    }, []);

    return (
        <>
        <div className="flex justify-between h-20 mb-9 p-5">
            <input type="text"placeholder="Search for a country..." value={search} onChange={searchHandler}/>
        <select value={alfa} onChange={alfaHandle}>
            <option value="S">Alfabetico</option>
            <option value="A">A-Z</option>
            <option value="D">Z-A</option>
        </select>
        <select value={region} onChange={regionHandler}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Antartic">Antartic</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
        </div>
        <div className=" w-full h-auto px-10 grid grid-cols-4 gap-y-16 justify-items-center items-center">
        {filteredCountries.slice(0, 8).map((countrie, index) => 
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