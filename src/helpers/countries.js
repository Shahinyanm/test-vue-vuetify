import Countries from '../json/countries.json'
import CountriesISO from '../json/countries_iso.json'
let countries = Countries

const countriesArr = []
function getCountries () {

  countries = countries.map(item => {
    CountriesISO.forEach(data => {
      if (item.name === data.value) {
        item.flag = data.code
        countriesArr.push(item)
      }
    })
  })
  return countriesArr
}

export default getCountries
