const APIKEY = "eixy16Wfm4TY5lPbBNNRCIEPhmI4aZu1";

// timer funcional

var time = 0;
var running = 0;

function startPause() {
  if (running == 0 ) { 
    setTimeout(function() {
      running = 1; 
      increment(); 
    }, 1600)
  } else { 
    running = 0; 
  } 
} 

function reset() { 
  running = 0; 
  time = 0; 
  document.querySelector("#outputTimer").innerHTML = "00:00:00"; 
} 

function increment() { 
  if (running == 1) { 
    setTimeout(function() { 
      time++; 
      var mins = Math.floor(time/10/60);
      var secs = Math.floor(time/100 % 60);
      var tenths = time % 100;
      
      if (mins < 10) { 
        mins = "0" + mins; 
      } 
      
      if (secs < 10) { 
        secs = "0" + secs; 
      } 
      
      document.querySelector("#outputTimer").innerHTML = mins + ":" + secs + ":"  + "0" + tenths; 
      
      increment(); 
      
    }, 1000);
  } 
}

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

// upload HTML start btn

function beforeRecord() {
  document.getElementsByClassName("containerSection")[0].classList.add("displayNone")
  document.getElementsByClassName("containerRecord")[0].classList.add("displayShow")

  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: { min: 480 }
    }
  })
  .then(function(stream) {
    document.getElementById("videoPlay").srcObject = stream;
    document.getElementById("videoPlay").play()
  })
}

document.querySelector(".btnStart").onclick = function() {beforeRecord()}

// change capturar styles

document.querySelector(".cameraCap").onmouseenter = function() {mouseEnter()};
document.querySelector(".cameraCap").onmouseleave = function() {mouseLeave()};

document.querySelector(".cameraBtn").onmouseenter = function() {mouseEnter()};
document.querySelector(".cameraBtn").onmouseleave = function() {mouseLeave()};

function mouseEnter() {
  document.querySelector(".cameraCap").classList.add("cameraCapHover");
  document.querySelector(".cameraBtn").classList.add("cameraBtnHover");
}

function mouseLeave() {
  document.querySelector(".cameraCap").classList.remove("cameraCapHover");
  document.querySelector(".cameraBtn").classList.remove("cameraBtnHover");
}

// Boton crear Guifos

document.querySelector(".btnCreateGifos").onclick = function() {
  window.location.href = '/upload.html';
}

//

function showMyGuifosSave() {
  document.querySelector(".containerSection").style.display = "none";
  document.querySelector(".contMisGuifos").style.display = "flex"
  document.querySelector(".contMisGuifos").style.marginTop = "0px"
  document.querySelector(".containerGifUpload").style.display = "none";

  showMisGuifos()
}

// start capture

var image = document.querySelector("#videoPlay2");

function captureCamera(callback) {
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      with: { max: 1080 },
      height: { max: 284 }
    }
  })
  .then(function(stream) {
    callback(stream)
  }).catch(function(error) {
    alert('Unable to capture your camera. Please check console logs.');
    console.error(error);
  });
}

function uploadGifWait() {

  document.querySelector(".sendGif").style.display = "none";
  document.querySelector(".repeatCap").style.display = "none";
  document.querySelector(".stopUpload").style.display = "flex";
  document.querySelector(".stopUpload").style.marginLeft = "170px";

  document.querySelector(".stopUpload").onclick = function() {
    window.location.href = '/upload.html';
  }

  document.querySelector(".contWaitGifUpload").style.display = "flex"

  var prg = document.getElementById("progress");
  var counter = 5;
  var progress = 24;
  var id = setInterval(frame, 140);

  function frame() {
    if (progress == 324) {
      clearInterval(id);
      document.querySelector(".contWaitGifUpload").style.display = "none";
      document.querySelector(".containerRecord").style.display = "none";
      document.querySelector(".containerGifUpload").style.display = "flex";
      document.querySelector(".contMisGuifos").style.display = "flex";
      document.querySelector(".contMisGuifos").style.marginTop = "40px"
    } else {
      progress += 5;
      counter += 1;
      prg.style.width = progress + 'px';
    }
  }
}

function showMisGuifos(data) {

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

function injectGifUpload(data) {

  const guifoUpload = data.data.id

  localStorage.setItem(guifoUpload, guifoUpload)

  let imgUpload = data.data.images.original.url;

  let imgShow = document.querySelector(".imgUploadGiphy");

  imgShow.src = imgUpload;

  document.querySelector(".btnDownloadGif").onclick = function() {
    window.location.href = imgUpload;
  }

  document.querySelector(".btnCopyLink").onclick = function() {
    navigator.clipboard.writeText(data.data.bitly_url);

    alert("Link Copiado Con Exito");
  }

  document.querySelector(".finishUpload").onclick = function() {
    document.querySelector(".containerGifUpload").style.display = "none";
    document.querySelector(".contMisGuifos").style.marginTop = "0px"
    document.querySelector(".contMisGuifos").style.display = "flex"
  }

  showMisGuifos(data)
}

function capturingGuifo() {
  
  uploadGifWait()
  
  let form = new FormData();
  form.append('file', recorder.getBlob(), 'myGif.gif');
  console.log(form.get('file'))

  fetch('https://upload.giphy.com/v1/gifs?api_key=' + APIKEY , {
    method: 'POST',
    body: form,
  })
  .then(response => {
    console.log(response.status);
     return response.json();
  })
  .then(data => {
    var dataid = data.data.id;
    console.log(dataid);
    fetch("https://api.giphy.com/v1/gifs/" + dataid + "?&api_key=" + APIKEY)
    .then(response => {
      console.log(response.status);
      return response.json();
    })
    .then(data => {
      injectGifUpload(data)
      //console.log(data.data.images.original.url);
    })
  })
  
}

function stopRecordingCallback() {
  image.src = URL.createObjectURL(recorder.getBlob());

  document.querySelector(".sendGif").onclick = function() {capturingGuifo()}

  document.querySelector(".repeatCap").onclick = function() {

    recorder.destroy();
    recorder = null;

    document.querySelector(".thirdBtnCont").style.display = "none";

    document.querySelector(".firstBtnCont").style.display = "flex";

    reset()

    document.querySelector(".cameraCap").onclick = function() {
      recordingActive()
    };
  }

  recorder.stream.stop();
  // recorder.destroy();
  // recorder = null;
}

var recorder;

function recordingActive() {
  document.querySelector(".cameraCap").classList.add("cameraCapActive");
  document.querySelector(".cameraBtn").classList.add("cameraBtnActive");
  
  document.querySelector(".firstBtnCont").style.display = "none"
  document.querySelector(".secondBtnCont").style.display = "flex"
  document.querySelector(".cameraCap2").innerHTML = "Listo"

  startPause()

  document.querySelector(".cameraCap2").onmouseenter = function() {mouseEnter2()};
  document.querySelector(".cameraCap2").onmouseleave = function() {mouseLeave2()};
  
  document.querySelector(".cameraBtn2").onmouseenter = function() {mouseEnter2()};
  document.querySelector(".cameraBtn2").onmouseleave = function() {mouseLeave2()};
  
    function mouseEnter2() {
      document.querySelector(".cameraCap2").classList.add("cameraCap2Hover");
      document.querySelector(".cameraBtn2").classList.add("cameraBtn2Hover");
    }
  
    function mouseLeave2() {
      document.querySelector(".cameraCap2").classList.remove("cameraCap2Hover");
      document.querySelector(".cameraBtn2").classList.remove("cameraBtn2Hover");
    }

    captureCamera(function(stream) {
      recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
      onGifRecordingStarted: function() {
        document.getElementById("titleBeforeStart").innerHTML = "Capturando tu Guifo";
      },
      onGifPreview: function(gifURL) {
        image.src = gifURL;
      }
    });

    recorder.startRecording();

    // release camera on stopRecording
    recorder.stream = stream;
  });
}

document.querySelector(".cameraCap").onclick = function() {recordingActive()};
document.querySelector(".cameraBtn").onclick = function() {recordingActive()};

function stopingRecord() {
  recorder.stopRecording(stopRecordingCallback);

  document.getElementById("titleBeforeStart").innerHTML = "Guifo Capturado";
  document.querySelector("#videoPlay").style.display = "none"
  document.querySelector(".secondBtnCont").style.display = "none"
  document.querySelector(".thirdBtnCont").style.display = "flex"
}

document.querySelector(".cameraCap2").onclick = function() {
  startPause()
  stopingRecord()
};

document.querySelector(".cameraBtn2").onclick = function() {
  stopingRecord()
};