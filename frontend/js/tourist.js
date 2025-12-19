const serverUrl = "http://127.0.0.1:8000";
let dataLine = document.querySelector(".attractDatas");
let allAttractionsArray = []; //

function roundToHalf(num) { // kerekítőfüggvény
  return Math.round(num * 2) / 2;
}

function ratingHandler(rate05, rate10, rate15, rate20, rate25, rate30, rate35, rate40, rate45, rate50) {
  const allRates = rate05 + rate10 + rate15 + rate20 + rate25 + rate30 + rate35 + rate40 + rate45 + rate50;
  let finalRate = ((rate05 * 0.5) + (rate10 * 1) + (rate15 * 1.5) + (rate20 * 2) + (rate25 * 2.5) + (rate30 * 3) + (rate35 * 3.5) + (rate40 * 4) + (rate45 * 4.5) + (rate50 * 5)) / allRates;
  finalRate = roundToHalf(finalRate)
  return finalRate ? finalRate : 0
}

function allAttractions() {
  //dataLine.innerHTML = " ";
  fetch(`${serverUrl}/api/allattraction/`)
    .then(res => res.json())
    .then(res => {
      res.forEach(element => {
        const rate05 = element.rate05;
        const rate10 = element.rate10;
        const rate15 = element.rate15;
        const rate20 = element.rate20;
        const rate25 = element.rate25;
        const rate30 = element.rate30;
        const rate35 = element.rate35;
        const rate40 = element.rate40;
        const rate45 = element.rate45;
        const rate50 = element.rate50;
        allRates = rate05 + rate10 + rate15 + rate20 + rate25 + rate30 + rate35 + rate40 + rate45 + rate50;
        dataLine.innerHTML +=
          `<div class="row">
            <div class="card" style="width:600px; height:600px">
              <img class="card-img-top" src="${serverUrl}${element.attractionImage}" alt="pic_error">
              <div class="card-body">
                <h3 class="card-title">${element.name}</h3>
                <h5>${element.attractionCity.attractionCity}, ${element.attractionCity.attractionCountry.attractionCountry}</h5>
                  <p class="card-text"></p>
                <h6>${element.address}</h6>
                <h6>Nyitva: ${element.openingHours}</h6>
              </div>
            </div>
            <div class="card" style="width:600px; height:600px"><div class="card-body middle"><h5>${element.description}</h5></div>
            <div><h6><spun style="font-size: 30px">⭐ ${ratingHandler(rate05, rate10, rate15, rate20, rate25, rate30, rate35, rate40, rate45, rate50)}</spun></h6>
            <spun class="half-star rating-button" onclick="console.log('half-star clicked')">⚪</spun>
            <spun class="one-star rating-button">⚪</spun>
            <spun class="one-half-star rating-button">⚪</spun>
            <spun class="two-star rating-button">⚪</spun>
            <spun class="two-half-star rating-button">⚪</spun>
            <spun class="three-star rating-button">⚪</spun>
            <spun class="three-half-star rating-button">⚪</spun>
            <spun class="four-star rating-button">⚪</spun>
            <spun class="four-half-star rating-button">⚪</spun>
            <spun class="five-star rating-button">⚪</spun>      
            <h6>${allRates} szavazat</h6></div>
                       
            </div>
          </div>
        `
      });
    });
}// rate-et meg lehetett volna oldani elegánsabban is, de így működött ezért nem akartam
 






function deleteAttraction() { }




allAttractions();
