export interface Country {
    name: {
      common: string;
    };
    region: string;
    population: number;
    area: number;
    flags: {
      svg: string;
      alt: string;
    };
  };