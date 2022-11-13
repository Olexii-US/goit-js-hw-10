import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { fetchCountries } from "./fetchCountries"

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info")
}

refs.input.addEventListener("input", debounce((input) => {
    const countries = input.target.value.trim()

    if (countries === "") {
        refs.list.innerHTML = "";
        return
    }
    
    fetchCountries(countries).then(name => markupCountries(name))
        .catch(error => Notify.failure("Oops, there is no country with that name"))
    
}, DEBOUNCE_DELAY)) 

function markupCountries(name) {

    if (name.length > 10) {
        return Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (name.length > 1 && name.length <= 10) {
        markupCountryList(name);
        console.log("eeeeeeeeeelllllllsssssseeeee")
    } else
    markupSingleCountry(name);

}

function markupSingleCountry(name) {
    const markup = name.map((el) => {
        const languageSet = Object.values(el.languages)
        
        return `<li>
            <h2>${el.name.official}</h2>
            <img src="${el.flags.svg}" alt="Country flag" width="100">
                <p>Capital: ${el.capital}</p>
                <p>Population: ${el.population}</p>
                <p>Languages: ${languageSet}</p>
        </li>`
    })
        .join("");
    refs.list.innerHTML = markup;
}

function markupCountryList(name) {
    const markup = name.map((el) => {
        return `<li>
            <h2>${el.name.official}</h2>
            <img src="${el.flags.svg}" alt="Country flag" width="100">
        </li>`
    })
        .join("");
    refs.list.innerHTML = markup;
}





