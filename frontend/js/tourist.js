const serverUrl = "http://127.0.0.1:8000";
let dataLine = document.querySelector(".attractDatas");
let allAttractionsArray = [];
let allIdArray = []; // array minden Id-nak, hogy ugyanazzal a fgv-el lehessen mindent renderelni a "generátor-fgv--ben"
let searchArray = []; // searched id array keresési találatoknak


function roundToHalf(num) {
  return Math.round(num * 2) / 2;
} // kerekítőfüggvény


function ratingHandler(rate05, rate10, rate15, rate20, rate25, rate30, rate35, rate40, rate45, rate50) {
  const allRates = rate05 + rate10 + rate15 + rate20 + rate25 + rate30 + rate35 + rate40 + rate45 + rate50;
  let finalRating = ((rate05 * 0.5) + (rate10 * 1) + (rate15 * 1.5) + (rate20 * 2) + (rate25 * 2.5) + (rate30 * 3) + (rate35 * 3.5) + (rate40 * 4) + (rate45 * 4.5) + (rate50 * 5)) / allRates;
  finalRating = roundToHalf(finalRating)
  return finalRating ? finalRating : 0
}// rating-et kerekít .5-re, plusz NaN értéket 0-ra alakítja(értékelés nélkül NaN lenne a finalRating)


function getAllData() {
  dataLine.innerHTML = "";
  allAttractionsArray = [];// LISTÁK ÜRÍTÉSE ÉS SCREEN TÖRLÉSE FONTOS
  allIdArray = [];
  fetch(`${serverUrl}/api/allattraction/`)
    .then(res => res.json())
    .then(res => {
      res.forEach(element => {
        allAttractionsArray.push(element);
        allIdArray.push(element.id);

      });
      htmlGenerator(allIdArray);
    }
    );
} // egész lista mentése tömbbe, kereséshez, generáláshoz


function htmlGenerator(beLista) {//ezt majd paraméterezni hogy bekapott lista után generáljon,
  dataLine.innerHTML = "";
  beLista.forEach(searchedId => {
    allAttractionsArray.forEach(element => {
      if (searchedId === element.id) {
        const half = element.rate05;
        const one = element.rate10;
        const onehalf = element.rate15;
        const two = element.rate20;
        const twohalf = element.rate25;
        const three = element.rate30;
        const threehalf = element.rate35;
        const four = element.rate40;
        const fourhalf = element.rate45;
        const five = element.rate50;
        allRates = half + one + onehalf + two + twohalf + three + threehalf + four + fourhalf + five;
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
            <div class="card" style="width:600px; height:600px"><div class="card-body middle">
              <div>
                <div class="del-button" onclick="deleteAttraction(${element.id})">❌</div>                      
                <h5>${element.description}</h5>
                <br><br><br>
                <div>
                  <h6><span style="font-size: 30px">⭐ ${ratingHandler(half, one, onehalf, two, twohalf, three, threehalf, four, fourhalf, five)}</span>
                  <h6>Adj egy szavazatot: </h6> 
                    </h6>
                      <div >
                        <span class="half-star rating-button" data-attraction-id="${element.id}" data-value="rate05" data-counter="${half}">💀</span>
                        <span class="one-star rating-button" data-attraction-id="${element.id}" data-value="rate10" data-counter="${one}">🤬</span>
                        <span class="one-half-star rating-button" data-attraction-id="${element.id}" data-value="rate15" data-counter="${onehalf}">😭</span>
                        <span class="two-star rating-button" data-attraction-id="${element.id}" data-value="rate20" data-counter="${two}">😣</span>
                        <span class="two-half-star rating-button" data-attraction-id="${element.id}" data-value="rate25" data-counter="${twohalf}">🤐</span>
                        <span class="three-star rating-button" data-attraction-id="${element.id}" data-value="rate30" data-counter="${three}">😐</span>
                        <span class="three-half-star rating-button" data-attraction-id="${element.id}" data-value="rate35" data-counter="${threehalf}">🤔</span>
                        <span class="four-star rating-button" data-attraction-id="${element.id}" data-value="rate40" data-counter="${four}">😉</span>
                        <span class="four-half-star rating-button" data-attraction-id="${element.id}" data-value="rate45" data-counter="${fourhalf}">😎</span>
                        <span class="five-star rating-button" data-attraction-id="${element.id}" data-value="rate50" data-counter="${five}">😍</span>    
                      </div>
                    <h6>${allRates} szavazat</h6>
                </div>                  
            </div>        
          </div>
        `;
      }
    });
  });

  document.querySelectorAll(".rating-button").forEach(rateButton => {
    rateButton.addEventListener("click", () => {
      const attractionId = rateButton.dataset.attractionId;
      const whichRating = rateButton.dataset.value;
      let rateCounter = rateButton.dataset.counter;
      rateCounter++;
      let dataToSend = {};
      dataToSend[whichRating] = parseInt(rateCounter);
      fetch(`${serverUrl}/api/allattraction/rate/${attractionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)  // ITT A LÉNYEG, EZ AZ ADAT LESZ ELKÜLDVE, URL-ben PEDIG ELKÜLDVE HOGY VIEWBAN MELYIK OBJ  LESZ KIVÁLASZTVA              
      })
        .then(res => {
          console.log(res.status, res.statusText);
          return res.json();
        })
        .then(data => console.log("UPDATED: ", data))
        .catch(err => console.error(err));
      alert("ÉRTÉKELÉS LEADVA!");
    });
  });  // !!!FONTOS!!! dataset-nél automatikusan camelCase-é alakítja!!! attraction-id -> attractionId
}// rate-et meg lehetett volna oldani elegánsabban is, eléggé gusztustalan ez a sok ismétlődő rate, de így működik ezért nem bántom
// ULTRA NAGY MESS


function deleteAttraction(id) {
  fetch(`${serverUrl}/api/allattraction/delete/${id}`,
    {
      method: "DELETE",
      headers:
      {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        console.log("Attraction OFF");
      }
      else {
        console.log("There is a Problem");
      }
    }).catch(error => { console.log(error) });
}// látványosság törlése


function Searching() {
  searchArray = []; // searched id array restart
  let searchedWord;
  let inputWord = document.querySelector('#search-field').value.toLowerCase();
  if (inputWord.trim() !== "" && inputWord.length >= 4) {
    searchedWord = document.querySelector('#search-field').value;
    allAttractionsArray.forEach(element => {
      if (element.name.includes(inputWord) ||
        element.address.toLowerCase().includes(inputWord) ||
        element.description.toLowerCase().includes(inputWord) ||
        element.attractionCity.attractionCity.toLowerCase().includes(inputWord) ||
        element.attractionCity.attractionCountry.attractionCountry.toLowerCase().includes(inputWord)
      ) {
        searchArray.push(element.id);
      }
    });
  }
  document.querySelector('#search-field').value = "";// field visszaállítása
  if (searchedWord == undefined) {
    console.log("SEMMI VAGY KEVÉS KARAKTER");
  }
  else if (searchArray.length === 0) {
    alert("NINCS KERESÉSI TALÁLAT!");
  }
  else {
    htmlGenerator(searchArray);
  }
}// kereső fgv. min 4 karakter


getAllData();







document.querySelector('#search-button').addEventListener('click', Searching);
document.querySelector('#search-field').addEventListener('keydown', (entWatcha) => {
  if (entWatcha.key === 'Enter') {
    Searching();
  }
});