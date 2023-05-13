import React, { useState } from "react";
import { Region } from "../../constants/regions";
import { useCountries } from "../../customHooks/useCountries";
import { useSort } from "../../customHooks/useSort";
import { USER_MESSAGES } from "../../constants/ userMessages";
import { TABLE_HEADERS } from '../../constants/countryTableConstants';
import { CountryRow } from "./CountryRow";
import "./styles.css";

const CountryTable: React.FC = () => {
  const [filterName, setFilterName] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [deletedCountries, setDeletedCountries] = useState<string[]>([]);

  const { isLoading, filteredCountries, errorMessage } = useCountries(
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
            placeholder="Search"
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
      {isLoading ? (
        <p>{USER_MESSAGES.loadingMessage}</p>
      ) : errorMessage ? (
        <h4>{USER_MESSAGES.noResultsMessage}</h4>
      ) : (
        <table className="table">
          <thead>
            <tr>
              {TABLE_HEADERS.map(({sortOption, name}, index) => (
                <th key={index}>
                  {sortOption ? (
                    <button onClick={() => handleSort(sortOption)}>
                      {name}
                    </button>
                  ) : (
                   name
                  )}
                </th>
              ))}
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
