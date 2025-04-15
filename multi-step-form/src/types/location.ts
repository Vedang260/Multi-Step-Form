// types/location.ts
export interface Country {
    code: string;
    name: string;
  }
  
  export interface City {
    id: string;
    name: string;
    countryCode: string;
  }