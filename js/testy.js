var radius;
var c = 255;
var database;
var data;
let dinoPix = [];

/*function preload() {
  // Get the dinos!
  //data =loadJSON('json/dinos3.json');
  for (let i=1; i < 248; i++){
    dinoPix[i] = loadImage("img/dinoPix/dino_(" + i +").png");
  }

  //console.log(data);
}
*/

function setup() {
  let canvas = createCanvas(1000, 600);
   //let partyCanvas = createCanvas(1000, 600);
  let canvasWidth = windowWidth /1.45;
  let canvasHeight = windowHeight /1.5;
  resizeCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvasContainer');
  canvas.id('main');
  slider = select('#bWidth');
  clearBtn = select("#clearButton");
  clearBtn.mousePressed(changeBG);
  checkbox = select('#eraseBox');
  drawAgain = select("#drawAgainButton");
  drawAgain.mousePressed(changeBG);
  color_picker = createColorPicker("black");
  color_picker.parent("strokeColor");

  //console.log(submitTime);
  //console.log(c);
  background(255);
  colorMode(RGB);
  var downloadButton = select('#downloadButton');
  downloadButton.mousePressed(downloadDrawing);
  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);
  var firebaseConfig = {
    apiKey: "AIzaSyCHpEE0BJ4VJeozU7pGxoeD95hti0dTcLM",
    authDomain: "d1no-club.firebaseapp.com",
    databaseURL: "https://d1no-club.firebaseio.com",
    projectId: "d1no-club",
    storageBucket: "d1no-club.appspot.com",
    messagingSenderId: "623680606310",
    appId: "1:623680606310:web:579795658bc9ba9449dda7",
    measurementId: "G-SXZ489X6X9"
  };
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
  //for loading JSON
  //gotData(data);
  //for loading PNG
  gotData(dinoPix);
  console.log(dinoPix);
  //$("#party").click(walkDino());
  //new Marquee('partyCanvas1');
  walkDino();

}

function draw() {
  radius = slider.value();
  c= color_picker.color();

}


function mouseReleased() {
  locked = false;
}

function mouseDragged() {
  if (checkbox.checked()){
    stroke(255);
  }else{
    stroke(c);
  }
  if (mouseX < (windowWidth /1.45) && mouseY < (windowHeight /1.5)) {
    strokeWeight(slider.value());
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function changeBG() {
  background(255);
}


function stampRectangle(c){
  fill(c);
  noStroke();
  ellipse(mouseX,mouseY,slider.value(),slider.value());
}

function saveDrawing(){
  var completionCode = 'D1no_' + int(random(999)) + int(millis()) + "_" + day() + minute();
  var submitTime = month() + "/" + day() +" " + hour() + ":"+ minute();
  var dataURL = canvas.toDataURL('image/png');
  var compCode = createSpan(completionCode);
  compCode.parent(completeCode);
  $('#thanksModal').modal();
  $('#thanksModal').modal('open');

  console.log(dataURL);
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  var ref= database.ref('drawings');
  var data = {
    drawing: dataURL,
    time: submitTime,
    code: completionCode
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);
  function dataSent(err, status) {
    console.log(status);
  }
}

/*function calculateTime() {
  submitTime.split();
}*/
//for loading JSON
/*function gotData(data){

  var ul = document.getElementById('dinoList');
for(var item in data.drawings) {
  console.log(dinoDrawing);
  var dinoDrawing = data.drawings[item];
    var dinoCode = dinoDrawing.code;
    var dinoURI = dinoDrawing.drawing;
    var dinoDate = dinoDrawing.time;
    //console.log(dinoURI);
    var li = document.createElement('li');
    //var dinospan = document.createElement('span');
    //dinospan.textContent = dinoCode;
    var image = new Image();
    image.src = dinoURI;
    image.title = dinoCode + " " + dinoDate;
    //image.alt = dinoDate;
    li.appendChild(image);
    //li.appendChild(dinoCode);
    ul.appendChild(li);
  }
  //li.innerHTML = dinoURI;
}*/
function gotData(data){

  var div = document.getElementById('dinoList');
  for (let i=1; i < 259; i++){
    var image = createImg("img/dinoPix/dino_(" + i +").png", "");
    image.addClass("dinoGrid");
    image.addClass("animation");
    image.addClass("back-in-right");
    image.parent(div);
  }
}

function walkDino(){
  for (let i=1; i < 259; i++){
    var image = createImg("img/dinoPix/dino_(" + i +").png", "");
    image.parent(partyCanvas1);
    image.class('dinoAni3');

  }
  for (let i=83; i < 259; i++){
    var image = createImg("img/dinoPix/dino_(" + i +").png", "");
    image.parent(partyCanvas2);
    image.class('dinoAni2');

  }
  for (let i=166; i < 259; i++){
    var image = createImg("img/dinoPix/dino_(" + i +").png", "");
    image.parent(partyCanvas3);
    image.class('dinoAni3');

  }
}



function errData(err){
  console.log(err);
}

function downloadDrawing() {
  saveCanvas(canvas, 'd1no' + int(random(2000)),'jpg');
}

//materialize stuffs  - modals and tabs
$(document).ready(function(){
    $('#welcomeModal').modal();
    $('#galleryModal').modal();
    $('#welcomeModal').modal('open');
    $('.tabs').tabs();

 });

//initialize masonry

/*$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
});*/
