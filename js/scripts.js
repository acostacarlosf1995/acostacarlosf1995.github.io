// dropdown button

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
  
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Boton crear Guifos

document.querySelector(".btnCreateGifos").onclick = function() {
  window.location.href = '/upload.html';
}

// Change Themes

document.getElementById('sailorDay').addEventListener('click', function() {
  document.body.classList.remove('dark-theme');
  localStorage.removeItem('dark-theme-enabled');
})

document.getElementById('sailorNight').addEventListener('click', function() {
  let darkThemeEnabled = document.body.classList.add('dark-theme');
  localStorage.setItem('dark-theme-enabled', darkThemeEnabled);
})

if (localStorage.getItem('dark-theme-enabled')) {
  document.body.classList.add('dark-theme');
}

// show gifos save

function showMyGuifosSaveIndex() {
  document.querySelector(".search-cont").style.display = "none";
  document.querySelector(".search-found-cont").style.display = "none";
  document.querySelector("#cont-result").style.display = "none";
  document.querySelector("#cont-gif-result").style.display = "none";
  document.querySelector(".contMisGuifos").style.display = "flex";
  document.querySelector(".contMisGuifos").style.marginTop = "0px";

  const idKeys = Object.values(localStorage);

  fetch("https://api.giphy.com/v1/gifs?&api_key=" + APIKEY + "&ids=" + idKeys)
  .then(response => response.json())
  .then(data => {
    document.querySelector(".contAllMyGuifos").innerHTML = `
     ${data.data.map(function(myGifos) {
  
      return `
        <div id="myGifos-res">
          <div class="cont-img-myGifos">
            <img id="gif-myGuifos-imgTag" src="${myGifos.images.original.url}">
          </div>
        </div> 
      `
    }).join('')}
    `
  })
  .catch(error => console.log(error));
}

// Start page sugerencia

const APIKEY = "eixy16Wfm4TY5lPbBNNRCIEPhmI4aZu1";

const foundSug = fetch('https://api.giphy.com/v1/gifs/trending?api_key=' + APIKEY + '&limit=4' + '&offset=18')
.then(response => response.json())
.then(data => {
  injectGifSug(data)
})
.catch(error => console.log(error));

function injectGifSug(data) {

  const titleTendRandom = data.data[0].title;

  const titleTendImg = data.data[0].images.original.url;

  const titleTendInject = titleTendRandom.split(" ", 1).join('');

  const titleTendRandom2 = data.data[1].title;

  const titleTendImg2 = data.data[1].images.original.url;

  const titleTendInject2 = titleTendRandom2.split(" ", 1).join('');

  const titleTendRandom3 = data.data[2].title;

  const titleTendImg3 = data.data[2].images.original.url;

  const titleTendInject3 = titleTendRandom3.split(" ", 1).join('');

  const titleTendRandom4 = data.data[3].title;

  const titleTendImg4 = data.data[3].images.original.url;

  const titleTendInject4 = titleTendRandom4.split(" ", 1).join('');

  document.getElementById("gif-trending").innerHTML = `
    <div id="gif-img-trend">
      <div id="gif-title">
        <p>#${titleTendInject}</p>
        <img class="xImg" src="/images/button close.svg"></img>
      </div>
      <img id="img-size-trend" src="${titleTendImg}">
      <button id="btn-trend">Ver más...</button>
    </div>

    <div id="gif-img-trend">
      <div id="gif-title">
        <p>#${titleTendInject2}</p>
        <img class="xImg" src="/images/button close.svg"></img>
      </div>
      <img id="img-size-trend2" src="${titleTendImg2}">
      <button id="btn-trend2">Ver más...</button>
    </div>

    <div id="gif-img-trend">
      <div id="gif-title">
        <p>#${titleTendInject3}</p>
        <img class="xImg" src="/images/button close.svg"></img>
      </div>
      <img id="img-size-trend3" src="${titleTendImg3}">
      <button id="btn-trend3">Ver más...</button>
    </div>
    
    <div id="gif-img-trend">
      <div id="gif-title">
        <p>#${titleTendInject4}</p>
        <img class="xImg" src="/images/button close.svg"></img>
      </div>
      <img id="img-size-trend4" src="${titleTendImg4}">
      <button id="btn-trend4">Ver más...</button>
    </div>
  `

  document.getElementById("btn-trend").addEventListener("click", injectTendResult);

  function injectTendResult() {
    input.value = titleTendInject;

    searchGif()
  }

  document.getElementById("btn-trend2").addEventListener("click", injectTendResult2);

  function injectTendResult2() {
    input.value = titleTendInject2;

    searchGif()
  }

  document.getElementById("btn-trend3").addEventListener("click", injectTendResult3);

  function injectTendResult3() {
    input.value = titleTendInject3;

    searchGif()
  }

  document.getElementById("btn-trend4").addEventListener("click", injectTendResult4);

  function injectTendResult4() {
    input.value = titleTendInject4;

    searchGif()
  }
}

// Start page Tendencia  

const foundTend = fetch('https://api.giphy.com/v1/gifs/trending?api_key=' + APIKEY + '&limit=17')
.then(response => response.json())
.then(data => {
  injectGifTen(data);
})
.catch(error => console.log(error));

function injectGifTen(data) {

  document.getElementById("gif-tendencia").innerHTML = `
  ${data.data.map(function(tendencia) {

    const titleStringTend = tendencia.title;

    const titleCutTend = titleStringTend.split(" ", 1);

    return `
      <div id="gif-tendencia-res">
        <div class="cont-img-tend">
          <img id="gif-tendencia-cont" src="${tendencia.images.original.url}">
        </div>  
        <div id="cont-img-title">
          <p id="gif-tend-title">#${titleCutTend}</p>
        </div>
      </div>
    `
  }).join('')}
  `
}

// Input Search Bar

input = document.getElementById("search-text");

input.addEventListener("input", activeBtn);

function activeBtn() {

  if (input.value.length>0) {

    document.getElementById("search-btn").classList.replace("search-button", "search-button-active");  

    fetch('https://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=3')
    .then(response => response.json())
    .then(data => {
      injectGifSearch(data)
    })
    .catch(error => console.log(error));

    function injectGifSearch(data) {

      const titleRandomSearch = data.data[0].title;

      const titleCutSearch = titleRandomSearch.split(" ", 1).join('');

      const titleRandomSearch2 = data.data[1].title;

      const titleCutSearch2 = titleRandomSearch2.split(" ", 1).join('');

      const titleRandomSearch3 = data.data[2].title;

      const titleCutSearch3 = titleRandomSearch3.split(" ", 1).join('');

      document.getElementsByClassName("search-found")[0].innerHTML = `
          <div>
            <button id="btn-search-found">${titleCutSearch}</button>
          </div>
          <div>
            <button id="btn-search-found2">${titleCutSearch2}</button>
          </div>
          <div>
            <button id="btn-search-found3">${titleCutSearch3}</button>
          </div>
        `

      document.getElementsByClassName("search-found")[0].classList.add("with-result");

      document.getElementById("btn-search-found").addEventListener("click", injectSearchTitle);

      function injectSearchTitle() {
        input.value = titleCutSearch;

        searchGif()
      }

      document.getElementById("btn-search-found2").addEventListener("click", injectSearchTitle2);

      function injectSearchTitle2() {
        input.value = titleCutSearch2;

        searchGif()
      }

      document.getElementById("btn-search-found3").addEventListener("click", injectSearchTitle3);

      function injectSearchTitle3() {
        input.value = titleCutSearch3;

        searchGif()
      }
    }

  } else {
    document.getElementById("search-btn").classList.replace("search-button-active", "search-button");

    document.getElementsByClassName("search-found")[0].classList.remove("with-result");
  }
}

// Search Gif button and ENTER Key

input.onkeypress = function(event) {

  if (event.keyCode == 13 || event.which == 13) {

    const foundEnter = fetch('http://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=17')
      .then(response => response.json())
      .then(data => {
        injectGifEnter(data)
      })
      .catch(error => console.log(error));

      function injectGifEnter(data) {

        document.getElementsByClassName("search-found")[0].classList.remove("with-result");

        const titleRandom = data.data[0].title;

        const titleCutRandom = titleRandom.split(" ", 1).join('');

        const titleRandom2 = data.data[1].title;

        const titleCutRandom2 = titleRandom2.split(" ", 1).join('');

        const titleRandom3 = data.data[2].title;

        const titleCutRandom3 = titleRandom3.split(" ", 1).join('');

        document.getElementById("cont-result").innerHTML = `
        <div class="cont-bottom-search">
          <div id="bottom-search">
            <button>#${titleCutRandom}</button>
          </div>
          <div id="bottom-search2">
            <button>#${titleCutRandom2}</button>
          </div>
          <div id="bottom-search3">
            <button>#${titleCutRandom3}</button>
          </div>
        </div>
        <div id="result-display">${input.value} (resultados)</div>
        `

        document.getElementById("gif-result").innerHTML = `
        ${data.data.map(function(gifs) {
          
          const titleStringTend = gifs.title;

          const titleCutTend = titleStringTend.split(" ", 1);
      
          return `
            <div id="gif-tendencia-res">
              <div class="cont-img-tend">
                <img id="gif-tendencia-cont" src="${gifs.images.original.url}">
              </div>
              <div id="cont-img-title">
                <p id="gif-tend-title">#${titleCutTend}</p>
              </div>
            </div> 
          `
        }).join('')}
        `

        document.getElementById("bottom-search").addEventListener("click", injectTitle1);

        function injectTitle1() {
          input.value = titleCutRandom;

          const injectTitleCut = fetch('https://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=17')
          .then(response => response.json())
          .then(data => {
            injectGifEnter(data)
          })
          .catch(error => console.log(error));
        }

        document.getElementById("bottom-search2").addEventListener("click", injectTitle2);

        function injectTitle2() {
          input.value = titleCutRandom2;

          const injectTitleCut2 = fetch('https://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=17')
          .then(response => response.json())
          .then(data => {
            injectGifEnter(data)
          })
          .catch(error => console.log(error));
        }

        document.getElementById("bottom-search3").addEventListener("click", injectTitle3);

        function injectTitle3() {
          input.value = titleCutRandom3;

          const injectTitleCut3 = fetch('https://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=17')
          .then(response => response.json())
          .then(data => {
            injectGifEnter(data)
          })
          .catch(error => console.log(error));
        }

      }

    return foundEnter;
  }
}

function searchGif() {

  if (input.value.length>0) {

    const foundClick = fetch('https://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=17')
      .then(response => response.json())
      .then(data => {
        injectGifClick(data)
      })
      .catch(error => console.log(error));

      function injectGifClick(data) {

        document.getElementsByClassName("search-found")[0].classList.remove("with-result");

        const titleRandom = data.data[0].title;

        const titleCutRandom = titleRandom.split(" ", 1).join('');

        const titleRandom2 = data.data[1].title;

        const titleCutRandom2 = titleRandom2.split(" ", 1).join('');

        const titleRandom3 = data.data[2].title;

        const titleCutRandom3 = titleRandom3.split(" ", 1).join('');

        document.getElementById("cont-result").innerHTML = `
        <div class="cont-bottom-search">
          <div id="bottom-search">
            <button>#${titleCutRandom}</button>
          </div>
          <div id="bottom-search2">
            <button>#${titleCutRandom2}</button>
          </div>
          <div id="bottom-search3">
            <button>#${titleCutRandom3}</button>
          </div>
        </div>
        <div id="result-display">${input.value} (resultados)</div>
        `

        document.getElementById("gif-result").innerHTML = `
        ${data.data.map(function(gifs) {
          
          const titleStringTend = gifs.title;

          const titleCutTend = titleStringTend.split(" ", 1);
      
          return `
            <div id="gif-tendencia-res">
              <div class="cont-img-tend">
                <img id="gif-tendencia-cont" src="${gifs.images.original.url}">
              </div>
              <div id="cont-img-title">
                <p id="gif-tend-title">#${titleCutTend}</p>
              </div>
            </div>  
          `
        }).join('')}
        `

        document.getElementById("bottom-search").addEventListener("click", injectTitle1);

        function injectTitle1() {
          input.value = titleCutRandom;

          const injectTitleCut = fetch('https://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=17')
          .then(response => response.json())
          .then(data => {
            injectGifClick(data)
          })
          .catch(error => console.log(error));
        }

        document.getElementById("bottom-search2").addEventListener("click", injectTitle2);

        function injectTitle2() {
          input.value = titleCutRandom2;

          const injectTitleCut2 = fetch('https://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=17')
          .then(response => response.json())
          .then(data => {
            injectGifClick(data)
          })
          .catch(error => console.log(error));
        }

        document.getElementById("bottom-search3").addEventListener("click", injectTitle3);

        function injectTitle3() {
          input.value = titleCutRandom3;

          const injectTitleCut3 = fetch('https://api.giphy.com/v1/gifs/search?q=' + input.value + '&api_key=' + APIKEY + '&limit=17')
          .then(response => response.json())
          .then(data => {
            injectGifClick(data)
          })
          .catch(error => console.log(error));
        }

      }

      document.getElementsByClassName("search-found")[0].classList.remove("with-result");

    return foundClick;
  }
}