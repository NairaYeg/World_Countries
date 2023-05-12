import { useState, useEffect, useCallback } from "react";
import { fetchCountries } from "../helpers/countryService";
import { Country } from "../interfaces/Country";
import { USER_MESSAGES } from "../constants/ userMessages";

export const useCountries = (filterName: string, filterRegion: string, deletedCountries: string[]) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setCountries(data);
      })
      .catch(() => {
        setErrorMessage(USER_MESSAGES.apiErrorMessage);
      });
  }, []);

  const filterCountries = useCallback(() => {
    let filtered = countries;

    if (filterName) {
      filtered = filtered.filter(({ name: { common } }) =>
        common.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterRegion) {
      filtered = filtered.filter(
        ({ region }) => region.toLowerCase() === filterRegion.toLowerCase()
      );
    }

    // Exclude deleted countries from filtered results
    filtered = filtered.filter(
      ({ name: { common } }) => !deletedCountries.includes(common)
    );

    if (!filtered.length) {
      setErrorMessage(USER_MESSAGES.noResultsMessage);
    } else {
      setErrorMessage('');
    };

    setFilteredCountries(filtered);
  }, [countries, filterName, filterRegion, deletedCountries]);

  useEffect(() => {
    filterCountries();
  }, [countries, filterName, filterRegion, filterCountries]);

  return { countries, filteredCountries, errorMessage };
};
