import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { fetchCountries } from "./fetchCountries"

const DEBOUNCE_DELAY = 300;
const countryMaxforPage = 10;

const refs = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info")    
}

refs.input.addEventListener("input", debounce((input) => {
    const countries = input.target.value.trim()

    if (countries === "") {
        return clearNarkup()
        
    }
    
    fetchCountries(countries).then(name => markupCountries(name))
        .catch(error => Notify.failure("Oops, there is no country with that name"))
    
}, DEBOUNCE_DELAY)) 

function markupCountries(name) {
    if (name.length > countryMaxforPage) {
        return Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (name.length === 1) {
        markupCountryList(name);
        markupCountryData(name);

        ///////// for CSS//////
        const liRef = document.querySelectorAll(".country-item")
        liRef[0].classList.replace('country-item', 'item')
        /////////////////////
    } else if (name.length > 1 && name.length <= countryMaxforPage) {
        clearNarkup()
        markupCountryList(name);
    }
}

function markupCountryList(name) {
    const markup = name.map((el) => {
        return `<li class="country-item">
            <img src="${el.flags.svg}" alt="Country flag">
            <h2>${el.name.official}</h2>            
        </li>`
    })
        .join("");
    refs.list.innerHTML = markup;
}

function markupCountryData(name) {
    const markup = name.map((el) => {
        const languageSet = Object.values(el.languages)
        
        return `<p><b>Capital:</b> ${el.capital}</p>
                <p><b>Population:</b> ${el.population}</p>
                <p><b>Languages:</b> ${languageSet.join(", ")}</p>`
    })
        .join("");
    refs.info.innerHTML = markup;
}

function clearNarkup() {
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
}


