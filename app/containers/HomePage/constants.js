export const API = "https://api.myjson.com/bins/o7ujv";
export const SHIPORIGINCOPY = "Country of origin";
export const SHIPTEUCOPY = "TEU";
export const MISSINGORIGIN = "Unidentified";

export const DISPLAYCOUNTRYORIGIN = (data) =>  {
  let country = data.match(/\((.*?)\)/);
  if(country) {
    return country[1];
  } else {
    return MISSINGORIGIN;
  }
}
