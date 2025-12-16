const serverUrl = "http://127.0.0.1:8000";
let dataLine = document.querySelector(".attractDatas").innerHTML;

function allAttraction() {
  dataLine='';
  fetch(`${serverUrl}/api/allattraction/`)
    .then(res => res.json())
    .then(res => {
      res.forEach(element => {
        dataLine +=
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
function newAddition(){
const countries = [];
const cities = [];
fetch(`${serverUrl}/api/`)
dataLine = `

`
}
allAttraction();