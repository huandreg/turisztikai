const serverUrl = "http://127.0.0.1:8000";

countryArray = []; // országduplikáció mentesítése feature miatt
cityArray = []; // városduplikáció mentesítésefeature miatt

function listCountries() {
  document.getElementById("choose-country-id").innerHTML += `<option value="" disabled selected>Válassz országot!</option>`;
  fetch(`${serverUrl}/api/allcountries/`)
    .then(res => res.json())
    .then(res => res.forEach(country => {
      document.getElementById("choose-country-id").innerHTML +=
        `<option value=${country.id}>${country.attractionCountry}</option>`;
      countryArray.push(country.attractionCountry.toLowerCase()); // országduplikáció mentesítése feature miatt
    })
    );
}// listázás opciók megadásához, legördülőlistához


function listCities() {
  document.querySelector("#choose-city-id").innerHTML = `<option value="" disabled selected>Válassz várost!</option>`;
  fetch(`${serverUrl}/api/allcities/`)
    .then(res => res.json())
    .then(res => res.forEach(city => {
      document.querySelector("#choose-city-id").innerHTML +=
        `<option value=${city.id} data-city=${city.id}>${city.attractionCountry.attractionCountry}, ${city.attractionCity}</div></option>`;
      cityArray.push((city.attractionCountry.id + city.attractionCity).toLowerCase()); // városduplikáció mentesítése feature miatt
    }));
}// listázás opciók megadásához, legördülőlistához


function addCountry() {
  let TheNewCountry = document.querySelector("#new-country-id").value;
  let dataStringy = JSON.stringify(
    {
      attractionCountry: TheNewCountry
    }
  );
  if (!countryArray.includes(TheNewCountry.toLowerCase())) {
    fetch(`${serverUrl}/api/allcountries/`,
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json'
        },
        body: dataStringy
      }).then(res => res.json())
      .then(data => {
        alert("ÚJ ORSZÁG HOZZÁADVA!")
      }).catch(error => console.log(error));
  } else {
    TheNewCountry = document.querySelector("#new-country-id").value = "";
    alert("ILYEN ORSZÁG MÁR LÉTRE VAN HOZVA!");
  }
}// POST fetch, ország felviteléhez


function addCity() {
  let TheNewCity = document.getElementById("new-city-id").value;
  let ChoosenCountry = document.querySelector("#choose-country-id").value; // EZ EGY ID!!!!
  let dataStringy = JSON.stringify(
    {
      attractionCity: TheNewCity,
      attractionCountry: ChoosenCountry
    }
  ); if (!cityArray.includes(ChoosenCountry + TheNewCity.toLowerCase())) {
    fetch(`${serverUrl}/api/allcities/`,
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json'
        },
        body: dataStringy
      }).then(res => res.json())
    .then(data => {
      alert("ÚJ VÁROS HOZZÁADVA!")
    }).catch(error => console.log(error));
  } else {
    document.getElementById("new-city-id").value = "";
    alert("ILYEN ORSZÁG-VÁROS PÁROSÍTÁS MÁR LÉTRE VAN HOZVA!")
  }
}// POST fetch, város felviteléhez


function uploadNewAttraction() {
  let massData = new FormData();
  massData.append("name", document.getElementById("att-name-id").value);
  massData.append("address", document.getElementById("att-address-id").value);
  massData.append("openingHours", document.getElementById("opening-id").value);
  massData.append("description", document.getElementById("description-id").value);
  massData.append("attractionCity", document.getElementById("choose-city-id").value);
  massData.append("attractionImage", document.getElementById("image-file-id").files[0]);
  fetch(`${serverUrl}/api/allattraction/`,
    {
      method: 'POST',
      body: massData
    }
  ).then(data => data.json()).then(data => { console.log(data); alert("ÚJ LÁTVÁNYOSSÁG HOZZÁADVA!") }).catch();
}// POST fetch, form data típus, új látványosság felviteléhez




listCountries();//ezek miatt a külön JS file, így index render-nél nem dob hibát
listCities();