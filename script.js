// let str = {
//   name: { common: "India" },
//   capital: ["New Delhi"],
//   population : 1400000000,
//   flags : { png: "flag-url.png" },
//   region : "Asia",
//   subregion : "Southern Asia",
//   languages : { hin: "Hindi", eng: "English" },
//   currencies : {
//     INR : { name: "Indian rupee", symbol: "₹" }
//   }
// }

// const p = document.querySelector("#para");

// Accessing Elements

const baseURL = "https://restcountries.com/v3.1/name";
const p = document.querySelector(".cont-body p");
const input = document.querySelector(".cont-body input");
const btn = document.querySelector(".cont-body button");
const officialName = document.querySelector("#name");
const capital = document.querySelector("#capital");
const population = document.querySelector("#population");
const continent = document.querySelector("#continent");
// const currSymbol  = document.querySelector("#curr-symbol");
const timeZone = document.querySelector("#timezone");
const loading = document.querySelector(".loading");
const paras = document.querySelectorAll(".para");
const currency = document.querySelector("#currency");
const flagImg = document.querySelector(".flag-img");



// Format population in readable units

function formatPopulation(pop) {
    if (pop >= 1_000_000_000) {
        return `${(pop / 1_000_000_000).toFixed(2)} Billion`;
    } else if (pop >= 1_000_000) {
        return `${(pop / 1_000_000).toFixed(2)} Million`;
    } else if (pop >= 1_000) {
        return `${(pop / 1_000).toFixed(3)} Thousand`;
    } else {
        return pop.toString();
    }
}

// Click Functionality
btn.addEventListener("click", async () =>{
    try{
    loading.innerText = "Fetching Data.....";
    flagImg.classList.add("hide");
    loading.classList.remove("hide");
    paras.forEach(para => para.classList.add("hide"));
    const country  = input.value.trim();
    const countryName = country[0].toUpperCase()+country.slice(1).toLowerCase();
    console.log(countryName);
    console.log(country);
    if(country === "" || !isNaN(country)){
        alert("Enter a valid Country Name");
        // p.innerText = "Enter a valid Country Name";
        loading.classList.add("hide");
        flagImg.classList.remove("hide");
        return;
    }

    setTimeout( async () =>{
    try{
        let URL = `${baseURL}/${countryName}`;
        let response = await fetch(URL);
        console.log(response);
        let data = await response.json();
        let countryData = data[0];
        console.log(countryData);
        let currencyCode = Object.keys(countryData.currencies)[0];
        console.log(currencyCode);
        let currencyInfo = countryData.currencies[currencyCode];
        console.log(currencyInfo);

        loading.classList.add("hide");
        paras.forEach(para => para.classList.remove("hide"));
    

        officialName.innerText = countryData.name.official || "N/A";
        capital.innerText = countryData.capital || "N/A";
        population.innerText = formatPopulation(countryData.population) || "N/A";
        continent.innerText = countryData.continents || "N/A";
        timeZone.innerText = countryData.timezones || "N/A";
        currency.innerText = `${currencyInfo.name} (${currencyInfo.symbol})` || "N/A";
           } catch (fetchErr) {
                alert("Error in fetching Data. Check Console");
                loading.classList.remove("hide");
                paras.forEach(para => para.classList.add("hide"));
                loading.innerText = "Error 404. Unable to fetch Data";
                console.error(fetchErr);
            }
        },1000);
    }catch(err) {
            // if(country === "" || !isNaN(country)){
            //     alert("Enter a valid Country Name");
            //     loading.classList.add("hide");
            //     flagImg.classList.remove("hide");
            //     return;
            // }
            alert("Something went wrong!");
            console.error(err);
            // loading.classList.remove("hide");
            // loading.innerText = "Unexpected Error!";
            loading.classList.add("hide");
            flagImg.classList.remove("hide");
    }
});