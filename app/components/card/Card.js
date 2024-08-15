import Link from "next/link";
const card = ({id, flag, name, population, region, capital}) => {

    const borderRegion = (region) => {
        switch (region) {
            case "Africa":
                return "border-teal-500"
            case "Americas":
                return "border-red-500"
            case "Asia":
                return "border-yellow-500"
            case "Europe":
                return "border-blue-500"
            case "Oceania":
                return "border-green-500"
            case "Antarctic":
                return "border-purple-500"
            default:
                return "border-grey-500"
        }
    }
    const shadowRegion = (region) => {
        switch (region) {
          case "Africa":
            return "hover:shadow-teal-500";
          case "Americas":
            return "hover:shadow-red-500";
          case "Asia":
            return "hover:shadow-yellow-500";
          case "Europe":
            return "hover:shadow-blue-500";
          case "Oceania":
            return "hover:shadow-green-500";
          case "Antarctic":
            return "hover:shadow-purple-500";
          default:
            return "hover:shadow-grey-500";
        }
      };

    const shadowColor = shadowRegion(region)
    const borderColor = borderRegion(region)

    return (
        <>
        <Link href={`/${id}`}>
        <div className={`border-2 rounded-lg ${borderColor} w-56 h-72 hover:shadow-2xl ${shadowColor}`}>
            <img src={flag} alt="flag" className="rounded-t-md w-full h-32 object-cover"></img>
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