const serverUrl = "http://127.0.0.1:8000";
let dataLine = document.querySelector(".attractDatas");

function allAttractions() {
  //dataLine.innerHTML = "";
  fetch(`${serverUrl}/api/allattraction/`)
    .then(res => res.json())
    .then(res => {
      res.forEach(element => {
        dataLine.innerHTML +=
          `<div class="row">
            <div class="card" style="width:600px">
              <img class="card-img-top" src="${serverUrl}${element.attractionImage}" alt="pic_error">
              <div class="card-body">
                <h3 class="card-title">${element.name}</h3>
                <h5>${element.attractionCity.attractionCity}, ${element.attractionCity.attractionCountry.attractionCountry}</h5>
                <h6>${element.address}</h6>                
                  <p class="card-text"></p>
              </div>
            </div>
            <div class="card" style="width:500px; height:500px"><div class="card-body middle"><h5>${element.description}</h5></div></div>
          </div
        `
      });
    });
}

function listCountries() {
  fetch(`${serverUrl}/api/allcountries/`)
    .then(res => res.json())
    .then(res => res.forEach(country => {
      document.getElementById("choose-country-id").innerHTML +=
        `<option value=${country.id}>${country.attractionCountry}</option>`
      console.log(country.id)
    })
    );
}

function listCities() {
  fetch(`${serverUrl}/api/allcities/`)
    .then(res => res.json())
    .then(res => res.forEach(city => {
      document.querySelector("#choose-city-id").innerHTML +=
        `<option value=${city.id}><div id="option-div-country">${city.attractionCountry.attractionCountry}</div>, <div id="option-div-city">${city.attractionCity}</div></option>`
    }));
}

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
}

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
}



function newAddition() {
  let AttName = document.getElementById("#att-name-id").value;
  let AttAddress = document.getElementById("#att-address-id").value;
  let AttOpening = document.getElementById("#opening-id").value;
  let AttDescription = document.getElementById("#description-id").value;
  let TheCityAt = document.getElementById("#option-div-city").value;
  let TheCountryAt = document.getElementById("#option-div-city").value;
  //img - háziállatos cumót átnézni
  let massData = JSON.stringify(
    {
      name: AttName,
      address: AttAddress,
      openingHours: AttOpening,
      description: AttDescription,
      attractionCity: TheCityAt,
      attractionCountry: TheCountryAt
    }
  ); fetch(`${serverUrl}/api/allattraction/`, {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json'
    },
    body: massData
  }).then(res => res.json())
    .then(data => {
      window.location.reload();
    }).catch(error => console.log(error));
}

function deleteAttraction() { }




allAttractions();
listCountries();
listCities();