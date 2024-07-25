'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const Detail = () => {
    const [countrie, setCountrie] = useState({});
      const params = useParams();
      const id = params.id

      console.log(id)
      useEffect(() => {
        const fetchData = async () => {
           await fetch('https://restcountries.com/v3.1/alpha/' + id)
           .then(response => response.json())
           .then(data => setCountrie(data[0]))
       }
        fetchData()
   }, [id])

    console.log(countrie)
    return (
        <>
          <div>{countrie.capital}</div>
          <div>{countrie.flag}</div>
          <div>{countrie.name?.common}</div>
        </>
    );
};

export default Detail;
