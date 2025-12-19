function listCountries() {
  fetch(`${serverUrl}/api/allcountries/`)
    .then(res => res.json())
    .then(res => res.forEach(country => {
      document.getElementById("choose-country-id").innerHTML +=
        `<option value=${country.id}>${country.attractionCountry}</option>`
    })
    );
}// listázás opciók megadásához, legördülőlistához

function listCities() {
  fetch(`${serverUrl}/api/allcities/`)
    .then(res => res.json())
    .then(res => res.forEach(city => {
      document.querySelector("#choose-city-id").innerHTML +=
        `<option value=${city.id} data-city=${city.id}>${city.attractionCountry.attractionCountry}, ${city.attractionCity}</div></option>`
    }));
}// listázás opciók megadásához, legördülőlistához

function addCountry() {
  let TheNewCountry = document.querySelector("#new-country-id").value;
  let dataStringy = JSON.stringify(
    {
      attractionCountry: TheNewCountry
    }
  ); fetch(`${serverUrl}/api/allcountries/`,
    {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json'
      },
      body: dataStringy
    }).then(res => res.json())
    .then(data => {
      window.location.reload();
    }).catch(error => console.log(error));
}// POST fetch, ország felviteléhez

function addCity() {
  let TheNewCity = document.getElementById("new-city-id").value;
  let ChoosenCountry = document.querySelector("#choose-country-id").value;
  let dataStringy = JSON.stringify(
    {
      attractionCity: TheNewCity,
      attractionCountry: ChoosenCountry
    }
  ); fetch(`${serverUrl}/api/allcities/`,
    {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json'
      },
      body: dataStringy
    }).then(res => res.json())
    .then(data => {
      window.location.reload();
    }).catch(error => console.log(error));
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
  ).then(data => data.json()).then(data => console.log(data)).catch();
}// POST fetch, form data típus, új látványosság felviteléhez




listCountries();
listCities();