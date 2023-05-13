export const SORT_OPTIONS = {
    NAME: "name",
    POPULATION: "population",
    AREA: "area",
    REGION: "region",
  };
  
export const TABLE_HEADERS = [
    { name: "Country Name", sortOption: null },
    { name: "Region", sortOption: null },
    /* In the provided task description image, 
      "Sort By Population" appears to be a dropdown.
       However, I couldn't figure out how to sort the 
       population via select options. Instead, I'm sorting 
       the population in either ascending or descending order.*/
    { name: "Population", sortOption: SORT_OPTIONS.POPULATION },
    { name: "Area", sortOption: SORT_OPTIONS.AREA },
    { name: "Flag", sortOption: null },
    { name: "Action", sortOption: null },
  ];
