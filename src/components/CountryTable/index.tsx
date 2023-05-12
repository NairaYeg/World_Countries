import React, { useState } from "react";
import { Region } from "../../constants/regions";
import { useCountries } from "../../customHooks/useCountries";
import { useSort } from "../../customHooks/useSort";
import { USER_MESSAGES } from "../../constants/ userMessages";
import "./styles.css";

import { Country } from "../../interfaces/Country";

const SORT_OPTIONS = {
  NAME: "name",
  REGION: "region",
  POPULATION: "population",
  AREA: "area",
};

interface CountryRowProps {
  country: Country;
  handleRemoveCountry: (name: string) => void;
}

const CountryRow: React.FC<CountryRowProps> = ({
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
        <button onClick={() => handleRemoveCountry(common)}>
        ⓧ
        </button>
      </td>
    </tr>
  );
};

const CountryTable: React.FC = () => {
  const [filterName, setFilterName] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [deletedCountries, setDeletedCountries] = useState<string[]>([]);

  const { filteredCountries, errorMessage } = useCountries(
    filterName,
    filterRegion,
    deletedCountries
  );
  const { handleSort, sortedData } = useSort(filteredCountries);

  const handleFilterNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterName(event.target.value);
  };

  const handleFilterRegionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterRegion(event.target.value);
  };

  const handleRemoveCountry = (countryName: string) => {
    setDeletedCountries((prevDeletedCountries) => [
      ...prevDeletedCountries,
      countryName,
    ]);
  };

  return (
    <div className="country-table">
      <div className="filters">
        <h4>Filters</h4>
        <div className="name-filter-input">
          <input
            type="text"
            value={filterName}
            onChange={handleFilterNameChange}
            placeholder='Search'
          />
        </div>
        <div className="region-filter-select">
          <select value={filterRegion} onChange={handleFilterRegionChange}>
            <option value="">Region</option>
            {Object.values(Region).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage ? (
        <h4>{USER_MESSAGES.noResultsMessage}</h4>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Country Name</th>
              <th>
                <button onClick={() => handleSort(SORT_OPTIONS.REGION)}>
                  Region
                </button>
              </th>
              <th>
                {/* In the provided task description image, 
                "Sort By Population" appears to be a dropdown.
                 However, I couldn't figure out how to sort the 
                 population via select options. Instead, I'm sorting 
                 the population in either ascending or descending order.*/}
                <button onClick={() => handleSort(SORT_OPTIONS.POPULATION)}>
                  Population
                </button>
              </th>
              <th>
                <button onClick={() => handleSort(SORT_OPTIONS.AREA)}>
                  Area
                </button>
              </th>
              <th>Flag</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((country) => (
              <CountryRow
                key={country.name.common}
                country={country}
                handleRemoveCountry={handleRemoveCountry}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CountryTable;
