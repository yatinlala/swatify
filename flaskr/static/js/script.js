let toggle = false;
let audioPath1, audioPath;
let togglePlayMain;
let audioObj = null;
var color = "linear-gradient(135deg,lightcoral, 1%, #222225)";

function toggleNav() {
    var nav = document.getElementById("main-nav");
    var body = document.getElementById("body");
    var menuwrap = document.getElementById("menu-wrap");
    toggle = (!toggle);
    nav.style.transform = nav.style.transform == "translateX(0px)" ? "translateX(50px)" : "translateX(0px)";
    nav.style.opacity = nav.style.transform == "translateX(0px)" ? "1" : "0";
    nav.style.overflowY = nav.style.transform == "translateX(0px)" ? "hidden" : "auto";
    body.style.overflowY = nav.style.transform == "translateX(0px)" ? "hidden" : "auto";
    menuwrap.style.backgroundColor = nav.style.transform == "translateX(0px)" ? "#222225" : "";
    menuwrap.style.backgroundImage = nav.style.transform != "translateX(0px)" ? "linear-gradient(to bottom,#222225,70%, rgba(34, 34, 37, .3) )" : "";
    nav.style.transform == "translateX(0px)" ? showMenu() : hideMenu();
}

function hideMenu() {
  var nav = document.getElementById("main-nav");
  const collection = document.getElementsByClassName("nav-link");
  for (let i = 0; i < collection.length; i++) {
    collection[i].style.pointerEvents = "none";
  }
  setTimeout(()=>{nav.style.zIndex = "0";}, 120)
}
function showMenu() {
  var nav = document.getElementById("main-nav");
  const collection = document.getElementsByClassName("nav-link");
  for (let i = 0; i < collection.length; i++) {
    collection[i].style.pointerEvents = "auto";
  }
  nav.style.zIndex = "99";
}

function toggleIcon() {
    var menu = document.getElementById("menu-icon");
    menu.classList.toggle("menu-active");
}

function load() {
    var body = document.getElementById("body");
    var menu = document.getElementById("menu-icon");
    var nav = document.getElementById("main-nav");
    var menuwrap = document.getElementById("menu-wrap");
    nav.style.transform = "translateX(50px)";
    nav.style.opacity = "0";
    menuwrap.style.backgroundColor = "";
    menuwrap.style.backgroundImage = "linear-gradient(to bottom,#222225,70%, rgba(34, 34, 37, .3) )";
    menu.classList.remove("menu-active");
    body.style.overflowY = "auto";
    hideMenu();
}

function resultShow() {
  var resultItem = document.getElementById("result-item");
  resultItem.style.display = "flex";
  console.log("results fired");
}

function showtoptracks() {
  var topTracks = document.getElementById("toptracks");
  var topArtists = document.getElementById("topartists");
  var superlatives = document.getElementById("supers-wrap");

  var tracksbtn = document.getElementById("toptracksbtn");
  var artistsbtn = document.getElementById("topartistsbtn");
  var supersbtn = document.getElementById("supersbtn");
  var showallbtn = document.getElementById("showallbtn");

  tracksbtn.style.backgroundColor = "rgba(240, 128, 128, 0.9)";
  artistsbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  supersbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  showallbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  topArtists.style.display = "none";
  superlatives.style.display = "none";
  topTracks.style.display = "block";

}

function showtopartists(){
  var topTracks = document.getElementById("toptracks");
  var topArtists = document.getElementById("topartists");
  var superlatives = document.getElementById("supers-wrap");

  var tracksbtn = document.getElementById("toptracksbtn");
  var artistsbtn = document.getElementById("topartistsbtn");
  var supersbtn = document.getElementById("supersbtn");
  var showallbtn = document.getElementById("showallbtn");

  artistsbtn.style.backgroundColor = "rgba(240, 128, 128, 0.9)";
  tracksbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  supersbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  showallbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  topTracks.style.display = "none";
  superlatives.style.display = "none";
  topArtists.style.display = "block";

}

function showSupers() {
  var topTracks = document.getElementById("toptracks");
  var topArtists = document.getElementById("topartists");
  var superlatives = document.getElementById("supers-wrap");

  var tracksbtn = document.getElementById("toptracksbtn");
  var artistsbtn = document.getElementById("topartistsbtn");
  var supersbtn = document.getElementById("supersbtn");
  var showallbtn = document.getElementById("showallbtn");

  supersbtn.style.backgroundColor = "rgba(240, 128, 128, 0.9)";
  artistsbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  tracksbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  showallbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  topTracks.style.display = "none";
  topArtists.style.display = "none";
  superlatives.style.display = "block"

}

function showAll() {
  var topTracks = document.getElementById("toptracks");
  var topArtists = document.getElementById("topartists");
  var superlatives = document.getElementById("supers-wrap");
  var showallbtn = document.getElementById("showallbtn");

  var tracksbtn = document.getElementById("toptracksbtn");
  var artistsbtn = document.getElementById("topartistsbtn");
  var supersbtn = document.getElementById("supersbtn");

  showallbtn.style.backgroundColor = "rgba(240, 128, 128, 0.9)";
  supersbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  artistsbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  tracksbtn.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  topTracks.style.display = "block";
  topArtists.style.display = "block";
  superlatives.style.display = "block"

}


/*function searchToggle() {
  search = document.getElementById("main-search");
  search.style.display = "block";
}*/

  // sets up page on page switch and browser back button
  window.onbeforeunload = function (e) {
  var nav = document.getElementById("main-nav");
  var body = document.getElementById("body");
  var menu = document.getElementById("menu-icon");
  var menuwrap = document.getElementById("menu-wrap");
  nav.style.transform = "translateX(50px)";
  nav.style.opacity = "0";
  menuwrap.style.backgroundColor = "";
  menuwrap.style.backgroundImage = "linear-gradient(to bottom,#222225,70%, rgba(34, 34, 37, .3) )";
  menu.classList.remove("menu-active");
  body.style.overflowY = "auto";
  hideMenu();
}

window.addEventListener('click', (e)=>{

  let menuwraps = document.getElementsByClassName("open-wrap");
  let currentsubmenu = null;

  for (let i=0; i<menuwraps.length; i++) {
    //console.log(e.target);
    if (menuwraps[i].contains(e.target)){
      menuwraps[i].querySelector('.open-submenu').style.display = "flex";
    } else {
      menuwraps[i].querySelector('.open-submenu').style.display = "none";
    }
  }

  
});

if(window.location.pathname == '/dashboard/') {

/* opens search items on click, hides them on outside click */
window.addEventListener('click', function(e){  
  let search = document.getElementById("main-search"); 
  if (document.getElementById('search-bar').contains(e.target)){
    search.style.display = "block";
  } else{
    search.style.display = "none";
  }
});

window.addEventListener('click', function(event){
  let correctNode = false;
  let resultImg = document.getElementById("result-img");
  let resultName = document.getElementById("result-title");
  let resultPlayback = document.querySelector(".playback");
  let resDownload = document.querySelector("#resDownload");
  let resSpotify = document.querySelector("#resSpotify");
  let searchimg = this.document.querySelectorAll(".search-img");
  let audio = document.getElementById("audio-src");
  let playToggleBtn = document.getElementById("toggle-play");
  if (document.getElementById('main-search').contains(event.target)){
  console.log(event.target.childNodes); 
  console.log(event.target.childNodes[3]);  
  for (let i=0; i<searchimg.length; i++){
    if (event.target.contains(searchimg[i])){
      console.log("image contained!");
      resultImg.src = event.target.childNodes[1].src;
      resultName.innerHTML = event.target.childNodes[3].innerHTML;
      audio.src = event.target.childNodes[5].src;
      resultPlayback = event.target.childNodes[5].src;
      resDownload.href = event.target.childNodes[5].src;
      audioPath = event.target.childNodes[5].src;
      resSpotify.href = event.target.childNodes[7].src;
      correctNode = true;
    }
  } 
  if (correctNode == false){
    let parent = event.target.parentNode;
    resultImg.src = parent.childNodes[1].src;
    resultName.innerHTML = parent.childNodes[3].innerHTML;
    audio.src = parent.childNodes[5].src;
    resultPlayback = parent.childNodes[5].src;
    resDownload.href = parent.childNodes[5].src;
    audioPath = parent.childNodes[5].src;
    resSpotify.href = parent.childNodes[7].src;
  }
  correctNode = false;
  audioPath1 = audioPath;
  console.log(audioPath);
  if(audioObj != null){
    audioObj.setAttribute('src', audioPath);
    audioObj.load();
    playToggleBtn.classList.remove("pause");
    playToggleBtn.classList.add("play");
  }
  console.log(resultImg);
  console.log(resultName);
  }
});

}
/* search bar automatic suggestions */
let timer;
const waitTime = 800;

if(window.location.pathname == '/dashboard/') {

setTimeout(()=>{
  let form = document.getElementById("search-form");
  let inputElem = document.querySelector('input');

  inputElem.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(()=> {
        console.log(inputElem.value);
        form.submit()
      }, waitTime); 

    // MOST RECENT CALL
    $('#search-form').on('submit', function(e) {
      e.preventDefault();
    
      if (inputElem.value.length > 0){
        var value = $('query').val();
        $.ajax({
          type: 'POST',
          url: "{{ url_for('searchItems') }}",
          data: JSON.stringify(value),
          dataType: 'text',
          success: function(response){
            console.log("ajax: " + response);
            $('#main').text(response);
          }
        }).done(function(data) {
          alert(data+"This is working");
        });
      }
    });
  });
}, 400);
}


if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}













window.addEventListener('load', ()=> {

  let buttonwraps = document.getElementsByClassName("audio-player");
  if (buttonwraps[0].querySelector(".playback").innerHTML != null && buttonwraps[0].querySelector(".playback").innerHTML != "#" ){
    audioPath = buttonwraps[0].querySelector(".playback").innerHTML;
  }
  
  let audioPlayer = document.querySelector(".audio-player");
  const audioPlayer1 = document.querySelector(".audio-player1");
  const audioPlayer2 = document.querySelector(".audio-player2");
  const audioPlayer3 = document.querySelector(".audio-player3");

  audioObj = new Audio(audioPath);
  
  console.dir(audioObj);
  
  audioObj.addEventListener(
    "loadeddata",
    () => {
      audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
        audioObj.duration
      );
      audioObj.volume = .75;
    },
    false
  );
  
  //click on timeline to skip around
  let timeline = audioPlayer.querySelector(".timeline");
  timeline.addEventListener("click", e => {
    let timelineWidth = window.getComputedStyle(timeline).width;
    let timeToSeek = e.offsetX / parseInt(timelineWidth) * audioObj.duration;
    audioObj.currentTime = timeToSeek;
  }, false);
  
  //click volume slider to change volume
  const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
  volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audioObj.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
  }, false)
  
  //check audio percentage and update time accordingly
  let playBtn = audioPlayer.querySelector(".controls .toggle-play");
  if (window.location.pathname == "/dashboard/") {
  console.log("dashboard here");
  console.log(audioPlayer1);
  console.log(audioPlayer1.querySelector(".controls .toggle-play"));
  const playBtn1 = audioPlayer1.querySelector(".controls .toggle-play");
  const playBtn2 = audioPlayer2.querySelector(".controls .toggle-play");
  const playBtn3 = audioPlayer3.querySelector(".controls .toggle-play");
  console.log(playBtn1);


  playBtn1.addEventListener(
    "click",
    () => {
      if (audioPlayer != audioPlayer1){
        console.log("button 1 detected");
        audioObj.setAttribute('src', audioPath1);
        audioObj.load();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audioPlayer = audioPlayer1;
        playBtn = playBtn1;
        if (audioPlayer == audioPlayer1){
          console.log("player is now 1");
        }
        audioObj.setAttribute('src', audioPath1);
        audioObj.load();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audioObj.play();
      } /*else {
        if (audioObj.paused) {
          playBtn.classList.remove("play");
          playBtn.classList.add("pause");
          audioObj.play();
        } else {
          playBtn.classList.remove("pause");
          playBtn.classList.add("play");
          audioObj.pause();
        }
      }*/
    },
    false
  );

  playBtn2.addEventListener(
    "click",
    () => {
      if (audioPlayer != audioPlayer2){
        console.log("button 2 detected");
        audioPath = document.getElementById("spotlight-playback").innerHTML;
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audioPlayer = audioPlayer2;
        if (playBtn == playBtn2) {
          console.log("playbtn switch success");
        }
        playBtn = playBtn2;
        if (audioPlayer == audioPlayer2){
          console.log("player is now 2");
        }
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audioObj.play();
      } else {
        if (audioObj.paused) {
          playBtn.classList.remove("play");
          playBtn.classList.add("pause");
          audioObj.play();
        } else {
          playBtn.classList.remove("pause");
          playBtn.classList.add("play");
          audioObj.pause();
        }
      }
    },
    false
  );

  playBtn3.addEventListener(
    "click",
    () => {
      if (audioPlayer != audioPlayer3){
        console.log("button 3 detected");
        audioPath = document.getElementById("devtrack-playback").innerHTML;
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audioPlayer = audioPlayer3;
        playBtn = playBtn3;
        if (audioPlayer == audioPlayer3){
          console.log("player is now 3");
        }
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audioObj.play();
      } else {
        if (audioObj.paused) {
          playBtn.classList.remove("play");
          playBtn.classList.add("pause");
          audioObj.play();
        } else {
          playBtn.classList.remove("pause");
          playBtn.classList.add("play");
          audioObj.pause();
        }
      }
    },
    false
  );

  } else {
    console.log("not dashboard here");
    const playBtn1 = null;
    const playBtn2 = null;
    const playBtn3 = null;
  }
  console.log(window.location.pathname);
  
  setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = audioObj.currentTime / audioObj.duration * 100 + "%";
    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
      audioObj.currentTime
    );
    if (audioObj.ended){
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
    }
  }, 500);
  
  //toggle between playing and pausing on button click
  playBtn.addEventListener(
    "click",
    () => {
      if (audioObj.paused) {
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        console.log(audioPath);
        audioObj.play();
      } else {
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audioObj.pause();
      }
    },
    false
  );

  /*if (window.location.pathname == '/dashboard/') {
  playBtn1.addEventListener(
    "click",
    () => {
      if (audioPlayer != audioPlayer1){
        console.log("button 1 detected");
        audioObj.setAttribute('src', audioPath1);
        audioObj.load();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audioPlayer = audioPlayer1;
        playBtn = playBtn1;
        if (audioPlayer == audioPlayer1){
          console.log("player is now 1");
        }
        audioObj.setAttribute('src', audioPath1);
        audioObj.load();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audioObj.play();
      } /*else {
        if (audioObj.paused) {
          playBtn.classList.remove("play");
          playBtn.classList.add("pause");
          audioObj.play();
        } else {
          playBtn.classList.remove("pause");
          playBtn.classList.add("play");
          audioObj.pause();
        }
      }*/
   /* },
    false
  );

  playBtn2.addEventListener(
    "click",
    () => {
      if (audioPlayer != audioPlayer2){
        console.log("button 2 detected");
        audioPath = document.getElementById("spotlight-playback").innerHTML;
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audioPlayer = audioPlayer2;
        if (playBtn == playBtn2) {
          console.log("playbtn switch success");
        }
        playBtn = playBtn2;
        if (audioPlayer == audioPlayer2){
          console.log("player is now 2");
        }
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audioObj.play();
      } else {
        if (audioObj.paused) {
          playBtn.classList.remove("play");
          playBtn.classList.add("pause");
          audioObj.play();
        } else {
          playBtn.classList.remove("pause");
          playBtn.classList.add("play");
          audioObj.pause();
        }
      }
    },
    false
  );

  playBtn3.addEventListener(
    "click",
    () => {
      if (audioPlayer != audioPlayer3){
        console.log("button 3 detected");
        audioPath = document.getElementById("devtrack-playback").innerHTML;
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audioPlayer = audioPlayer3;
        playBtn = playBtn3;
        if (audioPlayer == audioPlayer3){
          console.log("player is now 3");
        }
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audioObj.play();
      } else {
        if (audioObj.paused) {
          playBtn.classList.remove("play");
          playBtn.classList.add("pause");
          audioObj.play();
        } else {
          playBtn.classList.remove("pause");
          playBtn.classList.add("play");
          audioObj.pause();
        }
      }
    },
    false
  );

  }*/

  if(window.location.pathname != '/dashboard/') {
  
  for (let i=0; i<buttonwraps.length; i++) {
    buttonwraps[i].querySelector(".controls .toggle-play").addEventListener('click', ()=> {
      console.log("play button clicked hehe");
      if (audioPlayer != buttonwraps[i]){
        console.log("player switch detected");
        audioPath = buttonwraps[i].querySelector(".playback").innerHTML;
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audioPlayer = buttonwraps[i];
        playBtn = buttonwraps[i].querySelector(".controls .toggle-play");
        if (audioPlayer == buttonwraps[i]){
          console.log("player is now switched");
        }
        audioObj.setAttribute('src', audioPath);
        audioObj.load();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audioObj.play();
      } else if (buttonwraps[i] != buttonwraps[0]) {
          if (audioObj.paused) {
            buttonwraps[i].querySelector(".controls .toggle-play").classList.remove("play");
            buttonwraps[i].querySelector(".controls .toggle-play").classList.add("pause");
            audioObj.play();
          } else {
            buttonwraps[i].querySelector(".controls .toggle-play").classList.remove("pause");
            buttonwraps[i].querySelector(".controls .toggle-play").classList.add("play");
            audioObj.pause();
          }
      }
    }, false);
  }
}
  
  audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audioObj.muted = !audioObj.muted;
    if (audioObj.muted) {
      volumeEl.classList.remove("icono-volumeMedium");
      volumeEl.classList.add("icono-volumeMute");
    } else {
      volumeEl.classList.add("icono-volumeMedium");
      volumeEl.classList.remove("icono-volumeMute");
    }
  });
  
  //turn 128 seconds into 2:08
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }

});





// D3js CODE EXPERIMENTAL //

/*function displayBubbles() {
    var json = {
        'children': [
          {'name': 'Apples', 'value': 70},
          {'name': 'Oranges', 'value': 44},
          {'name': 'Kiwis', 'value': 65},
          {'name': 'Bananas', 'value': 39},
          {'name': 'Pears', 'value': 10},
          {'name': 'Satsumas', 'value': 25},
          {'name': 'Pineapples', 'value': 30}
        ]
      }
      
      var diameter = 600,
          color = d3.scaleOrdinal(d3.schemeCategory20c);
      
      var colorScale = d3.scaleLinear()
        .domain([0, d3.max(json.children, function(d) {
          return d.value;
        })])
        .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);
      
      var bubble = d3.pack()
        .size([diameter, diameter])
        .padding(5);
      
      var margin = {
        left: 0,
        right: 100,
        top: 0,
        bottom: 0
      }
      
      var svg = d3.select('#chart').append('svg')
        .attr('viewBox','0 0 ' + (diameter + margin.right) + ' ' + diameter)
        .attr('width', (diameter + margin.right))
        .attr('height', diameter)
        .attr('class', 'chart-svg');
      
      var root = d3.hierarchy(json)
        .sum(function(d) { return d.value; })
        .sort(function(a, b) { return b.value - a.value; });
      
      bubble(root);
      
      var node = svg.selectAll('.node')
        .data(root.children)
        .enter()
        .append('g').attr('class', 'node')
        .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
        .append('g').attr('class', 'graph');
      
      node.append("circle")
        .attr("r", function(d) { return d.r; })
        .attr("fill", 'url("#image")')
        .style("fill", function(d) { 
          return color(d.data.name); 
        });

      
      node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.value; })
        .style("fill", "#ffffff");
      
      svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(600,40)");
      
      svg.append("defs")
        .append("pattern")
        .attr("id", "image")
        .attr("height","100%")
        .attr("width","100%")
        .attr("x", "37%")
        .attr("y","40%")
        .append("image")
        .attr("x", "0%")
        .attr("y","0%")
        .attr("viewBox", "0 0 200 200")
        .attr("height","100")
        .attr("width","100")
        .attr("xlink:href", "search-icon.png");
      
      var legendOrdinal = d3.legendColor()
        .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
        .shapePadding(10)
        .scale(color);
      
      svg.select(".legendOrdinal")
        .call(legendOrdinal);
}
*/



/************************** */