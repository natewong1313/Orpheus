// https://github.com/jbreneman/country-state-list
import type { CountryData, Country } from "./types"

/**
 * Gets a list of states by country code
 *
 * @param {string} countryCode - The 2 or 3 letter country code
 */
export function getCountry(countryCode: string): CountryData {
    const required = require(`./data/${countryCode.toUpperCase()}.json`)
    return typeof required === "string" ? JSON.parse(required) : required
}

/**
 * Gets a list of countries with state data
 *
 * @param {string[]} filter - An array of country codes (2 letter preferred, falls back to 3 letter)
 */
export function getCountries(filter?: string[]): Country[] {
    const list =
        filter ||
        require("./data/countries.json")
            .map((item) => item.code)
            .filter((item) => item.length)
            .sort()
    return list.map((item) => {
        return {
            ...getCountry(item),
            code: item.toUpperCase()
        }
    })
}
