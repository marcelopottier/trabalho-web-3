let jsonData;

function fetchData() {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', 'https://status.js.org/codes.json');
        request.onload = () => {
          if (request.status === 200) {
            const jsonData = JSON.parse(request.responseText);
            resolve(jsonData);
          } else {
            reject(new Error('Failed to fetch data'));
          }
        };
        request.onerror = () => {
          reject(new Error('Failed to fetch data'));
        };
        request.send();
      });
}

function listData(){
    let list = document.getElementById("data-list");
    if (jsonData) {
        for (let key in jsonData) {
          let listItem = document.createElement("li");
          listItem.classList.add("list-group-item", "text-start");
          listItem.innerHTML = `${key}: ${jsonData[key].description}`;
          list.appendChild(listItem);
        }
      } else {
        console.error('Data not available');
      }
}

async function fillDataInput() {
    let input = document.getElementById("code-text").value;
    let codeInput = document.getElementById("http-code-input");
    let descInput = document.getElementById("http-desc-input");
    let fImage = await fetchImage(input);
    let imgDiv = document.getElementById("img-input");
    imgDiv.src = fImage.image.jpg;
    codeInput.innerHTML = jsonData[input].code;
    descInput.innerHTML = jsonData[input].description;
}

async function random(){
    let number = getRandomNumber(jsonData);
    let fImage = await fetchImage(number.code);
    let codeRandom = document.getElementById("http-code-random");
    let imgDivRandom = document.getElementById("imgDivRandom");
    let descRandom = document.getElementById("http-desc-random");
    codeRandom.innerHTML = number.code;
    descRandom.innerHTML = number.description;
    imgDivRandom.src = fImage.image.jpg;

}


async function fetchImage(code) {
  //Proxy para funcionamento da API, a API utilizada não tem CORS permitivo.
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const url = ${proxyUrl}https://httpcats.com/${code}.json;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function fetchData(){
    const response = await fetch('https://status.js.org/codes.json');
    const json = await response.json();
    return json;
}


function getRandomNumber(jsonData){
    let codes = Object.keys(jsonData);
    let randomIndex = Math.floor(Math.random() * codes.length);
    let randomCode = codes[randomIndex];
    return jsonData[randomCode];
}

window.onload = async function() {
    try {
      jsonData = await fetchData();
      console.log('deu boa:', jsonData);
      listData();
    } catch (error) {
      console.error('erro no fetch', error);
    }
};
