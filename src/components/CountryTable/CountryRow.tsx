import { Country } from "../../interfaces/Country";


interface CountryRowProps {
    country: Country;
    handleRemoveCountry: (name: string) => void;
  }
  
  
export const CountryRow: React.FC<CountryRowProps> = ({
    country,
    handleRemoveCountry,
  }) => {
    const {
      name: { common },
      region,
      population,
      area,
      flags: { svg, alt },
    } = country;
  
    return (
      <tr key={common}>
        <td>{common}</td>
        <td>{region}</td>
        <td>{population}</td>
        <td>{area}</td>
        <td>
          <img src={svg} alt={alt} width="30" height="20" />
        </td>
        <td className="delete-columns">
          <button onClick={() => handleRemoveCountry(common)}>ⓧ</button>
        </td>
      </tr>
    );
  };
