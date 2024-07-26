import Link from "next/link";
const card = ({id, flag, name, population, region, capital}) => {
    return (
        <>
        <Link href={`/${id}`}>
        <div className="border-4 border-red-500 w-56 h-72">
            <img src={flag} alt="flag" className="w-full h-32"></img>
            <div className="px-4">
                <h1 className="text-lg my-4">{name}</h1>
                <div>
                    <div className="text-sm my-2"><b>Population:</b> {population}</div>
                    <div className="text-sm my-2"><b>Region:</b> {region}</div>
                    <div className="text-sm my-2"><b>Capital:</b> {capital}</div>
                </div>
            </div>
        </div>
        </Link>
        </>
    )
}

export default card;