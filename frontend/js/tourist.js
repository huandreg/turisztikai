const serverUrl = "http://127.0.0.1:8000";
let dataLine = document.querySelector(".attractDatas");

function allAttraction() {
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
      document.querySelector("#city-name").innerHTML +=
        `<option value=${city.id}> ${city.attractionCountry.attractionCountry}, ${city.attractionCity}</option>`
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
  console.log('ez van a fetch-ben  ' + ChoosenCountry); 
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
      console.log("Valami történt")
      window.location.reload();
    }).catch(error => console.log("ERROR"));

}








function newAddition() {
  fetch(`${serverUrl}/api/`)
  dataLine.innerHTML = `
`}








allAttraction();
listCountries();
listCities();