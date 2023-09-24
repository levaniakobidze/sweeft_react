export interface countryDataTypes {
  name: { common: string; official: string };
  flag: string;
  capital: string;
  population: number;
  region: string;
  subRegion: string;
  currencies: { name: string; symbol: string };
  currencyCode: string;
  borders: [string];
  continent: string;
  cca3: string;
  cca2: string;
}

export interface LocationTypes {
  latitude: number;
  longitude: number;
}
