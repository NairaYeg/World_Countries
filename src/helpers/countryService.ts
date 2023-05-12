import axios from 'axios';
import { Country } from '../interfaces/Country';

const API_URL = 'https://restcountries.com/v3.1/all';

export const fetchCountries = () => {
    return axios.get<Country[]>(API_URL)
      .then(response => response.data.slice(0, 40))
      .catch(error => {
        console.error("Error fetching countries:", error);
        return [];
      });
  };
  